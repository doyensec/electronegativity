
import { sourceTypes } from '../../parser/types';

export default class CertificateVerifyProcCheck {
  constructor() {
    this.id = 'CERTIFICATE_VERIFY_PROC_CHECK';
    this.description = `Do not allow insecure HTTP connections `;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setCertificateVerifyProc")) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
