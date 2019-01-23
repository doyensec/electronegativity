import { sourceTypes } from "../../parser/types";

export default class PreloadJSCheck {
  constructor() {
    this.id = 'PRELOAD_JS_CHECK';
    this.description = `Review the use of preload scripts`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper){
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow') return null;

    let location = [];

    if (astNode.arguments.length > 0) {
      const found_nodes = astHelper.findNodeByType(astNode.arguments[0],
        astHelper.PropertyName,
        astHelper.PropertyDepth,
        false,
        node => (node.key.value === 'preload' || node.key.name === 'preload'));

      for (const node of found_nodes)
        location.push ({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: true });
    }

    return location;
  }
}