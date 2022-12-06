import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class SetLayoutZoomLevelLimits {
  constructor() {
    this.id = "SET_ZOOM_LEVEL_LIMITS_DEPRECATION";
    this.description = __("SET_ZOOM_LEVEL_LIMITS_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvuxN';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || astNode.callee.property.name !== 'setLayoutZoomLevelLimits') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];

  }
}