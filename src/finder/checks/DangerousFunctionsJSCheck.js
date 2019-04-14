import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

export default class DangerousFunctionsJSCheck {
  constructor() {
    this.id = 'DANGEROUS_FUNCTIONS_JS_CHECK';
    this.description = `Do not use insertCSS, executeJavaScript or eval with user-supplied content`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper){
    const methods = [
      'executeJavascript',
      'eval',
      'setImmediate',
      'insertCSS'];

    if (astNode.type !== 'CallExpression') return null;
    if (!methods.includes(astNode.callee.name) && !(astNode.callee.property && methods.includes(astNode.callee.property.name))) return null;
    if (astNode.arguments[0].type === astHelper.StringLiteral) return null; // constant, not user supplied

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: true }];
  }
}
