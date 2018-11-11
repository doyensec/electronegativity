import { sourceTypes } from '../../parser/types';

export default class AllowpopupsCheck {
  constructor() {
    this.id = 'ALLOWPOPUPS_CHECK';
    this.description = `Do not allow popups in webview`;
    this.type = sourceTypes.HTML;
  }

  match(data, content) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const allowpopups = data(this).attr('allowpopups');
      if (allowpopups !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
