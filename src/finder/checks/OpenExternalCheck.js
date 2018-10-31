import { sourceTypes } from "../../parser/types";

export default class OpenExternalCheck {
  constructor() {
    this.id = 'OPEN_EXTERNAL_CHECK';
    this.description = `Review the use of openExternal`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "openExternal")) return null;
    if (data.arguments[0].type === ast.StringLiteral) return null; // constant, not user supplied

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
