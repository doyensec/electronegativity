import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class InsecureContentJSCheck {
  constructor() {
    this.id = 'INSECURE_CONTENT_JS_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMm";
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
        node => (node.key.value === 'allowRunningInsecureContent' || node.key.name === 'allowRunningInsecureContent'));

      for (const node of found_nodes) {
        if (node.value.value === true) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
        }
      }
    }

    return location;
  }
}