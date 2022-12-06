import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class SetNullMenuDeprecation {
  constructor() {
    this.id = "SET_NULL_MENU_DEPRECATION";
    this.description = __("SET_NULL_MENU_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvVkc';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.property
        && astNode.callee.property.name === 'setMenu')) {
      return null;
    }

    let confidenceLevel = confidence.TENTATIVE
    if (astNode.arguments.length > 0) {
      if (astNode.arguments[0].value === null){
        confidenceLevel = confidence.CERTAIN
      }      
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidenceLevel, manualReview: true }];
  }
}