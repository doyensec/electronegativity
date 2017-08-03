import logger from 'winston';

import JavaScriptCheck from '../check';

export class NodeIntegrationJavascriptCheck extends JavascriptCheck {
  constructor (id, short, description) {
    const id = "NODE_INTEGRATION_JS_CHECK";
    const short = "Disable nodeIntegration for untrusted origins";
    const description = "By default, Electron renderers can use Node.js primitives. \
      For instance, a remote untrusted domain rendered in a browser window could \
      invoke Node.js APIs to execute native code on the user’s machine. Similarly, \
      a Cross-Site Scripting (XSS) vulnerability on a website can lead to remote \
      code execution. To display remote content, nodeIntegration should be \
      disabled in the webPreferences of BrowserWindow and webview tag.";
    super (id, short, description);
  }

  match (data) {
    // TODO AST node match

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

  }
}
