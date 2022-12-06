import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class SetSpellCheckProviderDeprecation {
  constructor() {
    this.id = "SET_SPELLCHECK_PROVIDER_DEPRECATION";
    this.description = __("SET_SPELLCHECK_PROVIDER_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvVv0';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || 
        astNode.callee.property.name !== 'setSpellCheckProvider') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
  }
}