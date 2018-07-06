
import EvalCheck from './EvalCheck';
import SandboxCheck from './SandboxCheck';
import AllowpopupCheck from './AllowpopupCheck';
import OpenExternalCheck from './OpenExternalCheck';
import WebSecurityHTMLCheck from './WebSecurityHTMLCheck';
import ProtocolHandlercheck from './ProtocolHandlersCheck';
import NodeIntegrationHTMLCheck from './NodeIntegrationHTMLCheck';
import WebSecurityJavascriptCheck from './WebSecurityJavascriptCheck';
import NodeIntegrationJavascriptCheck from './NodeIntegrationJavascriptCheck';
import NodeIntegrationJavascriptAttachEventCheck from './NodeIntegrationJavascriptAttachEventCheck';



const ENABLED_CHECKS = [
  EvalCheck,
  SandboxCheck,
  AllowpopupCheck,
  OpenExternalCheck,
  WebSecurityHTMLCheck,
  ProtocolHandlercheck,
  NodeIntegrationHTMLCheck,
  WebSecurityJavascriptCheck,
  NodeIntegrationJavascriptCheck,
  NodeIntegrationJavascriptAttachEventCheck,
];

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
