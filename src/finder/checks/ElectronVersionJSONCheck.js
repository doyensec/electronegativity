import linenumber from 'linenumber';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { lt, coerce, major } from 'semver';
import got from 'got';
import chalk from 'chalk';

import { sourceTypes } from '../../parser/types';

let releases;

export default class ElectronVersionJSONCheck {
  constructor() {
    this.id = 'ELECTRON_VERSION_JSON_CHECK';
    this.description = `Keep dependencies up-to-date. The electron version used is outdated.`;
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

          const devPath = path.resolve('safe_releases.json');
          if (fs.existsSync(devPath))
            cache = devPath;

          console.log(chalk.yellow(`Failed to download ${this.versionsUrl}. Reading from ${cache}.`));
          releases = JSON.parse(fs.readFileSync(cache));
        }
      }

      this.checkVersion(data, location, electron);
      this.checkVersion(data, location, electronDev);
    }
    return location;
  }

  checkVersion(data, location, version) {
    if (version && this.isVulnerableVersion(version)) {
      let matches = linenumber(data.text, /(?:"electron"|electron)\s*:\s*.*[,}]?/g);
      for (const m of matches) {
        if (m.match.includes(version.raw))
          location.push({ line: m.line, column: 0, id: this.id, description: this.description, manualReview: false });
      }
    }
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
