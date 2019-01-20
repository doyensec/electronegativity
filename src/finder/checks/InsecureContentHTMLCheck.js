import { sourceTypes } from "../../parser/types";
import { parseWebPreferencesFeaturesString } from '../../util';

export default class InsecureContentHTMLCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.HTML;
  }

  match(data, ast) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let wp = data(this).attr('webpreferences');
      if (wp) {
        let features = parseWebPreferencesFeaturesString(wp);
        if (features['allowRunningInsecureContent'] === true)
          loc.push({ line: ast.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
