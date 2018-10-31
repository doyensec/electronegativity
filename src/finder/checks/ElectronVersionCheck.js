import linenumber from 'linenumber';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { lt, coerce, major } from 'semver';
import got from 'got';
import chalk from 'chalk';

import { sourceTypes } from '../../parser/types';

let releases;

export default class ElectronVersionCheck {
  constructor() {
    this.id = 'ELECTRON_VERSION';
    this.description = `The electron version used is outdated.`;
    this.type = sourceTypes.JSON;
    this.versionsUrl = 'https://raw.githubusercontent.com/doyensec/electronegativity/master/safe_releases.json';
    this.cacheFileName = 'electronegativity_safe_releases.json';
  }

  async match(data) {
    const electron = data.json.dependencies && 'electron' in data.json.dependencies ? coerce(data.json.dependencies.electron) : undefined;
    const electronDev = data.json.devDependencies && 'electron' in data.json.devDependencies ? coerce(data.json.devDependencies.electron) : undefined;

    let location = [];
    if (electron || electronDev) {
      if (!releases) {
        try {
          const response = await got(this.versionsUrl, { json: true });
          releases = response.body;
          fs.writeFileSync(path.join(os.tmpdir(), this.cacheFileName), JSON.stringify(releases));
        } catch (error) {
          let cache = path.join(os.tmpdir(), this.cacheFileName);

          // while the repo is private the url won't work
          const devPath = path.resolve('safe_releases.json');
          if (fs.existsSync(devPath))
            cache = devPath;

          console.log(chalk.yellow(`Failed to download ${this.versionsUrl}. Reading from ${cache}.`));
          releases = JSON.parse(fs.readFileSync(cache));
        }
      }

      if (electron && this.isVulnerableVersion(electron) || electronDev && this.isVulnerableVersion(electronDev)) {
        let matches = linenumber(data.text, /(?:"electron"|electron)\s*:\s*.*[,}]?/g);
        for (const m of matches)
          location.push({ line: m.line, column: 0, id: this.id, description: this.description, manualReview: false });
      }
    }
    return location;
  }

  isVulnerableVersion(version) {
    const majorVersion = major(version);
    for (const safe of releases.safe) {
      if (major(safe) === majorVersion)
        return lt(version, safe);
    }
    return true;
  }
}
