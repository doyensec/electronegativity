import { sourceTypes } from "../../parser/types";

export default class ProtocolHandlerCheck {
  constructor() {
    this.id = 'PROTOCOL_HANDLER_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    const methods = ['setAsDefaultProtocolClient', 
                     'registerStandardSchemes', 
                     'registerServiceWorkerSchemes', 
                     'registerFileProtocol', 
                     'registerHttpProtocol', 
                     'registerStringProtocol', 
                     'registerBufferProtocol'];

    if (data.type !== 'CallExpression') return null;
    if (!methods.includes(data.callee.name) && !(data.callee.property && methods.includes(data.callee.property.name))) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
