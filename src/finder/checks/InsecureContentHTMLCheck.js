import logger from 'winston';

import { HTMLCheck } from '../check';
import { Dom } from '../Dom';

export default class InsecureContentHTMLCheck extends HTMLCheck {
  constructor() {
    const id = 'INSECURE_CONTENT_HTML_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let wp = data(this).attr('webpreferences');
      if(wp && (wp.indexOf('allowRunningInsecureContent=true') != -1 || wp.indexOf('allowRunningInsecureContent=1') != -1)){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
