import { sourceTypes } from "../../parser/types";

export default class AffinityJSCheck {
  constructor() {
    this.id = 'AFFINITY_JS_CHECK';
    this.description = `Review the use of affinity property`;
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