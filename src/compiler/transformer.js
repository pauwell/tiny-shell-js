"use strict";

const Traverser = require("./traverser.js");

/**
 * Create a new AST by passing AST + visitor to our traverser.
 * @param {Object} ast Abstract syntax tree.
 */
function transformer(ast) {
  let newAst = {
    type: "Program",
    body: []
  };

  // Next I'm going to cheat a little and create a bit of a hack. We're going to
  // use a property named `context` on our parent nodes that we're going to push
  // nodes to their parent's `context`. Normally you would have a better
  // abstraction than this, but for our purposes this keeps things simple.
  //
  // Just take note that the context is a reference *from* the old ast *to* the
  // new ast.
  ast._context = newAst.body;

  // Call the traverser function with the ast and a visitor.
  Traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "NumberLiteral",
          value: node.value
        });
      }
    },
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "String Literal",
          value: node.value
        });
      }
    },
    CallExpression: {
      enter(node, parent) {
        // We start creating a new node `CallExpression` with a nested
        // `Identifier`.
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name
          },
          arguments: []
        };

        // Next we're going to define a new context on the original
        // `CallExpression` node that will reference the `expression`'s arguments
        // so that we can push arguments.
        node._context = expression.arguments;

        //console.log(parent);

        // Then we're going to check if the parent node is a `CallExpression`.
        // If it is not...
        if (parent.type !== "CallExpression") {
          // We're going to wrap our `CallExpression` node with an
          // `ExpressionStatement`. We do this because the top level
          // `CallExpression` in JavaScript are actually statements.
          expression = {
            type: "ExpressionStatement",
            expression: expression
          };
        }

        // Last, we push our (possibly wrapped) `CallExpression` to the `parent`'s
        // `context`.
        parent._context.push(expression);
      }
    }
  });

  return newAst;
}

module.exports = transformer;
