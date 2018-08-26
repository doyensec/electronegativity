import { sourceTypes } from "../../parser/types";

export default class WebSecurityHTMLCheck {
  constructor() {
    this.id = 'WEB_SECURITY_HTML_CHECK';
    this.description = `Do not use disablewebsecurity`;
    this.type = sourceTypes.HTML;
  }

  match(data) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      const disablewebsecurity = data(this).attr('disablewebsecurity');
      if (disablewebsecurity !== undefined) {
        // TODO to implement
        loc.push({ line: 0, column: 0 });
      }

      let wp = data(this).attr('webpreferences');
      if(wp && (wp.indexOf('webSecurity=false') != -1 || wp.indexOf('webSecurity=0') != -1)){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
