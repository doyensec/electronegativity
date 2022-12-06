import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class HTTPResourcesHTMLCheck {
  constructor() {
    this.id = "HTTP_RESOURCES_HTML_CHECK";
    this.description = __("HTTP_RESOURCES_HTML_CHECK");
    this.type = sourceTypes.HTML;
    this.shortenedURL = "https://git.io/JeuMt";
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let src = cheerioObj(this).attr('src');
      if(src && (src.trim().toUpperCase().startsWith("HTTP://"))){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, shortenedURL: self.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
      }

    });
    return loc;
  }
}
