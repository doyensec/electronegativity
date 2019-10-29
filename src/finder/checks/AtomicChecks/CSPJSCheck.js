import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class CSPJSCheck {
  constructor() {
    this.id = 'CSP_JS_CHECK';
    this.description = `Check for common responseHeaders CSP assignments`;
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMe";
  }

  match(astNode, astHelper){
    let location = [];
    // match e.g. details.responseHeaders["content-security-policy"] = "default-src 'self'"; Note that this does not check if the assignment is inside in the responseHeaders object because of #32
    if (astNode.type === "AssignmentExpression" && astNode.left.property && astNode.left.property.value && astNode.left.property.value.toString().toLowerCase() === "content-security-policy")
      location.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description,severity: severity.INFORMATIONAL, confidence: confidence.TENTATIVE, properties: { "CSPstring": astNode.right.value }, manualReview: true });
    else if (astNode.type == "CallExpression") {
      if (astNode.arguments.length > 0) {
        if (astNode.arguments[0].type !== "ObjectExpression") return null;
        const found_nodes = astHelper.findNodeByType(astNode.arguments[0],
          astHelper.PropertyName,
          astHelper.PropertyDepth,
          false,
          node => (node.key.name === 'responseHeaders'));

        for (const node of found_nodes) {
          // match e.g. callback({ responseHeaders: { ...details.responseHeaders, "Content-Security-Policy": ["default-src 'none'"] }})
          if (node.value.properties) {
            for (const property of node.value.properties)
              if (property.key && property.key.value && property.key.value.toLowerCase() === "content-security-policy")
                location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.INFORMATIONAL, confidence: confidence.TENTATIVE, properties: { "CSPstring": property.value.elements[0].value }, manualReview: true });
          } // match callback({ responseHeaders: Object.assign({"Content-Security-Policy": [ "default-src 'self'" ]}, details.responseHeaders)}); as a popular stackoverflow answer suggests https://stackoverflow.com/questions/51969512/define-csp-http-header-in-electron-app
          else if (node.value.type === 'CallExpression') {
            if (node.value.arguments.length > 0) {
              for (const argument of node.value.arguments)
                if (argument.type === 'ObjectExpression')
                  for (const property of argument.properties)
                    if (property.key && property.key.value === 'Content-Security-Policy')
                      location.push({ line: node.value.loc.start.line, column: node.value.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.INFORMATIONAL, confidence: confidence.TENTATIVE, properties: { "CSPstring": property.value.elements[0].value}, manualReview: true });  
            }
          }
        }
      }
    }
    return location;
  }
}