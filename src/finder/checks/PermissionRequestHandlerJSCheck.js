import { sourceTypes } from "../../parser/types";

export default class PermissionRequestHandlerJSCheck {
  constructor() {
    this.id = 'PERMISSION_REQUEST_HANDLER_JS_CHECK';
    this.description = 'Evaluate the implementation of the custom callback in setPermissionRequestHandler';
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode){
    if (astNode.type !== 'CallExpression') return null;
    if (astNode.callee.property && astNode.callee.property.name === "setPermissionRequestHandler")
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }

}