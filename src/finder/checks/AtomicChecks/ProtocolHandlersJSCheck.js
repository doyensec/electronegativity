import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class ProtocolHandlerJSCheck {
  constructor() {
    this.id = "PROTOCOL_HANDLER_JS_CHECK";
    this.description = __("PROTOCOL_HANDLER_JS_CHECK");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMz";
  }

  match(astNode){
    const methods = [
      'setAsDefaultProtocolClient',
      'registerStandardSchemes',
      'registerServiceWorkerSchemes',
      'registerFileProtocol',
      'registerHttpProtocol',
      'registerStringProtocol',
      'registerBufferProtocol',
      'registerStreamProtocol'];

    if (astNode.type !== 'CallExpression') return null;
    if (!methods.includes(astNode.callee.name) && !(astNode.callee.property && methods.includes(astNode.callee.property.name))) return null;

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
  }
}
