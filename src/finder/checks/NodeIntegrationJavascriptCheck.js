import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationJavascriptCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_JS_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins `;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'NewExpression') return null;
    if (data.callee.name !== 'BrowserWindow') return null;

    let set = false;
    let loc = [];
    for (const arg of data.arguments) {
      set = this.findNode(ast, arg, 'nodeIntegration', loc);
      // nodeIntegrationInWorker default value is safe
      // so no check for return value (don't care if it was found)
      this.findNode(ast, arg, 'nodeIntegrationInWorker', loc);
    }

    if (!set) {
      loc.push({ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: false });
    }

    return loc;
  }

  findNode(ast, startNode, name, locations) {
    let found = false;

    const nodes = ast.findNodeByType(startNode, ast.PropertyName, ast.PropertyDepth, false, node => {
      return node.key.value === name || node.key.name === name;
    });

    for (const node of nodes) {
      // in practice if there are two keys with the same name, the value of the last one wins
      // but technically it is an invalid json
      // just to be on the safe side show a warning if any value is insecure
      found = true;
      if (node.value.value === false)
        continue; // anything other than false is ignored

      locations.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, manualReview: false });
    }

    return found;
  }
}
