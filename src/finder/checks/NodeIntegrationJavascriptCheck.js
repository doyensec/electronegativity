import logger from 'winston';
import estraverse from 'estraverse';

import { JavaScriptCheck } from '../check';

export class NodeIntegrationJavascriptCheck extends JavaScriptCheck {
  constructor () {
    const ident = "NODE_INTEGRATION_JS_CHECK";
    const short = "Disable nodeIntegration for untrusted origins";
    const description = "By default, Electron renderers can use Node.js primitives. \
      For instance, a remote untrusted domain rendered in a browser window could \
      invoke Node.js APIs to execute native code on the user’s machine. Similarly, \
      a Cross-Site Scripting (XSS) vulnerability on a website can lead to remote \
      code execution. To display remote content, nodeIntegration should be \
      disabled in the webPreferences of BrowserWindow and webview tag.";
    super (ident, short, description);
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
  */

  match (data) {
    super.match(data);

    if (data.type !== "NewExpression") return false;
    if (data.callee.name !== "BrowserWindow") return false;

    const parent_loc = {line : data.loc.start.line, column : data.loc.start.column };

    let set = false;
    let main_loc = null;
    // TODO: move this to a find_node function taking a callback containing the if conditions
    for (let arg of data.arguments) {
      estraverse.traverse(arg, {
        enter : (node, parent) => {
          if ((node.type === "Property") && (node.key.value === "nodeIntegration")) {
            set = true;
            if ((node.value.value === true) || (node.value.value === 1)) {
              main_loc = { line : node.key.loc.start.line, column : node.key.loc.start.column };
            }
            return estraverse.VisitorOption.Skip;
          }
        }
      });
    }

    if (!set) {
      return parent_loc;
    } else if (main_loc) {
      return main_loc;
    } else {
      return null;
    }
  }
}
