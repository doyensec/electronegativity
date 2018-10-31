import { sourceTypes } from "../../parser/types";

export default class SandboxCheck {
  constructor() {
    this.id = 'SANDBOX_CHECK';
    this.description = `Use sandbox for untrusted origins`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let parent_loc = [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: false }];
    let set = false;
    let main_loc = [];
    for (const arg of data.arguments) {
      const found_nodes = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'sandbox' || node.key.name === 'sandbox'));
      if (found_nodes.length > 0) {
        if (found_nodes[0].value.value) {
          parent_loc = [];
          continue;
        }
        set = true;
        main_loc.push({ line: found_nodes[0].key.loc.start.line, column: found_nodes[0].key.loc.start.column, id: this.id, description: this.description, manualReview: false });
      }
    }

    if (set) {
      return main_loc;
    } else {
      return parent_loc;
    }
  }
}
