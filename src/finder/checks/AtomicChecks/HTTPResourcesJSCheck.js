import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class HTTPResourcesJavascriptCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_JS_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuML";
  }

  match(astNode, astHelper){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.property && astNode.callee.property.name === "loadURL")) return null;

    switch (astNode.arguments[0].type) {
      case astHelper.StringLiteral:
        if (!astNode.arguments[0].value.trim().toUpperCase().startsWith("HTTP://"))
          return undefined;
        break;
      case "TemplateLiteral":
        if (astNode.arguments[0].type !== "TemplateLiteral" ||
            astNode.arguments[0].quasis[0].type !== "TemplateElement" ||
            !astNode.arguments[0].quasis[0].value.cooked.trim().toUpperCase().startsWith("HTTP://"))
          return undefined;
        break;
      default:
        return undefined;
    }

    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];
  }
}
