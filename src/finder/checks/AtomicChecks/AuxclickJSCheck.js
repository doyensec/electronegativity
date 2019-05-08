import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class AuxclickJSCheck {
  constructor() {
    this.id = 'AUXCLICK_JS_CHECK';
    this.description = `Limit navigation flows to untrusted origins. Middle-click may cause Electron to open a link within a new window`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper, scope) {
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow' && astNode.callee.name !== 'BrowserView') return null;

    let location = [];

    if (astNode.arguments.length > 0) {
      
      var target = scope.resolveVarValue(astNode);

      const found_nodes = astHelper.findNodeByType(target,
        astHelper.PropertyName,
        astHelper.PropertyDepth,
        false,
        node => (node.key.value === 'disableBlinkFeatures' || node.key.name === 'disableBlinkFeatures'));

      if (found_nodes.length > 0) {
        for (const node of found_nodes) {
          if (node.value.value.indexOf("Auxclick") == -1) {
            location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.FIRM, manualReview: false });
          }
        }
      }
      else {
        location.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.FIRM, manualReview: false });
      }
      
    }

    return location;
  }
}