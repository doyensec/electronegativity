import { sourceTypes } from "../../parser/types";

export default class InsecureContentJSCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_JS_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location = [];

    if (data.arguments.length > 0) {
      const found_nodes = ast.findNodeByType(data.arguments[0],
        ast.PropertyName,
        ast.PropertyDepth,
        false,
        node => (node.key.value === 'allowRunningInsecureContent' || node.key.name === 'allowRunningInsecureContent'));

      for (const node of found_nodes) {
        if (node.value.value === true) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
        }
      }
    }

    return location;
  }
}