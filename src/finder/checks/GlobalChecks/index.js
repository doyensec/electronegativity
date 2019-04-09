import AffinityGlobalCheck from './AffinityGlobalCheck';
import CSPGlobalCheck from './CSPGlobalCheck';
import LimitNavigationGlobalCheck from './LimitNavigationGlobalCheck';

const GLOBAL_CHECKS = [
  AffinityGlobalCheck,
  CSPGlobalCheck,
  LimitNavigationGlobalCheck
];

module.exports.GLOBAL_CHECKS = GLOBAL_CHECKS;
