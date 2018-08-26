import { sourceTypes } from '../../parser/types';
import { Ast } from '../ast';

export default class ExperimentalFeaturesJavascriptCheck {
  constructor() {
    this.id = 'EXPERIMENTAL_FEATURES_JAVASCRIPT_CHECK';
    this.description = `Do not use Chromium's experimental features`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location;

    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'experimentalFeatures' || node.key.name === 'experimentalFeatures' || node.key.value === 'experimentalCanvasFeatures' || node.key.name === 'experimentalCanvasFeatures'));
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