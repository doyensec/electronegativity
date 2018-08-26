import { sourceTypes } from "../../parser/types";
import { Ast } from '../ast';

export default class NodeIntegrationJavascriptCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_JS_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins `;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    const parent_loc = { line: data.loc.start.line, column: data.loc.start.column };
    let set = false;
    let main_loc = null;
    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'nodeIntegration'));
      if (found_nodes.length > 0) {
        set = true;
        if ((found_nodes[0].value.value === true) || (found_nodes[0].value.value === 1)) main_loc = { line: found_nodes[0].key.loc.start.line, column: found_nodes[0].key.loc.start.column };
      }
    }

    if (!set) {
      return parent_loc;
    } if (main_loc) {
      return main_loc;
    }
    return null;
  }
}
