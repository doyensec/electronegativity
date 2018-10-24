import { sourceTypes } from '../../parser/types';

export default class ContextIsolationCheck {
  constructor() {
    this.id = 'CONTEXT_ISOLATION_CHECK';
    this.description = `Review the use of preload scripts `;
    this.type = sourceTypes.JAVASCRIPT;
    this.manualReview = true;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location;
    for (const arg of data.arguments) {
      const preload = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'preload' || node.key.name === 'preload'));
      const contextIsolation = ast.findNodeByType(arg, ast.PropertyName, ast.PropertyDepth, true, node => (node.key.value === 'contextIsolation' || node.key.name === 'contextIsolation'));
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