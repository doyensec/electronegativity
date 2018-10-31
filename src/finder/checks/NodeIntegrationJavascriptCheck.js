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
      const found_nodes = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'nodeIntegration' || node.key.name === 'nodeIntegration'));
      for (const node of found_nodes) {
        // in practice if there are two keys with the same name, the value of the last one wins
        // but technically it is an invalid json
        // just to be on the safe side show a warning if any value is insecure
        set = true;
        if (node.value.value === false)
          continue; // anything other than false is ignored

        loc.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
      }
    }

    if (!set) {
      return parent_loc;
    }

    return loc;
  }
}
