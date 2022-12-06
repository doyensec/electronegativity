import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';
import { parseWebPreferencesFeaturesString } from '../../../util';

export default class AffinityHTMLCheck {
  constructor() {
    this.id = "AFFINITY_HTML_CHECK";
    this.description = __("AFFINITY_HTML_CHECK");
    this.type = sourceTypes.HTML;
    this.shortenedURL = "https://git.io/Jeu1z";
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
          loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, shortenedURL: self.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, properties: { "AffinityString": features['affinity']}, manualReview: true });
      }

    });
    return loc;
  }
}