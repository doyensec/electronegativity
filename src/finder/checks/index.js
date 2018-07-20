
import EvalCheck from './EvalCheck';
import SandboxCheck from './SandboxCheck';
import AllowpopupCheck from './AllowpopupCheck';
import OpenExternalCheck from './OpenExternalCheck';
import WebSecurityHTMLCheck from './WebSecurityHTMLCheck';
import ProtocolHandlercheck from './ProtocolHandlersCheck';
import InsecureContentHTMLCheck from './InsecureContentHTMLCheck';
import NodeIntegrationHTMLCheck from './NodeIntegrationHTMLCheck';
import WebSecurityJavascriptCheck from './WebSecurityJavascriptCheck';
import InsecureContentJavascriptCheck from './InsecureContentJavascriptCheck';
import NodeIntegrationJavascriptCheck from './NodeIntegrationJavascriptCheck';
import NodeIntegrationJavascriptAttachEventCheck from './NodeIntegrationJavascriptAttachEventCheck';



const ENABLED_CHECKS = [
  EvalCheck,
  SandboxCheck,
  AllowpopupCheck,
  OpenExternalCheck,
  WebSecurityHTMLCheck,
  ProtocolHandlercheck,
  InsecureContentHTMLCheck,
  NodeIntegrationHTMLCheck,
  WebSecurityJavascriptCheck,
  InsecureContentJavascriptCheck,
  NodeIntegrationJavascriptCheck,
  NodeIntegrationJavascriptAttachEventCheck,
];

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
