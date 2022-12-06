import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class GetWebContents {
  constructor() {
    this.id = "GET_WEB_CONTENTS_DEPRECATION";
    this.description = __("GET_WEB_CONTENTS_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jvux7';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || astNode.callee.property.name !== 'getWebContents') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];

  }
}