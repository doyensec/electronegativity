import { sourceTypes } from '../../parser/types';

export default class AuxclickHTMLCheck {
  constructor() {
    this.id = 'AUXCLICK_HTML_CHECK';
    this.description = `Limit navigation flows to untrusted origins. Middle-click may cause Electron to open a link within a new window`;
    this.type = sourceTypes.HTML;
  }

  match(data, ast) {
    const loc = [];
    const webviews = data('webview');
    const self = this;
    webviews.each(function (i, elem) {
      let dbf = data(this).attr('disableblinkfeatures');
      if(dbf && (dbf === "Auxclick")){
        //Nothing to report
      }else{
        loc.push({ line: ast.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, manualReview: false });
      }
    });
    return loc;
  }
}