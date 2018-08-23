import { JavaScriptCheck } from '../Check';
import { Ast } from '../ast';

export default class ContextIsolationCheck extends JavaScriptCheck {
  constructor() {
    const id = 'CONTEXT_ISOLATION_CHECK';
    const short = '';
    const description = ``;
    super(id, short, description);
  }

  match(data) {
    super.match(data);
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