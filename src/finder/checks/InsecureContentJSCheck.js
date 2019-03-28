import { sourceTypes } from "../../parser/types";

export default class InsecureContentJSCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_JS_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow') return null;

    let location = [];

    if (astNode.arguments.length > 0) {

      var target = {};
      if (scope.resolveVarValue)
        target = scope.resolveVarValue(astNode);
      else
        target = astNode.arguments[0];

      const found_nodes = astHelper.findNodeByType(target,
        astHelper.PropertyName,
        astHelper.PropertyDepth,
        false,
        node => (node.key.value === 'allowRunningInsecureContent' || node.key.name === 'allowRunningInsecureContent'));

      for (const node of found_nodes) {
        if (node.value.value == true) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
        }
      }
    }

    return location;
  }
}