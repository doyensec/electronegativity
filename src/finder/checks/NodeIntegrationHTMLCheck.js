
import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationHTMLCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_HTML_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins`;
    this.type = sourceTypes.HTML;
  }

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
