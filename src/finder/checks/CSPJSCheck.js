import { sourceTypes } from '../../parser/types';

export default class CSPJSCheck {
  constructor() {
    this.id = 'CSP_JS_CHECK';
    this.description = `Check for common responseHeaders CSP assignments`;
    this.type = sourceTypes.JAVASCRIPT;
    this.literalsBeforeCSPString = 2; // needed until a #32 fix
  }

  match(astNode, astHelper){
    let location = [];
    // match e.g. details.responseHeaders["content-security-policy"] = "default-src 'self'";
    if (this.literalsBeforeCSPString === 0 && astNode.type == 'Literal')
      location.push({ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, properties: { "CSPstring": astNode.value}, manualReview: true });
    if (this.literalsBeforeCSPString === 1 && astNode.type == 'Literal')
      this.literalsBeforeCSPString--;
    if (astNode.type == 'MemberExpression') {
      if (!astNode.computed) return null;
      if (!astNode.property || !astNode.property.value || astNode.property.value.toString().toLowerCase() !== 'content-security-policy') return null;
      if (!astNode.object.property || astNode.object.property.name !== 'responseHeaders') return null;
      this.literalsBeforeCSPString--;
    } else if (astNode.type == "CallExpression") {
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
                location.push({ line: node.key.loc.start.line, column: node.key.loc.start.column, id: this.id, description: this.description, properties: { "CSPstring": property.value.elements[0].value }, manualReview: true });
          } // match callback({ responseHeaders: Object.assign({"Content-Security-Policy": [ "default-src 'self'" ]}, details.responseHeaders)}); as a popular stackoverflow answer suggests https://stackoverflow.com/questions/51969512/define-csp-http-header-in-electron-app
          else if (node.value.type === 'CallExpression') {
              if (node.value.arguments.length > 0) {
                for (const argument of node.value.arguments)
                  if (argument.type === 'ObjectExpression')
                    for (const property of argument.properties)
                      if (property.key && property.key.value === 'Content-Security-Policy')
                        location.push({ line: node.value.loc.start.line, column: node.value.loc.start.column, id: this.id, description: this.description, properties: { "CSPstring": property.value.elements[0].value}, manualReview: true });  
              }
          }
        }
      }
    }
    return location;
  }
}