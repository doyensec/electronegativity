import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class PermissionRequestHandlerJSCheck {
  constructor() {
    this.id = "PERMISSION_REQUEST_HANDLER_JS_CHECK";
    this.description = __("PERMISSION_REQUEST_HANDLER_JS_CHECK");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuMR";
  }

  match(astNode){
    if (astNode.type !== 'CallExpression') return null;
    if (astNode.callee.property && astNode.callee.property.name === "setPermissionRequestHandler")
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
  }

}