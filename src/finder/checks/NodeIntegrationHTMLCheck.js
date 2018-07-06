import logger from 'winston';

import { HTMLCheck } from '../check';
import { Dom } from '../Dom';

export default class NodeIntegrationHTMLCheck extends HTMLCheck {
  constructor() {
    const id = 'NODE_INTEGRATION_HTML_CHECK';
    const short = 'Disable nodeIntegration for untrusted origins';
    const description = 'By default, Electron renderers can use Node.js primitives. \
      For instance, a remote untrusted domain rendered in a browser window could \
      invoke Node.js APIs to execute native code on the user’s machine. Similarly, \
      a Cross-Site Scripting (XSS) vulnerability on a website can lead to remote \
      code execution. To display remote content, nodeIntegration should be \
      disabled in the webPreferences of BrowserWindow and webview tag.';
    super(id, short, description);
  }

  /*
  <webview src="https://doyensec.com/" nodeintegration></webview>
  */

  match(data) {
    super.match(data);
    
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      const nodeintegration = data(this).attr('nodeintegration');
      if (nodeintegration !== undefined) {
        // TODO to implement
        loc.push(Dom.calculatePosition());
      }
    });
    return loc;
  }
}
