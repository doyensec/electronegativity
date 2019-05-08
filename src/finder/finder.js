import { CHECKS } from './checks/AtomicChecks';
import { sourceTypes } from '../parser/types';
import chalk from 'chalk';

export class Finder {
  constructor(customScan) {
    this._enabled_checks = Object.assign(Object.create(CHECKS), CHECKS);
    if (customScan && customScan.length > 0) {
      var checksNames = this._enabled_checks.map(check => check.name.toLowerCase());
      if (!customScan.every(r => checksNames.includes(r))) {
        console.log(chalk.red(`You have an error in your custom checks list. Maybe you misspelt some check names?`));
        process.exit(1);
      } else {
        for (var i = this._enabled_checks.length - 1; i >= 0; i--) 
          if (!customScan.includes(this._enabled_checks[i].name.toLowerCase()))
            this._enabled_checks.splice(i, 1);
      }
    }
    this._checks_by_type = new Map();
    this.init_checks_list();
  }

  get enabled_checks() { return this._enabled_checks; }

  get checks_by_type() { return this._checks_by_type; }

  init_checks_list() {
    for (const type of Object.keys(sourceTypes)) {
      this._checks_by_type.set(sourceTypes[type], []);
    }
    for (const check of this.enabled_checks) {
      const checkInstance = new check();
      this._checks_by_type.get(checkInstance.type).push(checkInstance);
    }
  }

  get_sample(fileLines, index) {
    let sample = fileLines[index];
    // Also removes the \r leftover from split('\n') on Windows
    // Using split('\n') in checkers however is OK, because file ending depends on Git settings and *may* be just '\n' even on Windows
    sample = sample.trim();

    return sample;
  }

  async find(file, data, type, content, use_only_checks = null) {
    const checks = this._checks_by_type.get(type).filter((check) => {
      if (use_only_checks && !use_only_checks.includes(check.id)) {
        return false;
      }
      return true;
    });
    const fileLines = content.toString().split('\n');
    const issues = [];
    const rootData = data;

    switch (type) {
      case sourceTypes.JAVASCRIPT:
        data.astParser.traverseTree(data, {
          enter: (node) => {
            rootData.Scope.updateFunctionScope(rootData.astParser.getNode(node), "enter");
            for (const check of checks) {
              const matches = check.match(rootData.astParser.getNode(node), rootData.astParser, rootData.Scope);
              if (matches) {
                for(const m of matches) {
                  const sample = this.get_sample(fileLines, m.line - 1);
                  const issue = { file, sample, location: {line: m.line, column: m.column}, id: m.id, description: m.description, properties: m.properties, severity: m.severity, confidence: m.confidence, manualReview: m.manualReview };
                  issues.push(issue);
                }
              }
            }
          },
          leave: (node) => {
            rootData.Scope.updateFunctionScope(rootData.astParser.getNode(node), "leave");
          }
        });

        break;
      case sourceTypes.HTML:
        for (const check of checks) {
          const matches = check.match(data, content);
          if(matches){
            for(const m of matches) {
              const sample = this.get_sample(fileLines, m.line - 1);
              const issue = {file, sample, location: {line: m.line, column: m.column}, id: m.id, description: m.description, properties: m.properties, severity: m.severity, confidence: m.confidence, manualReview: m.manualReview};
              issues.push(issue);
            }
          }
        }
        break;
      case sourceTypes.JSON:
        for (const check of checks) {
          const matches = await check.match(data);
          if (matches) {
            for(const m of matches) {
              const sample = this.get_sample(fileLines, m.line - 1);
              const issue = {file, sample, location: {line: m.line, column: m.column}, id: m.id, description: m.description, properties: m.properties, severity: m.severity, confidence: m.confidence, manualReview: m.manualReview};
              issues.push(issue);
            }
          }
        }
    }

    return issues;
  }
}
