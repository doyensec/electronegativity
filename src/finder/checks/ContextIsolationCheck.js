import { sourceTypes } from '../../parser/types';

export default class ContextIsolationCheck {
  constructor() {
    this.id = 'CONTEXT_ISOLATION_CHECK';
    this.description = `Review the use of preload scripts`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let location = [];
    if (data.arguments.length > 0) {
      if (data.arguments[0].type !== "ObjectExpression") {
        location.push({ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: true });
      }
      else {
        const preload = ast.findNodeByType(data.arguments[0],
          ast.PropertyName,
          ast.PropertyDepth,
          true, // any preload is enough
          node => (node.key.value === 'preload' || node.key.name === 'preload'));
  
        const contextIsolation = ast.findNodeByType(data.arguments[0],
          ast.PropertyName,
          ast.PropertyDepth,
          false,
          node => (node.key.value === 'contextIsolation' || node.key.name === 'contextIsolation'));
  
        if (preload.length > 0) {
          if (contextIsolation.length > 0) {
            for (const node of contextIsolation) {
              // in practice if there are two keys with the same name, the value of the last one wins
              // but technically it is an invalid json
              // just to be on the safe side show a warning if any value is insecure
              if(node.value.value !== true) {
                location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: true });
              }
            }
          }else {
            const node = preload[0];
            location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: true });
          }
        }
      }
    }

    return location;
  }
}