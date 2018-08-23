import { sourceTypes } from '../../parser/types';

export default class CustomArgumentsCheck {
  constructor() {
    this.id = 'CUSTOM_ARGUMENTS_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    const methods = ['appendArgument', 
                     'appendSwitch'];

    if (data.type !== 'CallExpression') return null;
    if (!methods.includes(data.callee.name) && !(data.callee.property && methods.includes(data.callee.property.name))) return null;

    const location = { line: data.loc.start.line, column: data.loc.start.column };
    
    return location;
  }
}
