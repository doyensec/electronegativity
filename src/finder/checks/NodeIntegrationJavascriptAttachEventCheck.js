import { sourceTypes } from "../../parser/types";
import { Ast } from '../ast';

export default class NodeIntegrationJavascriptAttachEventCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_ATTACH_EVENT_JS_CHECK';
    this.short = 'Disable nodeIntegration for untrusted origins';
    this.description = 'By default, Electron renderers can use Node.js primitives. \
      For instance, a remote untrusted domain rendered in a browser window could \
      invoke Node.js APIs to execute native code on the user’s machine. Similarly, \
      a Cross-Site Scripting (XSS) vulnerability on a website can lead to remote \
      code execution. To display remote content, nodeIntegration should be \
      disabled in the webPreferences of BrowserWindow and webview tag.';
    this.type = sourceTypes.JAVASCRIPT;
  }


  match(data) {
    if (!((data.type === 'CallExpression')
        && (data.callee.property)
        && (data.callee.property.name === 'on')
        && (data.arguments[0])
        && (data.arguments[0].value === 'will-attach-webview'))) {
      return null;
    }

    // logger.debug(`[${this.id}] - looking into node : ${JSON.stringify(data)}`);

    let main_loc = null;
    for (const arg of data.arguments) {
      const found_nodes = Ast.findNodeByType(arg, 'AssignmentExpression', 3, true,
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
