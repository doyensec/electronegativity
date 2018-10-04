import { sourceTypes } from "../../parser/types";

export default class OpenExternalCheck {
  constructor() {
    this.id = 'OPEN_EXTERNAL_CHECK';
    this.description = `Review the use of openExternal`;
    this.type = sourceTypes.JAVASCRIPT;
    this.manualReview = true;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "openExternal")) return null;
    if (data.arguments[0].type === "Literal") return null; // constant, not user supplied

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
