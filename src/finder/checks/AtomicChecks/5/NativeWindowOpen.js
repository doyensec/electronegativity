import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class NativeWindowOpen {
  constructor() {
    this.id = 'NATIVE_WINDOW_OPEN_CHANGE';
    this.description = `(ELECTRON 5) Child windows opened with the nativeWindowOpen option will always have Node.js integration disabled.`;
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JvVeZ";
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow' && astNode.callee.name !== 'BrowserView') return null;

    let location = [];

    if (astNode.arguments.length > 0) {
      
      var target = scope.resolveVarValue(astNode);

      const found_nodes = astHelper.findNodeByType(target,
        astHelper.PropertyName,
        astHelper.PropertyDepth,
        false,
        node => (node.key.value === 'nativeWindowOpen' || node.key.name === 'nativeWindowOpen'));

      for (const node of found_nodes) {
        if (node.value.value) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: true });
        }
      }
    }

    return location;
  }
}