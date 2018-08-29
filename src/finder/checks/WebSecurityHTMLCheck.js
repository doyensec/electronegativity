import linenumber from 'linenumber';

import { sourceTypes } from "../../parser/types";

export default class WebSecurityHTMLCheck {
  constructor() {
    this.id = 'WEB_SECURITY_HTML_CHECK';
    this.description = `Do not use disablewebsecurity`;
    this.type = sourceTypes.HTML;
  }

  match({ content, parsed }) {
    const loc = [];
    const webviews = parsed('webview');
    webviews.each(function (i, elem) {
      const disablewebsecurity = parsed(this).attr('disablewebsecurity');
      if (disablewebsecurity !== undefined) {
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

      let wp = parsed(this).attr('webpreferences');
      if(wp && (wp.indexOf('webSecurity=false') != -1 || wp.indexOf('webSecurity=0') != -1)){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

    });
    return loc;
  }
}
