import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

const DEPRECATED_REQUIRES = [ 'child_process', 'fs', 'os', 'path' ]

export default class RequireSandboxedRenderers {
  constructor() {
    this.id = 'REQUIRE_SANDBOXED_RENDERERS_DEPRECATION';
    this.description = '(ELECTRON 6) Certain requires in sandboxed renderers are deprecated.';
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvalR';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'ExpressionStatement') return null;
    if (!astNode.expression || astNode.expression.type !== 'CallExpression') return null;
    if (!astNode.expression.callee || astNode.expression.callee.name !== 'require') return null;
    if (!astNode.expression.arguments || astNode.expression.arguments[0].type !== astHelper.StringLiteral) return null;
    if (DEPRECATED_REQUIRES.indexOf(astNode.expression.arguments[0].value) === -1) return null;
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
  }
}