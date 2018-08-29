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
    const json = JSON.parse(data);
    const latest = releases.find(release => release.npm_dist_tag === 'latest').version;

    const electron = 'electron' in json.dependencies ? coerce(json.dependencies.electron) : undefined;
    const electronDev = 'electron' in json.devDependencies ? coerce(json.devDependencies.electron) : undefined;

    if(electron && lt(electron, latest) || electronDev && lt(electronDev, latest)) {
           let matches = linenumber(data, /"?electron"?:\s?.*,?/g);
           location = {line: matches[0].line, column: 0};
       }
    return location;
  }
}
