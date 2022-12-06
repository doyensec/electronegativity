import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class CSPHTMLCheck {
  constructor() {
    this.id = "CSP_HTML_CHECK";
    this.description = __("CSP_HTML_CHECK");
    this.type = sourceTypes.HTML;
    this.shortenedURL = "https://git.io/JeuMe";
  }

  match(cheerioObj, content) {
    const loc = [];
    const metaTags = cheerioObj('meta');
    const self = this;
    metaTags.each(function (i, elem) {  
      const httpEquiv = cheerioObj(this).attr('http-equiv');
      const cspContent = cheerioObj(this).attr('content');
      if (httpEquiv && httpEquiv.toLowerCase() === "Content-Security-Policy".toLowerCase()) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, shortenedURL: self.shortenedURL, severity: severity.INFORMATIONAL, confidence: confidence.TENTATIVE, properties: { "CSPstring": cspContent }, manualReview: true });
      }
    });
    return loc;
  }
}
