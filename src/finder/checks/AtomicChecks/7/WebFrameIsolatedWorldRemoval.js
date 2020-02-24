import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class WebFrameIsolatedWorldRemoval {
  constructor() {
    this.id = 'WEB_FRAME_ISOLATED_WORLD_REMOVAL';
    this.description = '(ELECTRON 7) The webFrame isolated world APIs have been removed in favor of webFrame.setIsolatedWorldInfo';
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvaCG';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || 
        (astNode.callee.property.name !== 'setIsolatedWorldContentSecurityPolicy' &&
        astNode.callee.property.name !== 'setIsolatedWorldHumanReadableName' &&
        astNode.callee.property.name !== 'setIsolatedWorldSecurityOrigin')) {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
  }
}