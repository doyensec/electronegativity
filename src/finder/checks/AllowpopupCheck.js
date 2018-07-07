import logger from 'winston';

import { HTMLCheck } from '../check';
import { Dom } from '../Dom';

export default class AllowpopupsCheck extends HTMLCheck {
  constructor() {
    const id = 'ALLOWPOPUPS_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

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
