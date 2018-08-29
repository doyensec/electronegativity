import { sourceTypes } from '../../parser/types';

export default class BlinkFeaturesHTMLCheck {
  constructor() {
    this.id = 'BLINK_FEATURES_HTML_CHECK';
    this.description = `Do not use Chromium's experimental features`;
    this.type = sourceTypes.HTML;
  }

  match({ content, parsed }) {
    const loc = [];
    const webviews = parsed('webview');
    webviews.each(function (i, elem) {
      let wp = parsed(this).attr('blinkfeatures');
      if(wp && (wp.indexOf('PreciseMemoryInfo') != -1 || wp.indexOf('CSSVariables') != -1)){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0 });
      }

    });
    return loc;
  }
}
