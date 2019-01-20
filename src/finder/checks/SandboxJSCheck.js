import { sourceTypes } from "../../parser/types";

export default class SandboxJSCheck {
  constructor() {
    this.id = 'SANDBOX_JS_CHECK';
    this.description = `Use sandbox for untrusted origins`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let wasFound = false;
    let loc = [];
    if (data.arguments.length > 0) {
      const found_nodes = ast.findNodeByType(data.arguments[0],
        ast.PropertyName,
        ast.PropertyDepth,
        false,
        node => (node.key.value === 'sandbox' || node.key.name === 'sandbox'));

      for (const node of found_nodes) {
        wasFound = true;
        if (node.value.value === true) {
          continue;
        }
        loc.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
      }
    }

    if (wasFound) {
      return loc;
    } else { // default is false
      return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: false }];
    }
  }
}
