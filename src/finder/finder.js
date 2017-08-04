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
  }

  find(file, data, type) {
    const checks = this._checks_by_type.get(type);
    const issues = [];
    switch(type) {
      case sourceTypes.JAVASCRIPT:
        logger.debug("Finding JAVASCRIPT issues in " + file);
        // Traverse AST and apply checks
        estraverse.traverse(data, {
          enter : (node, parent) => {
            for (let check of checks) {
              // logger.debug("  -> using check " + check.type);
              const loc = check.match(node);
              if (loc) {
                logger.debug("    found issue at " + loc.line + ":" + loc.column);
                const issue = new Issue(type, file, loc.line, loc.column)
                issues.push(issue);
              }
            }
          }
        });

        break;
      case sourceTypes.HTML:
        logger.debug("Finding HTML issues");
        // TODO: Apply queries to DOM
        // ...
        break;
      default:
      logger.error("Cannot find issues for source type : " + type);
      break;
    }

    return issues;
  }

}
