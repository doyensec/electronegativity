import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

export default class CertificateErrorEventJSCheck {
  constructor() {
    this.id = 'CERTIFICATE_ERROR_EVENT_JS_CHECK';
    this.description = `Do not allow insecure connections, by explicitly opting-out from TLS validation`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode){
    if (!((astNode.type === 'CallExpression')
        && (astNode.callee.property)
        && (astNode.callee.property.name === 'on')
        && (astNode.arguments[0])
        && (astNode.arguments[0].value === 'certificate-error'))) {
      return null;
    }

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
  }
}
