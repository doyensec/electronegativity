import { sourceTypes } from "../../parser/types";

export default class PermissionRequestHandler {
  constructor() {
    this.id = 'PERMISSION_REQUEST_HANDLER';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setPermissionRequestHandler")) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
