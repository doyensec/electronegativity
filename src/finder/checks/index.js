import { NodeIntegrationJavascriptCheck } from './NodeIntegrationJavascriptCheck';
import { NodeIntegrationJavascriptAttachEventCheck } from './NodeIntegrationJavascriptAttachEventCheck';
import { NodeIntegrationHTMLCheck } from './NodeIntegrationHTMLCheck';

let ENABLED_CHECKS = [
  NodeIntegrationJavascriptCheck,
  NodeIntegrationJavascriptAttachEventCheck,
  NodeIntegrationHTMLCheck
]

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
