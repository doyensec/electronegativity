import { CHECKS } from './checks/AtomicChecks';
import { sourceTypes } from '../parser/types';
import { ELECTRON_ATOMIC_UPGRADE_CHECKS } from './checks/AtomicChecks/ElectronAtomicUpgradeChecks';
import chalk from 'chalk';

export class Finder {
  constructor(customScan, electronUpgrade) {
    let candidateChecks = Array.from(CHECKS) 
    if (electronUpgrade) {
      const [currentVersion, targetVersion] = electronUpgrade.split('..');
      if (currentVersion && targetVersion) {
        Object.keys(ELECTRON_ATOMIC_UPGRADE_CHECKS).forEach(versionToCheck => {
          if (versionToCheck > currentVersion && versionToCheck <= targetVersion) {            
            candidateChecks = candidateChecks.concat(ELECTRON_ATOMIC_UPGRADE_CHECKS[versionToCheck]);
          }
        })
      } else {
        console.log(chalk.red(`When specifying the upgrade options please specify your current version and target version like this: x..y (eg 7..8)`));
        process.exit(1);
      }
    }
    this._enabled_checks = Object.assign(Object.create(candidateChecks), candidateChecks);
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

  async find(file, data, type, content, use_only_checks = null, electron_version = null) {
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
              const matches = check.match(rootData.astParser.getNode(node), rootData.astParser, rootData.Scope, electron_version);
              if (matches) {
                for(const m of matches) {
                  const sample = this.get_sample(fileLines, m.line - 1);
                  const issue = { file, sample, location: {line: m.line, column: m.column}, id: m.id, description: m.description, properties: m.properties, severity: m.severity, confidence: m.confidence, manualReview: m.manualReview, shortenedURL: m.shortenedURL };
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
          const matches = check.match(data, content, electron_version);
          if(matches){
            for(const m of matches) {
              const sample = this.get_sample(fileLines, m.line - 1);
              const issue = {file, sample, location: {line: m.line, column: m.column}, id: m.id, description: m.description, properties: m.properties, severity: m.severity, confidence: m.confidence, manualReview: m.manualReview, shortenedURL: m.shortenedURL };
              issues.push(issue);
            }
          }
        }
        break;
      case sourceTypes.JSON:
        for (const check of checks) {
          const matches = await check.match(data, electron_version);
          if (matches) {
            for(const m of matches) {
              const sample = this.get_sample(fileLines, m.line - 1);
              const issue = {file, sample, location: {line: m.line, column: m.column}, id: m.id, description: m.description, properties: m.properties, severity: m.severity, confidence: m.confidence, manualReview: m.manualReview, shortenedURL: m.shortenedURL };
              issues.push(issue);
            }
          }
        }
    }

    return issues;
  }
}
