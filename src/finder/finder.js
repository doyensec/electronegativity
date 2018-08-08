import logger from 'winston';
import estraverse from 'estraverse';

import { ENABLED_CHECKS } from './checks';
import { sourceTypes, sourceExtensions } from '../parser/types';

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
      logger.debug(`Known file types : ${type}`);
      this._checks_by_type.set(sourceTypes[type], []);
    }
    for (const check of this.enabled_checks) {
      const checkInstance = new check();
      logger.debug(`Enabled checks : ${checkInstance.type}`);
      this._checks_by_type.get(checkInstance.type).push(checkInstance);
    }
    logger.debug(`Initialized ${this.enabled_checks.length} check(s).`);
  }

  find(file, data, type, use_only_checks = null) {
    const checks = this._checks_by_type.get(type).filter((check) => {
      if (use_only_checks && !use_only_checks.includes(check.id)) {
        return false;
      }
      return true;
    });
    const issues = [];
    switch (type) {
      case sourceTypes.JAVASCRIPT:
        estraverse.traverse(data, {
          enter: (node, parent) => {
            for (const check of checks) {
              const location = check.match(node);
              if (location) {
                const issue = {location, file, check};
                issues.push(issue);
              }
            }
          },
        });

        break;
      case sourceTypes.HTML:
        for (const check of checks) {
          const loc = check.match(data);
          if (loc.length > 0) {
            for (const l of loc) {
              const issue = {location, file, check};
              issues.push(issue);
            }
          }
        }
        break;
      default:
        logger.error(`Unknown source type : ${type}`);
        break;
    }

    return issues;
  }
}
