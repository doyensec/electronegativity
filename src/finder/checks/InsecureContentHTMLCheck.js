import { sourceTypes } from "../../parser/types";

export default class InsecureContentHTMLCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_HTML_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.HTML;
  }

  match(data) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let wp = data(this).attr('webpreferences');
      if(wp && (wp.indexOf('allowRunningInsecureContent=true') != -1 || wp.indexOf('allowRunningInsecureContent=1') != -1)){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
