import linenumber from 'linenumber';
import releases from 'electron-releases';
import { lt, coerce } from 'semver';

import { sourceTypes } from '../../parser/types';

export default class ElectronVersionCheck {
  constructor() {
    this.id = 'ELECTRON_VERSION';
    this.description = `The electron version used is outdated.`;
    this.type = sourceTypes.JSON;
  }

  match(data) {
    let location;
    const latest = releases.find(release => release.npm_dist_tag === 'latest').version;

    const electron = data.json.dependencies && 'electron' in data.json.dependencies ? coerce(data.json.dependencies.electron) : undefined;
    const electronDev = data.json.devDependencies && 'electron' in data.json.devDependencies ? coerce(data.json.devDependencies.electron) : undefined;

    if(electron && lt(electron, latest) || electronDev && lt(electronDev, latest)) {
           let matches = linenumber(data.text, /"?electron"?:\s?.*,?/g);
           location = {line: matches[0].line, column: 0};
       }
    return location;
  }
}
