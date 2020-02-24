import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class QuerySystemIdleState {
  constructor() {
    this.id = 'QUERY_SYSTEM_IDLE_STATE_REMOVAL';
    this.description = '(ELECTRON 7) The powerMonitor.querySystemIdleState API has been replaced with the synchronous API powerMonitor.getSystemIdleState.';
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jvuxw';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property
        || astNode.callee.property.name !== 'querySystemIdleState') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
  }
}