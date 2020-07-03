import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class NodeIntegrationJSCheck {
  constructor() {
    this.id = 'NODE_INTEGRATION_JS_CHECK';
    this.description = `Disable nodeIntegration for untrusted origins`;
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMn";
  }

  //nodeIntegration Boolean (optional) - Whether node integration is enabled. Default is true.
  //nodeIntegrationInWorker Boolean (optional) - Whether node integration is enabled in web workers. Default is false
  //nodeIntegrationInSubFrames Boolean (optional) - Whether node integration is enabled in in sub-frames such as iframes. Default is false

  match(astNode, astHelper, scope, defaults){
    if (astNode.type !== 'NewExpression') return null;
    if (astNode.callee.name !== 'BrowserWindow' && astNode.callee.name !== 'BrowserView') return null;

    let nodeIntegrationFound = false;
    let locations = [];
    if (astNode.arguments.length > 0) {

      var target = scope.resolveVarValue(astNode);

      let loc = [];

      nodeIntegrationFound = this.findNode(astHelper, target, 'nodeIntegration', value => value === false, loc);
      // nodeIntegrationInWorker default value is safe, as well as nodeIntegrationInSubFrames
      // so no check for return value (don't care if it was found)
      this.findNode(astHelper, target, 'nodeIntegrationInWorker', value => value !== true, loc);
      this.findNode(astHelper, target, 'nodeIntegrationInSubFrames', value => value !== true, loc);

      let sandboxLoc = [];
      let sandboxFound = this.findNode(astHelper, target, 'sandbox', value => value !== true, sandboxLoc);
      if (!sandboxFound || sandboxLoc.length <= 0) // sandbox disables node integration
        locations = locations.concat(loc);
    }

    if (!nodeIntegrationFound && defaults.nodeIntegration) {
      locations.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description,  shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.FIRM, manualReview: false });
    }

    return locations;
  }

  findNode(astHelper, startNode, name, skipCondition, locations) {
    let found = false;
    var nodeIntegrationStrings = ["nodeIntegration","nodeIntegrationInWorker","nodeIntegrationInSubFrames"];
    const nodes = astHelper.findNodeByType(startNode, astHelper.PropertyName, astHelper.PropertyDepth, false, node => {
      return node.key.value === name || node.key.name === name;
    });

    for (const node of nodes) {
      // in practice if there are two keys with the same name, the value of the last one wins
      // but technically it is an invalid json
      // just to be on the safe side show a warning if any value is insecure
      found = true;
      let isIdentifier = (node.value.type === "Identifier")? true : false;
      if (skipCondition(node.value.value)){
        if ((node.key.value === "sandbox" || node.key.name === "sandbox") && isIdentifier) continue;
        if ((nodeIntegrationStrings.includes(node.key.value) || nodeIntegrationStrings.includes(node.key.name)) && !isIdentifier) continue;
      }

      locations.push({
        line: node.key.loc.start.line,
        column: node.key.loc.start.column,
        id: this.id,
        description: this.description,
        severity: severity.INFORMATIONAL,
        confidence: confidence.FIRM,
        manualReview: isIdentifier
      });
    }

    return found;
  }
}
