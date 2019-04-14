import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

export default class CertificateVerifyProcJSCheck {
  constructor() {
    this.id = 'CERTIFICATE_VERIFY_PROC_JS_CHECK';
    this.description = `Do not allow insecure connections, by explicitly opting-out from TLS validation or importing untrusted certificates`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode){
    if (astNode.type !== 'CallExpression')
      return null;

    if (astNode.callee.property && astNode.callee.property.name === "setCertificateVerifyProc") {
      const description = 'Verify that the application does not explicitly opt-out from TLS validation';
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: description, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
    }

    if (astNode.callee.property && astNode.callee.property.name === "importCertificate") {
      const description = 'Verify custom TLS certificates imported into the platform certificate store';
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: description, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
    }
  }
}
