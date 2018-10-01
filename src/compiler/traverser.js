"use strict";

/**
 * Traverser function.
 * @param {Object} ast  Abstract syntax tree
 * @param {Object} visitor Visit each node.
 */
function traverser(ast, visitor) {
  // Walk over an array and call `traverseNode()` on each element.
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  // Passes node and parent to the visitor function.
  function traverseNode(node, parent) {
    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      // We'll start with our top level `Program`. Since Program nodes have a
      // property named body that has an array of nodes, we will call
      // `traverseArray` to traverse down into them.
      //
      // (Remember that `traverseArray` will in turn call `traverseNode` so  we
      // are causing the tree to be traversed recursively)
      case "Program":
        traverseArray(node.body, node);
        break;
      // Next we do the same with `CallExpression` and traverse their `params`.
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      // If we don't have any child nodes to visit, just break.
      case "NumberLiteral":
      case "StringLiteral":
        break;
      default:
        throw new TypeError("Unknown node type: " + node.type);
    }

    // If there is an `exit` method for this node type we'll call it with the
    // `node` and its `parent`.
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // Finally we kickstart the traverser by calling `traverseNode` with our ast
  // with no `parent` because the top level of the AST doesn't have a parent.
  traverseNode(ast, null);
}

module.exports = traverser;

/**
 *   traverse(ast, {
 *     Program: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     CallExpression: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     NumberLiteral: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *   });
 */
