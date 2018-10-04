import estraverse from 'estraverse-fb';

import { ENABLED_CHECKS } from './checks';
import { sourceTypes } from '../parser/types';

export class Finder {
  constructor() {
    this._enabled_checks = ENABLED_CHECKS;
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

  find(file, data, type, content, use_only_checks = null) {
    const checks = this._checks_by_type.get(type).filter((check) => {
      if (use_only_checks && !use_only_checks.includes(check.id)) {
        return false;
      }
      return true;
    });
    const fileLines = content.toString().split('\n');
    const issues = [];
    switch (type) {
      case sourceTypes.JAVASCRIPT:
        estraverse.traverse(data, {
          enter: (node, parent) => {
            for (const check of checks) {
              const location = check.match(node);
              if (location) {
                const sample = fileLines[location.line-1]
                const issue = {location, file, check, content, sample};
                issues.push(issue);
              }
            }
          },
        });

        break;
      case sourceTypes.HTML:
        for (const check of checks) {
          const locations = check.match(data, content);
          if(locations.length > 0){
            for(const location of locations) {
              const sample = fileLines[location.line-1]
              const issue = {location, file, check, content, sample};
              issues.push(issue);
            }
          }
        }
        break;
      case sourceTypes.JSON:
        for (const check of checks) {
          const location = check.match(data);
          if (location){
            const sample = fileLines[location.line-1]
            const issue = {location, file, check, content, sample};
            issues.push(issue);
          }
        }
    }

    return issues;
  }
}
