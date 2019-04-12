import { coerce } from 'semver';
import { sourceTypes } from '../../parser/types';

export default class ElectronVersionJSONCheck {
  constructor() {
    this.id = 'ELECTRON_VERSION_JSON_CHECK';
    this.description = `Gets the electron version used by inspecting the package.json file.`;
    this.type = sourceTypes.JSON;
  }

  async match(content){
    const electron = content.json.dependencies && 'electron' in content.json.dependencies ? coerce(content.json.dependencies.electron) : undefined;
    const electronDev = content.json.devDependencies && 'electron' in content.json.devDependencies ? coerce(content.json.devDependencies.electron) : undefined;

    let location = [];
    if (electron) {
      location.push({ line: 1, column: 0, id: this.id, description: this.description, properties: { "versionNumber": electron.raw }, manualReview: false });
    }

    if (electronDev) {
      location.push({ line: 1, column: 0, id: this.id, description: this.description, properties: { "versionNumber": electronDev.raw }, manualReview: true });
    }

    return location;
  }

}
