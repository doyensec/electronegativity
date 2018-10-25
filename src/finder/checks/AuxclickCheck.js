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

    let location;

    for (const arg of data.arguments) {
      const found_nodes = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'disableBlinkFeatures' || node.key.name === 'disableBlinkFeatures'));
      if (found_nodes.length > 0) {
        const node = found_nodes[0]
        if (node.value.value.indexOf("Auxclick") == -1) {
          location = { line: node.key.loc.start.line, column: node.key.loc.start.column };
        }
      }else{
          location = { line: data.loc.start.line, column: data.loc.start.column };
      }
    }

    if (location) {
      return location;
    } else {
      return null;
    }
  }
}