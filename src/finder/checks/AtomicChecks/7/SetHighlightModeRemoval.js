import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class SetHighlightModeRemoval {
  constructor() {
    this.id = "SET_HIGHLIGHT_MODE_REMOVAL";
    this.description = __("SET_HIGHLIGHT_MODE_REMOVAL");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jva8j';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property
        || astNode.callee.property.name !== 'setHighlightMode') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];
  }
}