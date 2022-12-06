import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class IPCSend {
  constructor() {
    this.id = "IPC_SEND_STRUCTURED_CLONE_ALGORITHM";
    this.description = __("IPC_SEND_STRUCTURED_CLONE_ALGORITHM");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jvuxd';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || astNode.callee.property.name !== 'send') {
      return null;
    }
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];

  }
}