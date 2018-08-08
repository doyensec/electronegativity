import logger from 'winston';
import estraverse from 'estraverse';

import { JavaScriptCheck } from '../check';
import { Ast } from '../ast';

export default class CertificateErrorEventCheck extends JavaScriptCheck {
  constructor() {
    const id = 'CERTIFICATE_ERROR_EVENT_CHECK';
    const short = ``;
    const description = ``;
    super(id, short, description);
  }


  match(data) {
    super.match(data);

    if (!((data.type === 'CallExpression')
        && (data.callee.property)
        && (data.callee.property.name === 'on')
        && (data.arguments[0])
        && (data.arguments[0].value === 'certificate-error'))) {
      return null;
    }

    const location = { line: data.loc.start.line, column: data.loc.start.column };

    return location;
  }
}
