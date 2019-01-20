import { sourceTypes } from '../../parser/types';

export default class BlinkFeaturesJSCheck {
  constructor() {
    this.id = 'BLINK_FEATURES_JS_CHECK';
    this.description = `Do not use Chromium’s experimental features`;
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
        // search for both names for now
        // todo: implement taking electron version into account
        // https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#browserwindow
        node => (node.key.value === 'enableBlinkFeatures' || node.key.name === 'enableBlinkFeatures' ||
                 node.key.value === 'blinkFeatures' || node.key.name === 'blinkFeatures'));

      for (const node of found_nodes) {
        location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: true });
      }
    }

    return location;
  }
}