import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class ExperimentalFeaturesJSCheck {
  constructor() {
    this.id = "EXPERIMENTAL_FEATURES_JS_CHECK";
    this.description = __("EXPERIMENTAL_FEATURES_JS_CHECK");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMI";
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
        node => (node.key.value === 'experimentalFeatures' ||
                 node.key.name  === 'experimentalFeatures' ||
                 node.key.value === 'experimentalCanvasFeatures' ||
                 node.key.name  === 'experimentalCanvasFeatures'));

      for (const node of found_nodes) {
        if (node.value.value === true) {
          location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.LOW, confidence: confidence.CERTAIN, manualReview: false });
        }
      }
    }

    return location;
  }
}