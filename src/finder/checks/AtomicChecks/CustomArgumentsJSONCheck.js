import linenumber from 'linenumber';

import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class CustomArgumentsJSONCheck {
  constructor() {
    this.id = 'CUSTOM_ARGUMENTS_JSON_CHECK';
    this.description = `Search for dangerous runtime flags in the package.json file.`;
    this.type = sourceTypes.JSON;
    this.shortenedURL = "https://git.io/Jeu1j";
    this.dangerousArguments = [
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
      "--ignore-urlfetcher-cert-requests",
      "--disable-web-security",
      "--host-rules",
      "--host-resolver-rules",
      "--auth-server-whitelist",
      "--auth-negotiate-delegate-whitelist",
      "--js-flags",
      "--allow-file-access-from-files",
      "--allow-no-sandbox-job",
      "--allow-running-insecure-content",
      "--cipher-suite-blacklist",
      "--debug-packed-apps",
      "--disable-features",
      "--disable-kill-after-bad-ipc",
      "--disable-webrtc-encryption",
      "--disable-xss-auditor",
      "--enable-local-file-accesses",
      "--enable-nacl-debug",
      "--remote-debugging-address",
      "--remote-debugging-port",
      "--inspect",
      "--inspect-brk",
      "--explicitly-allowed-ports",
      "--expose-internals-for-testing",
      "--gpu-launcher",
      "--nacl-dangerous-no-sandbox-nonsfi",
      "--nacl-gdb-script",
      "--no-sandbox",
      "--reduce-security-for-testing",
      "--unsafely-treat-insecure-origin-as-secure"
    ];
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
            location.push({ line: ln[0].line, column: 0, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: false });
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
            location.push({ line: ln[0].line, column: 0, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: false });
          }

        }
      }

    }
    return location;
  }
}