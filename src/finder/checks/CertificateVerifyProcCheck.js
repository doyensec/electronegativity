import { sourceTypes } from '../../parser/types';

export default class CertificateVerifyProcCheck {
  constructor() {
    this.id = 'CERTIFICATE_VERIFY_PROC_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setCertificateVerifyProc")) return null;

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
