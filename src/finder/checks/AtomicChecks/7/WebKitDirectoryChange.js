import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class WebKitDirectoryChange {
  constructor() {
    this.id = "WEBKITDIRECTORY_CHANGE";
    this.description = __("WEBKITDIRECTORY_CHANGE");
    this.type = sourceTypes.HTML;
    this.shortenedURL = "https://git.io/JvVIu";
  }

  match(cheerioObj, content) {
    const loc = [];
    const inputs = cheerioObj('input[webkitdirectory]');
    const self = this;
    inputs.each(function (i, elem) {
      loc.push({ line: content.substr(0, elem.startIndex).split('\n').length, column: 0, id: self.id, description: self.description, shortenedURL: self.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
    });
    return loc;
  }
}
