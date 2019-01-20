import { sourceTypes } from '../../parser/types';

export default class CertificateErrorEventJSCheck {
  constructor() {
    this.id = 'CERTIFICATE_ERROR_EVENT_JS_CHECK';
    this.description = `Do not allow insecure connections, by explicitly opting-out from TLS validation`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (!((data.type === 'CallExpression')
        && (data.callee.property)
        && (data.callee.property.name === 'on')
        && (data.arguments[0])
        && (data.arguments[0].value === 'certificate-error'))) {
      return null;
    }

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
