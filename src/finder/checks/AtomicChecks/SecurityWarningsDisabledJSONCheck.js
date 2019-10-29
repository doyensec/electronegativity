import linenumber from 'linenumber';
import { severity, confidence } from '../../attributes';
import { sourceTypes } from '../../../parser/types';

export default class SecurityWarningsDisabledJSONCheck {
  constructor() {
    this.id = 'SECURITY_WARNINGS_DISABLED_JSON_CHECK';
    this.description = `Warns about flags disabling security warnings in the package.json file.`;
    this.type = sourceTypes.JSON;
    this.shortenedURL = "https://git.io/JeuMw";
    this.dangerousFlag = "ELECTRON_DISABLE_SECURITY_WARNINGS";
  }

  async match(content){
    const npmScripts = content.json.scripts ? content.json.scripts : undefined; //https://docs.npmjs.com/misc/scripts
    const npmConfig = content.json.config ? content.json.config : undefined; //https://docs.npmjs.com/misc/scripts#special-packagejson-config-object

    let location = [];

    // We look for "scripts" key-values
    if (npmScripts && Object.keys(npmScripts).length > 0) {

      for (var script in npmScripts) {
        if (npmScripts.hasOwnProperty(script)) {

          var res = npmScripts[script].includes(this.dangerousFlag);

          if (res) {
            let ln = linenumber(content.text, npmScripts[script]);
            location.push({ line: ln[0].line, column: 0, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.INFORMATIONAL, confidence: confidence.CERTAIN, manualReview: false });
          }

        }
      }
    }

    // We look for "config" key-values
    if (npmConfig && Object.keys(npmConfig).length > 0) {
      for (var config in npmConfig) {
        if (npmConfig.hasOwnProperty(config)) {

          var res = npmConfig[config].includes(this.dangerousFlag);

          if (res) {
            let ln = linenumber(content.text, npmConfig[config]);
            location.push({ line: ln[0].line, column: 0, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.INFORMATIONAL, confidence: confidence.CERTAIN, manualReview: false });
          }

        }
      }

    }
    return location;
  }
}