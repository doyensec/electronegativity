import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class ClearAuthCache {
  constructor() {
    this.id = "CLEAR_AUTH_CACHE_DEPRECATION";
    this.description = __("CLEAR_AUTH_CACHE_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jvuxg';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.property
        && astNode.callee.property.name === 'clearAuthCache')) {
      return null;
    }

    if (astNode.arguments.length > 0) {      
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];        
    }

    return null;
  }
}