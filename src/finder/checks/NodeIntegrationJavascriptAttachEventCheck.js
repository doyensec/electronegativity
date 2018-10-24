import { sourceTypes } from "../../parser/types";

export default class NodeIntegrationJavascriptAttachEventCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_ATTACH_EVENT_JS_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins `;
    this.type = sourceTypes.JAVASCRIPT;
  }


  match(data, ast) {
    if (!((data.type === 'CallExpression')
        && (data.callee.property)
        && (data.callee.property.name === 'on')
        && (data.arguments[0])
        && (data.arguments[0].value === 'will-attach-webview'))) {
      return null;
    }
    
    let main_loc = null;
    for (const arg of data.arguments) {
      const found_nodes = ast.findNodeByType(arg, 'AssignmentExpression', 3, true,
        node => ((node.left.type === 'MemberExpression')
                  && (node.left.object.name === 'webPreferences')
                  && (node.left.property.name === 'nodeIntegration')
                  && (node.right.value === true)));
      if (found_nodes.length > 0) {
        main_loc = { line: found_nodes[0].loc.start.line, column: found_nodes[0].loc.start.column };
      }
    }

    return main_loc;
  }
}
