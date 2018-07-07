
import SandboxCheck from './SandboxCheck';
import WebSecurityHTMLCheck from './WebSecurityHTMLCheck';
import ProtocolHandlercheck from './ProtocolHandlersCheck';
import NodeIntegrationHTMLCheck from './NodeIntegrationHTMLCheck';
import WebSecurityJavascriptCheck from './WebSecurityJavascriptCheck';
import NodeIntegrationJavascriptCheck from './NodeIntegrationJavascriptCheck';
import NodeIntegrationJavascriptAttachEventCheck from './NodeIntegrationJavascriptAttachEventCheck';



const ENABLED_CHECKS = [
  SandboxCheck,
  WebSecurityHTMLCheck,
  ProtocolHandlercheck,
  NodeIntegrationHTMLCheck,
  WebSecurityJavascriptCheck,
  NodeIntegrationJavascriptCheck,
  NodeIntegrationJavascriptAttachEventCheck,
];

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
