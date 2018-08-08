import logger from 'winston';

import { JavaScriptCheck } from '../Check';
import { Ast } from '../ast';

export default class AuxclickCheck extends JavaScriptCheck {
  constructor() {
    const id = 'AUXCLICK_CHECK';
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
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'disableBlinkFeatures' || node.key.name === 'disableBlinkFeatures'));
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