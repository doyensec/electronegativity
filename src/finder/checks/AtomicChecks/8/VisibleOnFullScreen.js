import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class VisibleOnFullScreen {
  constructor() {
    this.id = "VISIBLE_ON_FULLSCREEN_DEPRECATION";
    this.description = __("VISIBLE_ON_FULLSCREEN_DEPRECATION");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/Jvuxx';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!astNode.callee.property || astNode.callee.property.name !== 'setVisibleOnAllWorkspaces') {
      return null;
    }

    let location = [];

    if (astNode.arguments.length > 0) {
      if (astNode.arguments.length > 1) {
        if (astNode.arguments[1].type !== 'ObjectExpression') return null;
        const found_nodes = astHelper.findNodeByType(astNode.arguments[1],
          astHelper.PropertyName,
          astHelper.PropertyDepth,
          false,
          node => (node.key.name === 'visibleOnFullScreen'));

        for (const node of found_nodes) {
            location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
        }
      }
    }

    return location;
  }
}