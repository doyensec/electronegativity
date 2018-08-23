import { sourceTypes } from "../../parser/types";

export default class OpenExternalCheck {
  constructor() {
    this.id = 'OPEN_EXTERNAL_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "openExternal")) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
