
import EvalCheck from './EvalCheck';
import SandboxCheck from './SandboxCheck';
import PreloadCheck from './PreloadCheck';
import AuxclickCheck from './AuxclickCheck';
import AllowpopupCheck from './AllowpopupCheck';
import OpenExternalCheck from './OpenExternalCheck';
import BlinkFeaturesCheck from './BlinkFeaturesCheck';
import HTTPResourcesCheck from './HTTPResourcesCheck';
import WebSecurityHTMLCheck from './WebSecurityHTMLCheck';
import CustomArgumentsCheck from './CustomArgumentsCheck';
import ProtocolHandlercheck from './ProtocolHandlersCheck';
import ContextIsolationCheck from './ContextIsolationCheck';
import BlinkFeaturesHTMLCheck from './BlinkFeaturesHTMLCheck';
import HTTPResourcesHTMLCheck from './HTTPResourcesHTMLCheck';
import InsecureContentHTMLCheck from './InsecureContentHTMLCheck';
import NodeIntegrationHTMLCheck from './NodeIntegrationHTMLCheck';
import CertificateVerifyProcCheck from './CertificateVerifyProcCheck';
import WebSecurityJavascriptCheck from './WebSecurityJavascriptCheck';
import CertificateErrorEventCheck from './CertificateErrorEventCheck';
import PermissionRequestHandlerCheck from './PermissionRequestHandlerCheck';
import ExperimentalFeaturesHTMLCheck from './ExperimentalFeaturesHTMLCheck';
import InsecureContentJavascriptCheck from './InsecureContentJavascriptCheck';
import NodeIntegrationJavascriptCheck from './NodeIntegrationJavascriptCheck';
import ExperimentalFeaturesJavascriptCheck from './ExperimentalFeaturesJavascriptCheck';
import NodeIntegrationJavascriptAttachEventCheck from './NodeIntegrationJavascriptAttachEventCheck';



const ENABLED_CHECKS = [
  EvalCheck,
  SandboxCheck,
  PreloadCheck,
  AuxclickCheck,
  AllowpopupCheck,
  OpenExternalCheck,
  BlinkFeaturesCheck,
  HTTPResourcesCheck,
  WebSecurityHTMLCheck,
  CustomArgumentsCheck,
  ProtocolHandlercheck,
  ContextIsolationCheck,
  HTTPResourcesHTMLCheck,
  BlinkFeaturesHTMLCheck,
  InsecureContentHTMLCheck,
  NodeIntegrationHTMLCheck,
  CertificateVerifyProcCheck,
  WebSecurityJavascriptCheck,
  CertificateErrorEventCheck,
  PermissionRequestHandlerCheck,
  ExperimentalFeaturesHTMLCheck,
  InsecureContentJavascriptCheck,
  NodeIntegrationJavascriptCheck,
  ExperimentalFeaturesJavascriptCheck,
  NodeIntegrationJavascriptAttachEventCheck,
];

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
