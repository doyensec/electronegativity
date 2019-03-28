import { sourceTypes } from '../../parser/types';

export default class ContextIsolationJSCheck {
  constructor() {
    this.id = 'CONTEXT_ISOLATION_JS_CHECK';
    this.description = `Review the use of the contextIsolation option`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow') return null;

    let location = [];
    if (astNode.arguments.length > 0) {

      var target = {};
      if (scope.resolveVarValue)
        target = scope.resolveVarValue(astNode);
      else
        target = astNode.arguments[0];

        astHelper.findNodeByType(target,
          astHelper.PropertyName,
          astHelper.PropertyDepth,
          true, // any preload is enough
          node => (node.key.value === 'preload' || node.key.name === 'preload'));

        const contextIsolation = astHelper.findNodeByType(target,
          astHelper.PropertyName,
          astHelper.PropertyDepth,
          false,
          node => (node.key.value === 'contextIsolation' || node.key.name === 'contextIsolation'));

        //At the time of writing this check, you always need contextIsolation (trust us!)  
        //if (preload.length > 0) { 
        if (contextIsolation.length > 0) {
          for (const node of contextIsolation) {
            // in practice if there are two keys with the same name, the value of the last one wins
            // but technically it is an invalid json
            // just to be on the safe side show a warning if any value is insecure
            if(node.value.value !== true) {
              location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
            }
          }
        } else {
          location.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, manualReview: false });
        }
      
    }else{
      //No webpreferences
      location.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, manualReview: false });
    }

    return location;
  }
}