import logger from 'winston';

import { HTMLCheck } from '../check';
import { Dom } from '../Dom';

export default class HTTPResourcesHTMLCheck extends HTMLCheck {
  constructor() {
    const id = 'HTTP_RESOURCES_HTML_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let src = data(this).attr('src');
      if(src && (src.substring(0,7) == "http://")){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
