import { sourceTypes } from '../../parser/types';

export default class CustomArgumentsJSCheck {
  constructor() {
    this.id = 'CUSTOM_ARGUMENTS_JS_CHECK';
    this.description = `Review the use of custom command line arguments`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode){
    const methods = ['appendArgument', 'appendSwitch'];

    if (astNode.type !== 'CallExpression') return null;
    if (!methods.includes(astNode.callee.name) && !(astNode.callee.property && methods.includes(astNode.callee.property.name))) return null;

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, manualReview: true }];
  }
}
