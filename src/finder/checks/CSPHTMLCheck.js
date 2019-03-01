import { sourceTypes } from '../../parser/types';

export default class CSPHTMLCheck {
  constructor() {
    this.id = 'CSP_HTML_CHECK';
    this.description = `A CSP is set for this page using a meta tag`;
    this.type = sourceTypes.HTML;
  }

  match(cheerioObj, content) {
    const loc = [];
    const metaTags = cheerioObj('meta');
    const self = this;
    metaTags.each(function (i, elem) {  
      const httpEquiv = cheerioObj(this).attr('http-equiv');
      const cspContent = cheerioObj(this).attr('content');
      if (httpEquiv && httpEquiv.toLowerCase() === "Content-Security-Policy".toLowerCase()) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, properties: { "CSPstring": cspContent} });
      }

    });
    return loc;
  }
}
