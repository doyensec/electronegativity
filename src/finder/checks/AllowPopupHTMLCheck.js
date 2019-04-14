import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

export default class AllowPopupsHTMLCheck {
  constructor() {
    this.id = 'ALLOWPOPUPS_HTML_CHECK';
    this.description = `Do not allow popups in webview`;
    this.type = sourceTypes.HTML;
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const allowpopups = cheerioObj(this).attr('allowpopups');
      if (allowpopups !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, severity: severity.LOW, confidence: confidence.CERTAIN, manualReview: false });
      }

    });
    return loc;
  }
}
