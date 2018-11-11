import { sourceTypes } from '../../parser/types';

export default class AuxclickCheck {
  constructor() {
    this.id = 'AUXCLICK_CHECK';
    this.description = `Limit navigation flows to untrusted origins`;
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
        node => (node.key.value === 'disableBlinkFeatures' || node.key.name === 'disableBlinkFeatures'));

      if (found_nodes.length > 0) {
        for (const node of found_nodes) {
          if (node.value.value.indexOf("Auxclick") == -1) {
            location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
          }
        }
      }
      else {
        location.push({ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: false });
      }
    }

    return location;
  }
}