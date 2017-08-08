import logger from 'winston';
import estraverse from 'estraverse';

import { ENABLED_CHECKS } from './checks';
import { sourceTypes, sourceExtensions } from '../parser/types';
import { Issue } from './issue';

export class Finder {
  constructor () {
    this._enabled_checks = ENABLED_CHECKS;
    this._checks_by_type = new Map();
    this.init_checks_list();
  }

  get enabled_checks() { return this._enabled_checks; }
  get checks_by_type() { return this._checks_by_type; }

  init_checks_list() {
    for (let type of Object.keys(sourceTypes)) {
      logger.debug("Known file types : " + type);
      this._checks_by_type.set(sourceTypes[type], []);
    }
    for (let check of this.enabled_checks) {
      const checkInstance = new check()
      logger.debug("Enabled checks : " + checkInstance.type);
      this._checks_by_type.get(checkInstance.type).push(checkInstance);
    }
    logger.debug(`Initialized ${this.enabled_checks.length} check(s).`);
  }

  find(file, data, type, use_only_checks = null) {
    const checks = this._checks_by_type.get(type).filter((check) => {
      if (use_only_checks && !use_only_checks.includes(check.id)) {
        return false;
      } else {
        return true;
      }
    });
    const issues = [];
    switch(type) {
      case sourceTypes.JAVASCRIPT:
        logger.debug("Finding JAVASCRIPT issues in " + file);
        // Traverse AST and apply checks
        estraverse.traverse(data, {
          enter : (node, parent) => {
            for (let check of checks) {
              const loc = check.match(node);
              if (loc) {
                logger.debug("    found issue at " + loc.line + ":" + loc.column);
                const issue = new Issue(type, file, loc.line, loc.column)
                issues.push(new Map().set('loc', issue).set('check', check));
              }
            }
          }
        });

        break;
      case sourceTypes.HTML:
        logger.debug("Finding HTML issues");
        for (let check of checks) {
          const loc = check.match(data);
          if (loc.length > 0) {
            for (let l of loc) {
              logger.debug("    found issue at " + l.line + ":" + l.column);
              const issue = new Issue(type, file, l.line, l.column)
              issues.push(new Map().set('loc', issue).set('check', check));
            }
          }
        }
        break;
      default:
      logger.error("Unknown source type : " + type);
      break;
    }

    return issues;
  }

}
