import { sourceTypes } from "../../parser/types";

export default class HTTPResourcesCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_CHECK';
    this.description = `Do not allow insecure HTTP connections`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data, ast) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "loadURL")) return null;

    switch (data.arguments[0].type) {
      case ast.StringLiteral:
        if (!data.arguments[0].value.trim().toUpperCase().startsWith("HTTP://"))
          return undefined;
        break;
      case "TemplateLiteral":
        if (data.arguments[0].type !== "TemplateLiteral" ||
            data.arguments[0].quasis[0].type !== "TemplateElement" ||
            !data.arguments[0].quasis[0].value.cooked.trim().toUpperCase().startsWith("HTTP://"))
          return undefined;
        break;
      default:
        return undefined;
    }

    return [{ line: data.loc.start.line, column: data.loc.start.column, id: this.id, description: this.description, manualReview: false }];
  }
}
