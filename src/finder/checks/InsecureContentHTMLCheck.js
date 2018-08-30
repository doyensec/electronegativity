import { sourceTypes } from "../../parser/types";

export default class InsecureContentHTMLCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_HTML_CHECK';
    this.description = `Do not allow insecure HTTP connections `;
    this.type = sourceTypes.HTML;
  }

  match(data, content) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let wp = data(this).attr('webpreferences');
      if(wp && (wp.indexOf('allowRunningInsecureContent=true') != -1 || wp.indexOf('allowRunningInsecureContent=1') != -1)){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

    });
    return loc;
  }
}
