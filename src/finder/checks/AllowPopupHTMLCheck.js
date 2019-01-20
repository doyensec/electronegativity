import { sourceTypes } from '../../parser/types';

export default class AllowPopupsHTMLCheck {
  constructor() {
    this.id = 'ALLOWPOPUPS_HTML_CHECK';
    this.description = `Do not allow popups in webview`;
    this.type = sourceTypes.HTML;
  }

  match(data, ast) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const allowpopups = data(this).attr('allowpopups');
      if (allowpopups !== undefined) {
        loc.push({ line: ast.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
