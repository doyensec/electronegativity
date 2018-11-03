import { sourceTypes } from "../../parser/types";

export default class PermissionRequestHandler {
  constructor() {
    this.id = 'PERMISSION_REQUEST_HANDLER';
    this.description = 'Evaluate the implementation and security of the custom callback in setPermissionRequestHandler';
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setPermissionRequestHandler")) return null;

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
