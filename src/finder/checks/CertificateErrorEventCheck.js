import { sourceTypes } from '../../parser/types';

export default class CertificateErrorEventCheck {
  constructor() {
    this.id = 'CERTIFICATE_ERROR_EVENT_CHECK';
    this.description = `Do not allow insecure HTTP connections `;
    this.type = sourceTypes.JAVASCRIPT;
    this.manualReview = true;
  }


  match(data) {
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
