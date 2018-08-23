
import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationHTMLCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_HTML_CHECK';
    this.short = 'Disable nodeIntegration for untrusted origins';
    this.description = 'By default, Electron renderers can use Node.js primitives. \
      For instance, a remote untrusted domain rendered in a browser window could \
      invoke Node.js APIs to execute native code on the user’s machine. Similarly, \
      a Cross-Site Scripting (XSS) vulnerability on a website can lead to remote \
      code execution. To display remote content, nodeIntegration should be \
      disabled in the webPreferences of BrowserWindow and webview tag.';
    this.type = sourceTypes.HTML;
  }

  /*
  <webview src="https://doyensec.com/" nodeintegration></webview>
  */

  match(data) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      const nodeintegration = data(this).attr('nodeintegration');
      if (nodeintegration !== undefined) {
        // TODO to implement
        loc.push({ line: 1, column: 1 });
      }
    });
    return loc;
  }
}
