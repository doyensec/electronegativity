import logger from 'winston';

import { HTMLCheck } from '../check';
import { Dom } from '../Dom';

export default class ExperimentalFeaturesHTMLCheck extends HTMLCheck {
  constructor() {
    const id = 'EXPERIMENTAL_FEATURES_HTML_CHECK';
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
      if(wp && (wp.indexOf('experimentalFeatures=true') != -1 || wp.indexOf('experimentalCanvasFeatures=true') != -1)){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
