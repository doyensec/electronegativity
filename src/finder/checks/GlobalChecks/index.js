import AffinityGlobalCheck from './AffinityGlobalCheck';
import CSPGlobalCheck from './CSPGlobalCheck';
import LimitNavigationGlobalCheck from './LimitNavigationGlobalCheck';
import PermissionRequestHandlerGlobalCheck from './PermissionRequestHandlerGlobalCheck';

const GLOBAL_CHECKS = [
  AffinityGlobalCheck,
  CSPGlobalCheck,
  LimitNavigationGlobalCheck,
	PermissionRequestHandlerGlobalCheck
];

module.exports.GLOBAL_CHECKS = GLOBAL_CHECKS;
