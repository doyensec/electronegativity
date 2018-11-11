import { sourceTypes } from '../../parser/types';

export default class BlinkFeaturesHTMLCheck {
  constructor() {
    this.id = 'BLINK_FEATURES_HTML_CHECK';
    this.description = `Do not use Chromium's experimental features`;
    this.type = sourceTypes.HTML;
  }

  match(data, content) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let wp = data(this).attr('enableblinkfeatures');
      if(wp){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: true });
      }

      // search for both names for now
      // todo: implement taking electron version into account
      // https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#browserwindow
      wp = data(this).attr('blinkfeatures');
      if(wp){
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: true });
      }
    });
    return loc;
  }
}
