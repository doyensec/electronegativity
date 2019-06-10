import { sourceTypes } from '../../../parser/types';
import { severity, confidence } from '../../attributes';

export default class DangerousFunctionsJSCheck {
  constructor() {
    this.id = 'DANGEROUS_FUNCTIONS_JS_CHECK';
    this.description = `Do not use insertCSS, executeJavaScript, eval, Function, setTimeout, setInterval, setImmediate with user-supplied content`;
    this.type = sourceTypes.JAVASCRIPT;
  }

  match(astNode, astHelper, scope){

    let shouldReport = false;

    const electronMethods = [
      'executeJavascript',
      'insertCSS'];

    const evalLikemethods = [
      'eval',
      'Function',
      'setTimeout',
      'setInterval',
      'setImmediate',
      ];

    if (astNode.type !== 'CallExpression') return null;

    // it's an electron-specific method
    if (electronMethods.includes(astNode.callee.name) || (astNode.callee.property && electronMethods.includes(astNode.callee.property.name))) {
      if (astNode.arguments.length === 0 || astNode.arguments[0].type === astHelper.StringLiteral) return null; //if it's a constant or is called empty
      
      shouldReport = true; // always interesting
    }

    // it's a dangerous js function
    if (evalLikemethods.includes(astNode.callee.name) || (astNode.callee.property && evalLikemethods.includes(astNode.callee.property.name))) {
      if (astNode.arguments.length === 0 || astNode.arguments[0].type === astHelper.StringLiteral) return null; //if it's a constant or is called empty
      if (astNode.arguments[0].type === "BinaryExpression") shouldReport = true; // if it's a string concatenation

      if (astNode.arguments[0].type === "Identifier") { // is it a variable?
         // if it is a variable we check its type
          var target = scope.resolveVarValue(astNode);

          if (target === null) // we could not resolve the variable, let the user check
            shouldReport = true;
          else if (target && (target.type === "BinaryExpression" || target.type.includes(astHelper.StringLiteral))) // check if we are facing a string concatenation, a plain string or template literal (e.g. ${var})
            shouldReport = true;
          else // it's probably of little interest
            shouldReport = false;
      }
    }

    if (shouldReport)
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: true }];
  }
}
