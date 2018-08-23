import { sourceTypes } from '../../parser/types';

export default class BlinkFeaturesHTMLCheck {
  constructor() {
    this.id = 'BLINK_FEATURES_HTML_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.HTML;
  }

  match(data) {
    const loc = [];
    const webviews = data('webview');
    webviews.each(function (i, elem) {
      let wp = data(this).attr('blinkfeatures');
      if(wp && (wp.indexOf('PreciseMemoryInfo') != -1 || wp.indexOf('CSSVariables') != -1)){
        loc.push({ line: 1, column: 1 });
      }

    });
    return loc;
  }
}
