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

    if (data.arguments.length > 0) {
      const found_nodes = ast.findNodeByType(data.arguments[0],
        ast.PropertyName,
        ast.PropertyDepth,
        false,
        node => (node.key.value === 'preload' || node.key.name === 'preload'));

      for (const node of found_nodes)
        location.push ({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: true });
    }

    return location;
  }
}