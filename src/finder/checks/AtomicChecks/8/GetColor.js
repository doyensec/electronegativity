import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class GetColor {
  constructor() {
    this.id = "GET_COLOR_DEPRECATION";
    this.description = __("GET_COLOR_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvuxH';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.object && astNode.callee.object.name === 'systemPreferences')) {
      return null;
    }
    if (!(astNode.callee.property
        && astNode.callee.property.name === 'getColor')) {
      return null;
    }

    let location = [];

    if (astNode.arguments.length > 0) {
        if (astNode.arguments[0].type !== astHelper.StringLiteral) return null;
        if (astNode.arguments[0].value === 'alternate-selected-control-text') {
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];
        }
    }

    return location;
  }
}