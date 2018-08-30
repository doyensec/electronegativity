import { sourceTypes } from "../../parser/types";

export default class ExperimentalFeaturesHTMLCheck {
  constructor() {
    this.id = 'EXPERIMENTAL_FEATURES_HTML_CHECK';
    this.description = `Do not use Chromium's experimental features`;
    this.type = sourceTypes.HTML;
  }

  match(data, content) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let wp = data(this).attr('webpreferences');
      if(wp && (wp.indexOf('experimentalFeatures=true') != -1 || wp.indexOf('experimentalCanvasFeatures=true') != -1)){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

    });
    return loc;
  }
}
