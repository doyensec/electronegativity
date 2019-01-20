import { sourceTypes } from '../../parser/types';

export default class CertificateVerifyProcJSCheck {
  constructor() {
    this.id = 'CERTIFICATE_VERIFY_PROC_JS_CHECK';
    this.description = `Do not allow insecure connections, by explicitly opting-out from TLS validation or importing untrusted certificates`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'CallExpression')
      return null;

    if (data.callee.property && data.callee.property.name === "setCertificateVerifyProc") {
      const description = 'Verify that the application does not explicitly opt-out from TLS validation';
      return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: description, manualReview: true }];
    }

    if (data.callee.property && data.callee.property.name === "importCertificate") {
      const description = 'Verify custom TLS certificates imported into the platform certificate store';
      return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: description, manualReview: true }];
    }
  }
}
