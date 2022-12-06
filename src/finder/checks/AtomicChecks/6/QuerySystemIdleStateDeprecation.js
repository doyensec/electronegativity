import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class QuerySystemIdleState {
  constructor() {
    this.id = "QUERY_SYSTEM_IDLE_STATE_DEPRECATION";
    this.description = __("QUERY_SYSTEM_IDLE_STATE_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jva8V';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property
        || astNode.callee.property.name !== 'querySystemIdleState') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];
  }
}