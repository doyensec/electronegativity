import AffinityGlobalCheck from './AffinityGlobalCheck';
import CSPGlobalCheck from './CSPGlobalCheck';
import PermissionRequestHandlerGlobalCheck from './PermissionRequestHandlerGlobalCheck';

const GLOBAL_CHECKS = [
	AffinityGlobalCheck,
	CSPGlobalCheck,
	PermissionRequestHandlerGlobalCheck
];

module.exports.GLOBAL_CHECKS = GLOBAL_CHECKS;
