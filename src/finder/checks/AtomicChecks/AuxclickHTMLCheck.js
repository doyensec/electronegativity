import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class AuxclickHTMLCheck {
  constructor() {
    this.id = 'AUXCLICK_HTML_CHECK';
    this.description = `Limit navigation flows to untrusted origins. Middle-click may cause Electron to open a link within a new window`;
    this.type = sourceTypes.HTML;
    this.shortenedURL = "https://git.io/Jeu1P";
  }

  match(cheerioObj, content) {
    const loc = [];
    const webviews = cheerioObj('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let dbf = cheerioObj(this).attr('disableblinkfeatures');
      if(dbf && (dbf === "Auxclick")){
        //Nothing to report
      }else{
        loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, shortenedURL: self.shortenedURL, severity: severity.MEDIUM, confidence: confidence.FIRM, manualReview: false });
      }
    });
    return loc;
  }
}