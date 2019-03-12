import { sourceTypes } from "../../parser/types";

export default class AffinityJSCheck {
  constructor() {
    this.id = 'AFFINITY_JS_CHECK';
    this.description = `Review the use of affinity property`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow' && data.callee.name !== 'BrowserView') return null;

    let location = [];

    if (data.arguments.length > 0) {
      const found_nodes = ast.findNodeByType(data.arguments[0],
        ast.PropertyName,
        ast.PropertyDepth,
        false,
        node => (node.key.value  === 'affinity' || node.key.name === 'affinity'));

      for (const node of found_nodes) {
        if (node.value.value) {
          location.push({ line: node.value.loc.start.line, column: node.value.loc.start.column, id: this.id, description: this.description, properties: { "AffinityString": node.value.value }, manualReview: true });
        }
      }
    }

    return location;
  }
}