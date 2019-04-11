import { sourceTypes } from '../../parser/types';
import { severity, confidence } from '../attributes';

export default class LimitNavigationJSCheck {
  constructor() {
    this.id = 'LIMIT_NAVIGATION_JS_CHECK';
    this.description = 'Evaluate the implementation of the custom callback in the .on new-window and will-navigate events';
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode){
    if (astNode.type !== 'CallExpression') return null;
    if (astNode.callee.property && astNode.callee.property.name === "on") {
      if (astNode.arguments && astNode.arguments.length > 1) {
        var eventValue = astNode.arguments[0].value;
        if (astNode.arguments[0].type === "Literal" && (eventValue === "will-navigate" || eventValue === "new-window")) {
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
        }
      }
    }
  }

}