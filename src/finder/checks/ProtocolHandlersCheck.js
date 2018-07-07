import logger from 'winston';
import estraverse from 'estraverse';

import { JavaScriptCheck } from '../check';
import { Ast } from '../ast';

export default class ProtocolHandlerCheck extends JavaScriptCheck {
  constructor() {
    const id = 'PROTOCOL_HANDLER_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

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
