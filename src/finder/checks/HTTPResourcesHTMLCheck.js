import { sourceTypes } from "../../parser/types";

export default class HTTPResourcesHTMLCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections `;
    this.type = sourceTypes.HTML;
  }

  match(data) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let src = data(this).attr('src');
      if(src && (src.substring(0,7) == "http://")){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
