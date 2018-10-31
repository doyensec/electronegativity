import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationJavascriptCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_JS_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins `;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    const parent_loc = [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: false }];
    let set = false;
    let loc = [];
    for (const arg of data.arguments) {
      const found_nodes = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'nodeIntegration'));
      if (found_nodes.length > 0) {
        set = true;
        if ((found_nodes[0].value.value === true) || (found_nodes[0].value.value === 1))
          loc.push({ line: found_nodes[0].key.loc.start.line, column: found_nodes[0].key.loc.start.column, id: this.id, description: this.description, manualReview: false });
      }
    }

    if (!set) {
      return parent_loc;
    }

    return loc;
  }
}
