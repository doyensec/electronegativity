import traverse from "@babel/traverse";
import estraverse from 'estraverse-fb';
import ESLintTraverser from 'eslint/lib/util/traverser';

class Ast {
  findNodeByType(ast, type, max_depth, stopAtFirst, found) {
    const cb = found;
    return this.findNode(ast, max_depth, stopAtFirst, (node) => {
      if ((node.type === type) && cb(node)) {
        return true;
      }
    });
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
      enter: (node, parent) => {
        depth += 1;
        if (found(node)) {
          nodes.push(node);
          if (stopAtFirst)
            return estraverse.VisitorOption.Break;
        }
        if ((max_depth > 0) && (depth === max_depth))
          return estraverse.VisitorOption.Skip;
      },
      leave: (node, parent) => {
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
        if ((max_depth > 0) && (depth === max_depth)) {
          node.skip();
          depth -= 1; // exit will be not called
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
    let shouldStop = false;
    this.esLintTraverser.traverse(ast, {
      enter: (node) => {
        depth += 1;
        if (found(this.getNode(node))) {
          nodes.push(this.getNode(node));
          if (stopAtFirst) {
            shouldStop = true;
            this.esLintTraverser.break();
            return;
          }
        }
        if ((max_depth > 0) && (depth === max_depth)) {
          this.esLintTraverser.break();
          depth -= 1; // leave will be not called
        }
      },
      leave: (node) => {
        depth -= 1;
        if (shouldStop)
          this.esLintTraverser.stop();
      },
    });
    return nodes;
  }
}