import logger from 'winston';

import { JavaScriptCheck } from '../Check';
import { Ast } from '../ast';

export default class SandboxCheck extends JavaScriptCheck {
  constructor() {
    const id = 'SANDBOX_CHECK';
    const short = 'Use sandbox for untrusted origins';
    const description = ``;
    // const description = `Sandboxed renderers only get access to the default
    //                       Javascript API instead of the fancy Electron JS APIs.
    //                       If set, this option will sandbox the renderer associated
    //                       with the window, making it compatible with the
    //                       Chromium OS-level sandbox.`;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    const parent_loc = { line: data.loc.start.line, column: data.loc.start.column };
    let set = false;
    let main_loc = null;
    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'sandbox' || node.key.name === 'sandbox'));
      if (found_nodes.length > 0) {
        if (found_nodes[0].value.value == true) return null;
        set = true;
        main_loc = { line: found_nodes[0].key.loc.start.line, column: found_nodes[0].key.loc.start.column };
      }
    }

    if (set) {
      return main_loc;
    } else {
      return parent_loc;
    }
  }
}
