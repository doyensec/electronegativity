import { coerce } from 'semver';
import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class ElectronVersionJSONCheck {
  constructor() {
    this.id = "ELECTRON_VERSION_JSON_CHECK";
    this.description = __("ELECTRON_VERSION_JSON_CHECK");
    this.type = sourceTypes.JSON;
    this.shortenedURL = "https://git.io/JeuMf";
  }

  async match(content){
    const electron = content.json.dependencies && 'electron' in content.json.dependencies ? coerce(content.json.dependencies.electron) : undefined;
    const electronDev = content.json.devDependencies && 'electron' in content.json.devDependencies ? coerce(content.json.devDependencies.electron) : undefined;

    let location = [];
    if (electron) {
      location.push({ line: 1, column: 0, id: this.id, description: this.description, shortenedURL: this.shortenedURL, properties: { "versionNumber": electron.raw }, severity: severity.INFORMATIONAL, confidence: confidence.CERTAIN, manualReview: false });
    }

    if (electronDev) {
      location.push({ line: 1, column: 0, id: this.id, description: this.description, shortenedURL: this.shortenedURL, properties: { "versionNumber": electronDev.raw }, severity: severity.INFORMATIONAL, confidence: confidence.CERTAIN, manualReview: true });
    }

    return location;
  }

}
