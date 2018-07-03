import logger from 'winston';
import estraverse from 'estraverse';

export class Ast {
  static findNode(ast, max_depth, stopAtFirst, found) {
    const nodes = [];
    let depth = 0;
    estraverse.traverse(ast, {
      enter: (node, parent) => {
        depth += 1;
        if (found(node)) {
          nodes.push(node);
          if (stopAtFirst) estraverse.VisitorOption.Break;
        }
        if ((max_depth > 0) && (depth === max_depth)) estraverse.VisitorOption.Skip;
      },
      leave: (node, parent) => {
        depth -= 1;
      },
    });
    return nodes;
  }

  static findNodeByType(ast, type, max_depth, stopAtFirst, found) {
    const cb = found;
    return Ast.findNode(ast, max_depth, stopAtFirst, (node) => {
      if ((node.type === type) && cb(node)) {
        return true;
      }
    });
  }
}
