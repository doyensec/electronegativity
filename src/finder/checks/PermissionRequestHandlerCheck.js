import { JavaScriptCheck } from '../check';

export default class PermissionRequestHandler extends JavaScriptCheck {
  constructor() {
    const id = 'PERMISSION_REQUEST_HANDLER';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "setPermissionRequestHandler")) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
