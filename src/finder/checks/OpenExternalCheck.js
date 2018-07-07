import logger from 'winston';
import estraverse from 'estraverse';

import { JavaScriptCheck } from '../check';
import { Ast } from '../ast';

export default class OpenExternalCheck extends JavaScriptCheck {
  constructor() {
    const id = 'OPEN_EXTERNAL_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "openExternal")) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
