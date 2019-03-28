import traverse from "@babel/traverse";
import estraverse from 'estraverse-fb';
import ESLintTraverser from 'eslint/lib/util/traverser';
import * as escope from 'escope';
//import * as eslintScope from 'eslint-scope'; // stub for https://eslint.org/docs/developer-guide/scope-manager-interface

class Ast {
  findNodeByType(ast, type, max_depth, stopAtFirst, found) {
    const cb = found;
    return this.findNode(ast, max_depth, stopAtFirst, (node) => {
      if ((node.type === type) && cb(node)) {
        return true;
      }
    });
  }

  initScopeManager(ast) {
    if (/Program/.test(ast.type))
      return this.initScope(ast);
    else
      return false;
  }

  constructor(settings) {
    this.settings = settings;
  }

  get PropertyName() {
    return this.settings.PropertyName;
  }

  get StringLiteral() {
    return this.settings.StringLiteral;
  }

  get PropertyDepth() {
    return this.settings.PropertyDepth;
  }

}

export class TreeSettings {
  constructor({propertyName = 'Property', stringLiteral = 'Literal', propertyDepth = 4} = {}) {
    this.PropertyName = propertyName;
    this.StringLiteral = stringLiteral;
    this.PropertyDepth = propertyDepth;
  }
}

export class Scope {

  constructor(ast) {
    if (/Program|File/.test(ast.type)) {
      var _scopeManager = {};
      var _globalScope = {};
      var _functionScope = {};
      // eslitScope has the same exact syntax as escope
      try {
        _scopeManager = escope.analyze(ast);
      }
      catch (error) {
        _scopeManager = escope.analyze(ast, { ecmaVersion: 6, ecmaFeatures: { modules: true } });
      }

      _globalScope = _scopeManager.acquire(ast);
      _functionScope = _globalScope;

      this.scopeManager = _scopeManager;
      this.globalScope = _globalScope;
      this.functionScope = _functionScope;
    }
  }

  updateFunctionScope(ast, action) {
    if (Object.keys(this.scopeManager).length > 0 && this.scopeManager.acquire(ast) != null) {
      if (action === 'enter')
        this.functionScope = this.scopeManager.acquire(ast);
      else if (this.functionScope.upper != null) //check that functionScope is not globalScope (for code snippet with no func)
        this.functionScope = this.functionScope.upper;
    }
  }

  getVarInScope(varName) {
    return this.functionScope.variables.find(variable => variable.name === varName);
  }

}

export class EsprimaAst extends Ast {
  constructor(settings) {
    super(settings);
  }

  traverseTree(tree, options) {
    estraverse.traverse(tree, options);
  }

  getNode(node) {
    return node;
  }

  findNode(ast, max_depth, stopAtFirst, found) {
    const nodes = [];
    let depth = 0;
    estraverse.traverse(ast, {
      enter: (node) => {
        depth += 1;
        if (found(node)) {
          nodes.push(node);
          if (stopAtFirst)
            return estraverse.VisitorOption.Break;
        }
        if (max_depth > 0) {
          if (depth > max_depth)
            throw new Error('Traversal error'); // shouldn't be here

          if (depth === max_depth)
            return estraverse.VisitorOption.Skip;
        }
      },
      leave: () => {
        depth -= 1;
      },
    });
    return nodes;
  }
}

export class BabelAst extends Ast {
  constructor(settings) {
    super(settings);
  }

  traverseTree(tree, options) {
    traverse(tree, options);
  }

  getNode(node) {
    return node.node;
  }

  findNode(ast, max_depth, stopAtFirst, found) {
    const nodes = [];
    let depth = 0;
    let shouldStop = false;
    traverse(ast, {
      noScope: true,
      enter: (node) => {
        depth += 1;
        if (found(this.getNode(node))) {
          nodes.push(this.getNode(node));
          if (stopAtFirst) {
            shouldStop = true;
            node.stop();
            return;
          }
        }
        if (max_depth > 0) {
          if (depth > max_depth)
            throw new Error('Traversal error'); // shouldn't be here

          if (depth === max_depth) {
            node.skip();
            depth -= 1; // exit will be not called
          }
        }
      },
      exit: (node) => {
        depth -= 1;
        if (shouldStop)
          node.stop();
      },
    });
    return nodes;
  }
}

export class ESLintAst extends Ast {
  constructor(settings) {
    super(settings);
    this.esLintTraverser = new ESLintTraverser();
  }

  findNodeByTypeParent(ast, type, max_depth, stopAtFirst, found) {
    return super.findNodeByType(ast, type, max_depth, stopAtFirst, found);
  }

  findNodeByType(ast, type, max_depth, stopAtFirst, found) {
    // create new instance, because findNode might stop traversing for current esLintTraverser
    return new ESLintAst(this.settings).findNodeByTypeParent(ast, type, max_depth, stopAtFirst, found);
  }

  traverseTree(tree, options) {
    this.esLintTraverser.traverse(tree, options);
  }

  getNode(node) {
    return node;
  }

  findNode(ast, max_depth, stopAtFirst, found) {
    const nodes = [];
    let depth = 0;
    this.esLintTraverser.traverse(ast, {
      enter: (node) => {
        if (max_depth > 0) {
          if (depth === max_depth) {
            this.esLintTraverser.skip();
            return;
          }
          if (depth > max_depth)
            throw new Error('Traversal error'); // shouldn't be here
        }

        depth += 1;
        if (found(this.getNode(node))) {
          nodes.push(this.getNode(node));
          if (stopAtFirst) {
            this.esLintTraverser.break();
            return;
          }
        }
      },
      leave: () => {
        depth -= 1;
      },
    });
    return nodes;
  }
}