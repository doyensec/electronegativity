import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class WebSecurityJSCheck {
  constructor() {
    this.id = "WEB_SECURITY_JS_CHECK";
    this.description = __("WEB_SECURITY_JS_CHECK");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMo";
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
        node => (node.key.value === 'webSecurity' || node.key.name === 'webSecurity'));

      for (const node of found_nodes) {
        if (node.value.value === false) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
        }
      }
    }

    return location;
  }
}