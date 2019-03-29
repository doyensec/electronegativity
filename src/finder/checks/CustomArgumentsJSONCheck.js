import linenumber from 'linenumber';
import fs from 'fs';
import path from 'path';
import os from 'os';
import got from 'got';
import chalk from 'chalk';

import { sourceTypes } from '../../parser/types';

export default class CustomArgumentsJSONCheck {
  constructor() {
    this.id = 'CUSTOM_ARGUMENTS_JSON_CHECK';
    this.description = `Search for dangerous runtime flags in the package.json file.`;
    this.type = sourceTypes.JSON;
    this.dangerousArguments = ["--ignore-certificate-errors", "--disable-web-security"];
  }

  async match(content){
    const npmScripts = content.json.scripts ? content.json.scripts : undefined; //https://docs.npmjs.com/misc/scripts
    const npmConfig = content.json.config ? content.json.config : undefined; //https://docs.npmjs.com/misc/scripts#special-packagejson-config-object

    let location = [];

    // We look for "scripts" key-values
    if (npmScripts && Object.keys(npmScripts).length > 0) {

      for (var script in npmScripts) {
        if (npmScripts.hasOwnProperty(script)) {

          var res = this.dangerousArguments.some(function(arg) {
            return npmScripts[script].includes(arg);
          });

          if (res) {
            let ln = linenumber(content.text, npmScripts[script]);
            location.push({ line: ln[0].line, column: 0, id: this.id, description: this.description, manualReview: false });
          }

        }
      }
    }

    // We look for "config" key-values
    if (npmConfig && Object.keys(npmConfig).length > 0) {
      for (var config in npmConfig) {
        if (npmConfig.hasOwnProperty(config)) {

          var res = this.dangerousArguments.some(function(arg) {
            return npmConfig[config].includes(arg);
          });

          if (res) {
            let ln = linenumber(content.text, npmConfig[config]);
            location.push({ line: ln[0].line, column: 0, id: this.id, description: this.description, manualReview: false });
          }

        }
      }

    }
    return location;
  }
}
