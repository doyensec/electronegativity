import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';
import { parseWebPreferencesFeaturesString } from '../../../util';

export default class WebSecurityHTMLCheck {
  constructor() {
    this.id = "WEB_SECURITY_HTML_CHECK";
    this.description = __("WEB_SECURITY_HTML_CHECK");
    this.type = sourceTypes.HTML;
    this.shortenedURL = "https://git.io/JeuMr";
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const disablewebsecurity = cheerioObj(this).attr('disablewebsecurity');
      if (disablewebsecurity !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, severity: severity.MEDIUM, confidence: confidence.CERTAIN, description: self.description, shortenedURL: self.shortenedURL, manualReview: false });
      }

      let wp = cheerioObj(this).attr('webpreferences');
      if (wp) {
        let features = parseWebPreferencesFeaturesString(wp);
        if (features['webSecurity'] === false)
          loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, shortenedURL: self.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
      }

    });
    return loc;
  }
}
