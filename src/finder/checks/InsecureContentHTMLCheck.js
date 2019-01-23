import { sourceTypes } from "../../parser/types";
import { parseWebPreferencesFeaturesString } from '../../util';

export default class InsecureContentHTMLCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.HTML;
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let wp = cheerioObj(this).attr('webpreferences');
      if (wp) {
        let features = parseWebPreferencesFeaturesString(wp);
        if (features['allowRunningInsecureContent'] === true)
          loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
