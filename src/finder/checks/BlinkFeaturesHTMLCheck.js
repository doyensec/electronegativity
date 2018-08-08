import logger from 'winston';

import { HTMLCheck } from '../check';
import { Dom } from '../Dom';

export default class BlinkFeaturesHTMLCheck extends HTMLCheck {
  constructor() {
    const id = 'BLINK_FEATURES_HTML_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let wp = data(this).attr('blinkfeatures');
      if(wp && (wp.indexOf('PreciseMemoryInfo') != -1 || wp.indexOf('CSSVariables') != -1)){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
