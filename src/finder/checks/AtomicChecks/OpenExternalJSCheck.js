import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class OpenExternalJSCheck {
  constructor() {
    this.id = 'OPEN_EXTERNAL_JS_CHECK';
    this.description = `Review the use of openExternal`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.property && astNode.callee.property.name === "openExternal")) return null;
    if (astNode.arguments[0].type === astHelper.StringLiteral) return null; // constant, not user supplied

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
  }
}
