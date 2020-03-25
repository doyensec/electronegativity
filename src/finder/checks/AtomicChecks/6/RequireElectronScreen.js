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
    if (astNode.type !== 'VariableDeclarator') return null;    
    if (!astNode.init || (astNode.init.type !== 'MemberExpression' && astNode.init.type !== 'CallExpression')) return null;
    if (astNode.init.type === 'MemberExpression') {      
      if (!astNode.init.object.callee || astNode.init.object.callee.name !== 'require') return null;
      if (!astNode.init.object.arguments || astNode.init.object.arguments[0].value !== 'electron') return null;
      if (!astNode.init.property || astNode.init.property.name !== 'screen') return null;
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
    } else {
      if (!astNode.init.callee || astNode.init.callee.name !== 'require') return null;
      if (!astNode.init.arguments || astNode.init.arguments[0].value !== 'electron') return null;
      if (!astNode.id || astNode.id.type !== 'ObjectPattern') return null;
      for (const property of astNode.id.properties) {
        if (property.key && property.key.name && property.key.name === 'screen') {
          return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.TENTATIVE, manualReview: true }];
        }
      }
    }
  }
}