
import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationHTMLCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_HTML_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins`;
    this.type = sourceTypes.HTML;
  }

  match({ content, parsed }) {
    const loc = [];
    const webviews = parsed('webview');
    webviews.each(function (i, elem) {
      const nodeintegration = parsed(this).attr('nodeintegration');
      if (nodeintegration !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }
    });
    return loc;
  }
}
