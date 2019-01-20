import { sourceTypes } from "../../parser/types";
import { parseWebPreferencesFeaturesString } from '../../util';

export default class WebSecurityHTMLCheck {
  constructor() {
    this.id = 'WEB_SECURITY_HTML_CHECK';
    this.description = `Do not use disablewebsecurity`;
    this.type = sourceTypes.HTML;
  }

  match(data, ast) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      const disablewebsecurity = data(this).attr('disablewebsecurity');
      if (disablewebsecurity !== undefined) {
        loc.push({ line: ast.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

      let wp = data(this).attr('webpreferences');
      if (wp) {
        let features = parseWebPreferencesFeaturesString(wp);
        if (features['webSecurity'] === false)
          loc.push({ line: ast.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
