import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class QuerySystemIdleTime {
  constructor() {
    this.id = "QUERY_SYSTEM_IDLE_TIME_REMOVAL";
    this.description = __("QUERY_SYSTEM_IDLE_TIME_REMOVAL");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jvuxo';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property
        || astNode.callee.property.name !== 'querySystemIdleTime') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
  }
}