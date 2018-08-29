import { sourceTypes } from "../../parser/types";

export default class HTTPResourcesHTMLCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections `;
    this.type = sourceTypes.HTML;
  }

  match({ content, parsed }) {
    const loc = [];
    const webviews = parsed('webview');
    webviews.each(function (i, elem) {
      let src = parsed(this).attr('src');
      if(src && (src.substring(0,7) == "http://")){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

    });
    return loc;
  }
}
