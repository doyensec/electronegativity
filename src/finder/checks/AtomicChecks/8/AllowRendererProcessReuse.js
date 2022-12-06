import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class AllowRendererProcessReuse {
  constructor() {
    this.id = "ALLOW_RENDERER_PROCESS_REUSE_DEPRECATION";
    this.description = __("ALLOW_RENDERER_PROCESS_REUSE_DEPRECATION")
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvuxX';
  }

  match(astNode, astHelper, scope){
    if (!astNode.property || astNode.property.name !== 'allowRendererProcessReuse') return null;
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];

  }
}

