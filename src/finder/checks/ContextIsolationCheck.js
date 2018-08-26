import { sourceTypes } from '../../parser/types';
import { Ast } from '../ast';

export default class ContextIsolationCheck {
  constructor() {
    this.id = 'CONTEXT_ISOLATION_CHECK';
    this.description = `Review the use of preload scripts `;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location;
    for (const arg of data.arguments) {
      const preload = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'preload' || node.key.name === 'preload'));
      const contextIsolation = Ast.findNodeByType(arg, 'Property', 2, true, node => (node.key.value === 'contextIsolation' || node.key.name === 'contextIsolation'));
      if (preload.length > 0 && contextIsolation.length > 0) {
        let node = contextIsolation[0];
        if(node.value.value != true){
            location = { line: node.key.loc.start.line, column: node.key.loc.start.column }; 
        }
      }else if(preload.length > 0 && contextIsolation.length == 0){
        let node = preload[0];
        location = { line: node.key.loc.start.line, column: node.key.loc.start.column }; 
      }
    }

    return location;
  }
}