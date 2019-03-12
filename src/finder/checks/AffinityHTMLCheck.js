import { sourceTypes } from "../../parser/types";
import { parseWebPreferencesFeaturesString } from '../../util';

export default class AffinityHTMLCheck {
  constructor() {
    this.id = 'AFFINITY_HTML_CHECK';
    this.description = `Review the use of affinity property`;
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
        if (features['affinity'] !== undefined)
          loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, properties: { "AffinityString": features['affinity']}, manualReview: true });
      }

    });
    return loc;
  }
}