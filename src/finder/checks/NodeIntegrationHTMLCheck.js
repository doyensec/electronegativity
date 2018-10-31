import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationHTMLCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_HTML_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins`;
    this.type = sourceTypes.HTML;
  }

  match(data, content) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const nodeintegration = data(this).attr('nodeintegration');
      if (nodeintegration !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }
    });
    return loc;
  }
}
