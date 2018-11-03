import { sourceTypes } from '../../parser/types';

export default class CertificateVerifyProcCheck {
  constructor() {
    this.id = 'CERTIFICATE_VERIFY_PROC_CHECK';
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
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
