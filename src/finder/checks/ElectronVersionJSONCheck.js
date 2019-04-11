import linenumber from 'linenumber';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { lt, coerce, major, minor } from 'semver';
import got from 'got';
import chalk from 'chalk';

import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

let releases;

export default class ElectronVersionJSONCheck {
  constructor() {
    this.id = 'ELECTRON_VERSION_JSON_CHECK';
    this.description = `Keep dependencies up-to-date. The electron version used is outdated.`;
    this.type = sourceTypes.JSON;
    this.versionsUrl = 'https://raw.githubusercontent.com/doyensec/electronegativity/master/safe_releases.json';
    this.cacheFileName = 'electronegativity_safe_releases.json';
  }

  async match(content){
    const electron = content.json.dependencies && 'electron' in content.json.dependencies ? coerce(content.json.dependencies.electron) : undefined;
    const electronDev = content.json.devDependencies && 'electron' in content.json.devDependencies ? coerce(content.json.devDependencies.electron) : undefined;

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

      this.checkVersion(content, location, electron);
      this.checkVersion(content, location, electronDev);
    }
    return location;
  }

  checkVersion(data, location, version) {
    if (version && this.isVulnerableVersion(version)) {
      let matches = linenumber(data.text, /(?:"electron"|electron)\s*:\s*.*[,}]?/g);
      for (const m of matches) {
        if (m.match.includes(version.raw))
          location.push({ line: m.line, column: 0, id: this.id, description: this.description, severity: severity.HIGH, confidence: confidence.TENTATIVE, manualReview: false });
      }
    }
  }

  isVulnerableVersion(version) {
    const majorVersion = major(version);
    const minorVersion = minor(version);
    for (const safe of releases.safe) {
      if (major(safe) === majorVersion && minor(safe) === minorVersion)
        return lt(version, safe);
    }
    return true;
  }
}
