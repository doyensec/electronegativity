import { GLOBAL_CHECKS } from './checks/GlobalChecks';

export class GlobalChecks {
    constructor(issues) {
        this.issues = issues;
        this._enabled_checks = GLOBAL_CHECKS;
        this._constructed_checks = [];
        this.init_checks_list();
    }

    init_checks_list() {
      for (const check of this._enabled_checks) {
        const checkInstance = new check();
        this._constructed_checks.push(checkInstance);
        }
    }

    async getResults() {
        for (const check of this._constructed_checks) {
          this.issues = await check.perform(this.issues);
        }
        return this.issues;
    }
}