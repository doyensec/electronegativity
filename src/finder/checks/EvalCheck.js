import { sourceTypes } from '../../parser/types';

export default class EvalCheck {
  constructor() {
    this.id = 'EVAL_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    const methods = ['executeJavascript', 
                     'eval', 
                     'insertCSS'];

    if (data.type !== 'CallExpression') return null;
    if (!methods.includes(data.callee.name) && !(data.callee.property && methods.includes(data.callee.property.name))) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
