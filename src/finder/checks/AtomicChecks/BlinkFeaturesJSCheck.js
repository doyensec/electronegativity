import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class BlinkFeaturesJSCheck {
  constructor() {
    this.id = 'BLINK_FEATURES_JS_CHECK';
    this.description = `Do not use Chromium’s experimental features`;
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/Jeu1M";
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
        // search for both names for now
        // todo: implement taking electron version into account
        // https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#browserwindow
        node => (node.key.value === 'enableBlinkFeatures' || node.key.name === 'enableBlinkFeatures' ||
                 node.key.value === 'blinkFeatures' || node.key.name === 'blinkFeatures'));

      for (const node of found_nodes) {
        location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.LOW, confidence: confidence.CERTAIN, manualReview: true });
      }
    }

    return location;
  }
}