import { sourceTypes } from "../../parser/types";

export default class HTTPResourcesHTMLCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.HTML;
  }

  match(data, ast) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let src = data(this).attr('src');
      if(src && (src.trim().toUpperCase().startsWith("HTTP://"))){
        loc.push({ line: ast.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }

    });
    return loc;
  }
}
