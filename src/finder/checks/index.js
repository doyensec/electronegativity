import { NodeIntegrationJavascriptCheck } from './NodeIntegrationJavascriptCheck';
import { NodeIntegrationHTMLCheck } from './NodeIntegrationHTMLCheck';

let ENABLED_CHECKS = [
  NodeIntegrationJavascriptCheck,
  NodeIntegrationHTMLCheck
]

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
