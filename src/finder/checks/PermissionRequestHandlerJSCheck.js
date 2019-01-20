import { sourceTypes } from "../../parser/types";

export default class PermissionRequestHandlerJSCheck {
  constructor() {
    this.id = 'PERMISSION_REQUEST_HANDLER_JS_CHECK';
    this.description = 'Evaluate the implementation of the custom callback in setPermissionRequestHandler';
    this.type = sourceTypes.JAVASCRIPT;
  }

  /*
    Ideally, we should improve this check to detect whenever `setPermissionRequestHandler` is not used at all
    See https://github.com/doyensec/electronegativity/issues/24
  */

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setPermissionRequestHandler")) return null;

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}