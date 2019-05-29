import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class SecurityWarningsDisabledJSCheck {
  constructor() {
    this.id = 'SECURITY_WARNINGS_DISABLED_JS_CHECK';
    this.description = 'Warns about flags disabling security warnings in the sources.';
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode){
    if (astNode.type !== "AssignmentExpression") return null;

    if (astNode.left.object && astNode.left.object.property) {
      if (astNode.left.object.property.name === "env" || astNode.left.object.property.name === "webContents") {
        if (astNode.left.property && astNode.left.property.value && astNode.left.property.value.toString().toUpperCase() === "ELECTRON_DISABLE_SECURITY_WARNINGS" && astNode.right.value)
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.INFORMATIONAL, confidence: confidence.CERTAIN, manualReview: false }];
      }
    }

    if (astNode.left.property && astNode.left.property.name && astNode.left.property.name === "ELECTRON_DISABLE_SECURITY_WARNINGS" && astNode.right.value) {
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.INFORMATIONAL, confidence: confidence.CERTAIN, manualReview: false }];
    } else return null;
  }

}