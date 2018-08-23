import { sourceTypes } from "../../parser/types";
import { Ast } from '../ast';

export default class PreloadCheck {
  constructor() {
    this.id = 'PRELOAD_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location;

    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'preload' || node.key.name === 'preload'));
      if (found_nodes.length > 0) {
        let node = found_nodes[0];
        location = { line: node.key.loc.start.line, column: node.key.loc.start.column }; 
      }
    }

    return location; 
  }
}