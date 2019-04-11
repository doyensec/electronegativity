import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

export default class NodeIntegrationHTMLCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_HTML_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins`;
    this.type = sourceTypes.HTML;
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const nodeintegration = cheerioObj(this).attr('nodeintegration');
      if (nodeintegration !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, severity: severity.HIGH, confidence: confidence.FIRM, manualReview: false });
      }
    });
    return loc;
  }
}
