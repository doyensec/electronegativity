import AffinityGlobalCheck from './AffinityGlobalCheck';
import AvailableSecurityFixesGlobalCheck from './AvailableSecurityFixesGlobalCheck';
import CSPGlobalCheck from './CSPGlobalCheck';
import LimitNavigationGlobalCheck from './LimitNavigationGlobalCheck';
import PermissionRequestHandlerGlobalCheck from './PermissionRequestHandlerGlobalCheck';
import HTTPResourcesAndNodeIntegrationGlobalCheck from './HTTPResourcesAndNodeIntegrationGlobalCheck';

const GLOBAL_CHECKS = [
  AffinityGlobalCheck,
  AvailableSecurityFixesGlobalCheck,
  CSPGlobalCheck,
  LimitNavigationGlobalCheck,
  PermissionRequestHandlerGlobalCheck,
  HTTPResourcesAndNodeIntegrationGlobalCheck
];

module.exports.GLOBAL_CHECKS = GLOBAL_CHECKS;
