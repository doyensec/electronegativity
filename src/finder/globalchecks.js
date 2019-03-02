import { GLOBAL_CHECKS } from './checks/GlobalChecks';

export class GlobalChecks {
    constructor(customScan) {
        if (customScan && customScan.length > 0) {
          var globalChecksNames = GLOBAL_CHECKS.map(globalCheck => globalCheck.name.toLowerCase());
          var customGlobals = customScan.filter(r => r.includes('globalcheck'));
          if (customGlobals > 0 && !customGlobals.some(r => globalChecksNames.includes(r))) {
            console.log(chalk.red(`You have an error in your custom checks list. Maybe you misspelt some check names?`));
            process.exit(1);
          } else {
          for (var i = globalChecksNames.length - 1; i >= 0; i--) 
            if (!customGlobals.includes(globalChecksNames[i]))
              GLOBAL_CHECKS.splice(i, 1);
          }
        }
        this._enabled_checks = GLOBAL_CHECKS;
        this._constructed_checks = [];
        this.dependencies = [];
        this.init_checks_list();
    }

    init_checks_list() {
      for (const check of this._enabled_checks) {
        const checkInstance = new check();
        this._constructed_checks.push(checkInstance);
        this.dependencies = [...checkInstance.depends];
        }
      // useful in case some globalcheck dependencies list has non-lowercase characters
      this.dependencies = this.dependencies.map(dependency => dependency.toLowerCase());
    }

    async getResults(issues) {
        for (const check of this._constructed_checks) {
          issues = await check.perform(issues);
        }
        return issues;
    }
}