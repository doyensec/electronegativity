import { sourceTypes } from '../../parser/types';

export default class AllowpopupsCheck {
  constructor() {
    this.id = 'ALLOWPOPUPS_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.HTML;
  }

  match(data) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      const allowpopups = data(this).attr('allowpopups');
      if (allowpopups !== undefined) {
        // TODO to implement
        loc.push({ line: 0, column: 0 });
      }

    });
    return loc;
  }
}
