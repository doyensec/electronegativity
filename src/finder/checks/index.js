import AllowPopupsHTMLCheck from './AllowPopupHTMLCheck';
import AuxclickHTMLCheck from './AuxclickHTMLCheck';
import AuxclickJSCheck from './AuxclickJSCheck';
import BlinkFeaturesHTMLCheck from './BlinkFeaturesHTMLCheck';
import BlinkFeaturesJSCheck from './BlinkFeaturesJSCheck';
import CertificateErrorEventJSCheck from './CertificateErrorEventJSCheck';
import CertificateVerifyProcJSCheck from './CertificateVerifyProcJSCheck';
import ContextIsolationJSCheck from './ContextIsolationJSCheck';
import CustomArgumentsJSCheck from './CustomArgumentsJSCheck';
import DangerousFunctionsJSCheck from './DangerousFunctionsJSCheck';
import ElectronVersionJSONCheck from './ElectronVersionJSONCheck';
import ExperimentalFeaturesHTMLCheck from './ExperimentalFeaturesHTMLCheck';
import ExperimentalFeaturesJSCheck from './ExperimentalFeaturesJSCheck';
import HTTPResourcesHTMLCheck from './HTTPResourcesHTMLCheck';
import HTTPResourcesJSCheck from './HTTPResourcesJSCheck';
import InsecureContentHTMLCheck from './InsecureContentHTMLCheck';
import InsecureContentJSCheck from './InsecureContentJSCheck';
import NodeIntegrationHTMLCheck from './NodeIntegrationHTMLCheck';
import NodeIntegrationJSCheck from './NodeIntegrationJSCheck';
import NodeIntegrationAttachEventJSCheck from './NodeIntegrationAttachEventJSCheck';
import OpenExternalJSCheck from './OpenExternalJSCheck';
import PermissionRequestHandlerJSCheck from './PermissionRequestHandlerJSCheck';
import SandboxJSCheck from './SandboxJSCheck';
import PreloadJSCheck from './PreloadJSCheck';
import ProtocolHandlersJSCheck from './ProtocolHandlersJSCheck';
import WebSecurityHTMLCheck from './WebSecurityHTMLCheck';
import WebSecurityJSCheck from './WebSecurityJSCheck';


const ENABLED_CHECKS = [
  AllowPopupsHTMLCheck,
  AuxclickHTMLCheck,
  AuxclickJSCheck,
  BlinkFeaturesHTMLCheck,
  BlinkFeaturesJSCheck,
  CertificateErrorEventJSCheck,
  CertificateVerifyProcJSCheck,
  ContextIsolationJSCheck,
  CustomArgumentsJSCheck,
  DangerousFunctionsJSCheck,
  //ElectronVersionJSONCheck, //removed until marking the git public
  ExperimentalFeaturesJSCheck,
  ExperimentalFeaturesHTMLCheck,
  HTTPResourcesHTMLCheck,
  HTTPResourcesJSCheck,
  InsecureContentHTMLCheck,
  InsecureContentJSCheck,
  NodeIntegrationHTMLCheck,
  NodeIntegrationJSCheck,
  NodeIntegrationAttachEventJSCheck,
  OpenExternalJSCheck,
  PermissionRequestHandlerJSCheck,
  SandboxJSCheck,
  PreloadJSCheck,
  ProtocolHandlersJSCheck,
  WebSecurityHTMLCheck,
  WebSecurityJSCheck,
];

module.exports.ENABLED_CHECKS = ENABLED_CHECKS;
