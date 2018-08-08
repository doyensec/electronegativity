import logger from 'winston';

import { JavaScriptCheck } from '../Check';
import { Ast } from '../ast';

export default class BlinkFeaturesCheck extends JavaScriptCheck {
  constructor() {
    const id = 'BLINK_FEATURES_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location;

    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'blinkFeatures' || node.key.name === 'blinkFeatures'));
      if (found_nodes.length > 0) {
        const node = found_nodes[0]
        if (node.value.value.indexOf("PreciseMemoryInfo") != -1 || node.value.value.indexOf("CSSVariables") != -1) {
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