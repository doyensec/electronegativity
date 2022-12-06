import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class WebFrameIsolatedWorldDeprecation {
  constructor() {
    this.id = "WEB_FRAME_ISOLATED_WORLD_DEPRECATION";
    this.description = __("WEB_FRAME_ISOLATED_WORLD_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvVe2';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || 
        (astNode.callee.property.name !== 'setIsolatedWorldContentSecurityPolicy' &&
        astNode.callee.property.name !== 'setIsolatedWorldHumanReadableName' &&
        astNode.callee.property.name !== 'setIsolatedWorldSecurityOrigin')) {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];
  }
}