import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class RequireElectronScreen {
  constructor() {
    this.id = 'REQUIRE_ELECTRON_SCREEN_DEPRECATION';
    this.description = '(ELECTRON 6) require(\'electron\').screen in the renderer process is deprecated.';
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvalC';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'MemberExpression') return null;
    if (!astNode.object || astNode.object.type !== 'CallExpression') return null;
    if (!astNode.object.callee || astNode.object.callee.name !== 'require') return null;
    if (!astNode.object.arguments || astNode.object.arguments[0].value !== 'electron') return null;
    if (!astNode.property || astNode.property.name !== 'screen') return null;
    return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
  }
}