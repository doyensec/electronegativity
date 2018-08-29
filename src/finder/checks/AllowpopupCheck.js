import { sourceTypes } from '../../parser/types';

export default class AllowpopupsCheck {
  constructor() {
    this.id = 'ALLOWPOPUPS_CHECK';
    this.description = `Do not allow popups in webview`;
    this.type = sourceTypes.HTML;
  }

  match({ content, parsed }) {
    const loc = [];
    const webviews = parsed('webview');
    webviews.each(function (i, elem) {
      const allowpopups = parsed(this).attr('allowpopups');
      if (allowpopups !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

    });
    return loc;
  }
}
