import { sourceTypes } from "../../parser/types";

export default class PreloadCheck {
  constructor() {
    this.id = 'PRELOAD_CHECK';
    this.description = `Review the use of preload scripts`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location = [];

    for (const arg of data.arguments) {
      const found_nodes = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'preload' || node.key.name === 'preload'));
      if (found_nodes.length > 0) {
        for (const node of found_nodes)
          location.push ({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: true });
      }
    }

    return location;
  }
}