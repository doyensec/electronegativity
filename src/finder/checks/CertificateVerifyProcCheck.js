
import { JavaScriptCheck } from '../check';

export default class CertificateVerifyProcCheck extends JavaScriptCheck {
  constructor() {
    const id = 'CERTIFICATE_VERIFY_PROC_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setCertificateVerifyProc")) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
