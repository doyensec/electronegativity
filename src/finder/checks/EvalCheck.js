import { sourceTypes } from '../../parser/types';

export default class EvalCheck {
  constructor() {
    this.id = 'EVAL_CHECK';
    this.description = `Do not use insertCSS, executeJavaScript or eval with user-supplied content`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    const methods = [
      'executeJavascript',
      'eval',
      'insertCSS'];

    if (data.type !== 'CallExpression') return null;
    if (!methods.includes(data.callee.name) && !(data.callee.property && methods.includes(data.callee.property.name))) return null;
    if (data.arguments[0].type === ast.StringLiteral) return null; // constant, not user supplied

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
