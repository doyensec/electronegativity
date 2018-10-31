import { sourceTypes } from "../../parser/types";

export default class SandboxCheck {
  constructor() {
    this.id = 'WEB_SECURITY_JS_CHECK';
    this.description = `Do not use disablewebsecurity`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location = [];

    for (const arg of data.arguments) {
      const found_nodes = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'webSecurity' || node.key.name === 'webSecurity'));
      for (const node of found_nodes) {
        if (!node.value.value) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
        }
      }
    }

    return location;
  }
}