import logger from 'winston';
import estraverse from 'estraverse';

import { JavaScriptCheck } from '../check';
import { Ast } from '../ast';

export default class HTTPResourcesCheck extends JavaScriptCheck {
  constructor() {
    const id = 'HTTP_RESOURCES_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);

    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "loadURL")) return null;
    let location;
    
    if(data.arguments[0].type == "Literal" && data.arguments[0].value.startsWith("http://")){
        location = { line: data.loc.start.line, column: data.loc.start.column };
    }
    
    return location;
  }
}
