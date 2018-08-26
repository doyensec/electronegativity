import { sourceTypes } from "../../parser/types";
import { Ast } from '../ast';

export default class InsecureContentJavascriptCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_JAVASCRIPT_CHECK';
    this.description = `Do not allow insecure HTTP connections `;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location;

    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'allowRunningInsecureContent' || node.key.name === 'allowRunningInsecureContent'));
      if (found_nodes.length > 0) {
        const node = found_nodes[0]
        if (node.value.value == true) {
          location = { line: node.key.loc.start.line, column: node.key.loc.start.column };
        }
      }
    }

    if (location) {
      return location;
    } else {
      return null;
    }
  }
}