import AffinityGlobalCheck from './AffinityGlobalCheck';
import AvailableSecurityFixesGlobalCheck from './AvailableSecurityFixesGlobalCheck';
import CSPGlobalCheck from './CSPGlobalCheck';
import LimitNavigationGlobalCheck from './LimitNavigationGlobalCheck';
import PermissionRequestHandlerGlobalCheck from './PermissionRequestHandlerGlobalCheck';

const GLOBAL_CHECKS = [
  AffinityGlobalCheck,
  AvailableSecurityFixesGlobalCheck,
  CSPGlobalCheck,
  LimitNavigationGlobalCheck,
  PermissionRequestHandlerGlobalCheck
];

module.exports.GLOBAL_CHECKS = GLOBAL_CHECKS;
