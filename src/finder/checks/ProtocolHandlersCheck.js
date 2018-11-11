import { sourceTypes } from "../../parser/types";

export default class ProtocolHandlerCheck {
  constructor() {
    this.id = 'PROTOCOL_HANDLER_CHECK';
    this.description = `Review the use of custom protocol handlers`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    const methods = [
      'setAsDefaultProtocolClient',
      'registerStandardSchemes',
      'registerServiceWorkerSchemes',
      'registerFileProtocol',
      'registerHttpProtocol',
      'registerStringProtocol',
      'registerBufferProtocol'];

    if (data.type !== 'CallExpression') return null;
    if (!methods.includes(data.callee.name) && !(data.callee.property && methods.includes(data.callee.property.name))) return null;

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
