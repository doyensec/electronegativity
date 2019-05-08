import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class CustomArgumentsJSCheck {
  constructor() {
    this.id = 'CUSTOM_ARGUMENTS_JS_CHECK';
    this.description = `Review the use of custom command line arguments`;
    this.type = sourceTypes.JAVASCRIPT;
    this.dangerousArguments = [
      "ignore-certificate-errors",
      "ignore-certificate-errors-spki-list",
      "ignore-urlfetcher-cert-requests",
      "disable-web-security",
      "host-rules",
      "host-resolver-rules",
      "auth-server-whitelist",
      "auth-negotiate-delegate-whitelist",
      "js-flags",
      "allow-file-access-from-files",
      "allow-no-sandbox-job",
      "allow-running-insecure-content",
      "cipher-suite-blacklist",
      "debug-packed-apps",
      "disable-features",
      "disable-kill-after-bad-ipc",
      "disable-webrtc-encryption",
      "disable-xss-auditor",
      "enable-local-file-accesses",
      "enable-nacl-debug",
      "remote-debugging-address",
      "remote-debugging-port",
      "inspect",
      "inspect-brk",
      "explicitly-allowed-ports",
      "expose-internals-for-testing",
      "gpu-launcher",
      "nacl-dangerous-no-sandbox-nonsfi",
      "nacl-gdb-script",
      "net-log-capture-mode",
      "no-sandbox",
      "reduce-security-for-testing",
      "unsafely-treat-insecure-origin-as-secure"
    ];
  }

  match(astNode) {
    const methods = ['appendArgument', 'appendSwitch'];

    if (astNode.type !== 'CallExpression') return null;
    if ((astNode.callee.name && methods.includes(astNode.callee.name)) || (astNode.callee.property && methods.includes(astNode.callee.property.name))) {
      if (astNode.arguments && astNode.arguments.length > 0 && (astNode.arguments[0].type === "Literal" || astNode.arguments[0].type === "StringLiteral") && astNode.arguments[0].value) {
        var res = this.dangerousArguments.some(function(arg) {
          return astNode.arguments[0].value.includes(arg);
        });

        if (res)
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: false }];
      }
    }
  }
}
