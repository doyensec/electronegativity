import { sourceTypes } from "../../parser/types";
import { Ast } from '../ast';

export default class NodeIntegrationJavascriptCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_JS_CHECK';
    this.short = 'Disable nodeIntegration for untrusted origins';
    this.description = ``;
    // const description = `By default, Electron renderers can use Node.js primitives.
    //   For instance, a remote untrusted domain rendered in a browser window could 
    //   invoke Node.js APIs to execute native code on the user’s machine. Similarly, 
    //   a Cross-Site Scripting (XSS) vulnerability on a website can lead to remote 
    //   code execution. To display remote content, nodeIntegration should be 
    //   disabled in the webPreferences of BrowserWindow and webview tag.`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  /*
  mainWindow = new BrowserWindow({ "webPreferences": {
    "nodeIntegration": true,
    "nodeIntegrationInWorker": 1 }
  });

  mainWindow = new BrowserWindow({ "webPreferences": {
    "nodeIntegration": 1,
    "nodeIntegrationInWorker": 1 }
  });

  mainWindow = new BrowserWindow({ "webPreferences": {
    "nodeIntegrationInWorker": 1 }
  });

  mainWindow = new BrowserWindow();
  */

  match(data) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    const parent_loc = { line: data.loc.start.line, column: data.loc.start.column };
    let set = false;
    let main_loc = null;
    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'nodeIntegration'));
      if (found_nodes.length > 0) {
        set = true;
        if ((found_nodes[0].value.value === true) || (found_nodes[0].value.value === 1)) main_loc = { line: found_nodes[0].key.loc.start.line, column: found_nodes[0].key.loc.start.column };
      }
    }

    if (!set) {
      return parent_loc;
    } if (main_loc) {
      return main_loc;
    }
    return null;
  }
}
