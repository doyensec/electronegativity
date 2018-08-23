import { sourceTypes } from "../../parser/types";

export default class HTTPResourcesCheck {
  constructor() {
    this.id = 'HTTP_RESOURCES_CHECK';
    this.short = '';
    this.description = ``;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(data) {
    if (data.type !== 'CallExpression') return null;
    if (!(data.callee.property && data.callee.property.name === "loadURL")) return null;
    let location;
    
    if(data.arguments[0].type == "Literal" && data.arguments[0].value.startsWith("http://")){
        location = { line: data.loc.start.line, column: data.loc.start.column };
    }
    
    return location;
  }
}
