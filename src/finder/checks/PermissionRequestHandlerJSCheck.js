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

  match(astNode){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.property && astNode.callee.property.name === "setPermissionRequestHandler")) return null;

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}