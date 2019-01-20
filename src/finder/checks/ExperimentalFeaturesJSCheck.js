import { sourceTypes } from '../../parser/types';

export default class ExperimentalFeaturesJSCheck {
  constructor() {
    this.id = 'EXPERIMENTAL_FEATURES_JS_CHECK';
    this.description = `Do not use Chromium's experimental features`;
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
        node => (node.key.value === 'experimentalFeatures' ||
                 node.key.name  === 'experimentalFeatures' ||
                 node.key.value === 'experimentalCanvasFeatures' ||
                 node.key.name  === 'experimentalCanvasFeatures'));

      for (const node of found_nodes) {
        if (node.value.value === true) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
        }
      }
    }

    return location;
  }
}