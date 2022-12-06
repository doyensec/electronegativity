import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class LimitNavigationJSCheck {
  constructor() {
    this.id = "LIMIT_NAVIGATION_JS_CHECK";
    this.description = __("LIMIT_NAVIGATION_JS_CHECK");
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = "https://git.io/JeuM3";
  }

  match(astNode, astHelper){

    if (astNode.type !== 'CallExpression') return null;
    if (astNode.callee.property && astNode.callee.property.name === "on") {
      if (astNode.arguments && astNode.arguments.length > 1) {
        var eventValue = astNode.arguments[0].value;
        if (astNode.arguments[0].type === astHelper.StringLiteral && (eventValue === "will-navigate" || eventValue === "new-window")) {
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, title: this.title, description: this.description, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.TENTATIVE, properties: { "event" : eventValue }, manualReview: true }];
        }
      }
    } else if (astNode.callee.property && astNode.callee.property.name === "setWindowOpenHandler") {
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, title: this.title, description: this.description, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.TENTATIVE, properties: { "event" : "setWindowOpenHandler" }, manualReview: true }];
    }
  }

}
