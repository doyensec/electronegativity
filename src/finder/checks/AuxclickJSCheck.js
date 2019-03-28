import { sourceTypes } from '../../parser/types';

export default class AuxclickJSCheck {
  constructor() {
    this.id = 'AUXCLICK_JS_CHECK';
    this.description = `Limit navigation flows to untrusted origins. Middle-click may cause Electron to open a link within a new window`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper, scope) {
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow') return null;

    let location = [];

    if (astNode.arguments.length > 0) {
      
      var target = {};
      if (scope.resolveVarValue)
        target = scope.resolveVarValue(astNode);
      else
        target = astNode.arguments[0];

      const found_nodes = astHelper.findNodeByType(target,
        astHelper.PropertyName,
        astHelper.PropertyDepth,
        false,
        node => (node.key.value === 'disableBlinkFeatures' || node.key.name === 'disableBlinkFeatures'));

      if (found_nodes.length > 0) {
        for (const node of found_nodes) {
          if (node.value.value.indexOf("Auxclick") == -1) {
            location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
          }
        }
      }
      else {
        location.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, manualReview: false });
      }
      
    }

    return location;
  }
}