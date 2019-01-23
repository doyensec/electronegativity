import { sourceTypes } from "../../parser/types";

export default class HTTPResourcesHTMLCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.HTML;
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let src = cheerioObj(this).attr('src');
      if(src && (src.trim().toUpperCase().startsWith("HTTP://"))){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
