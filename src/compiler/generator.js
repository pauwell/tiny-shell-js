"use strict";

/**
 * Generates code. Recursively calls itself,
 * to print each node in the tree into one giant string.
 * @param {Object} node
 */
function generator(node) {
  switch (node.type) {
    // If we have a `Program` node. We will map through each node in the `body`
    // and run them through the code generator and join them with a newline.
    case "Program":
      return node.body.map(generator).join("\n");

    // For `ExpressionStatement` we'll call the code generator on the nested
    // expression and we'll add a semicolon...
    case "ExpressionStatement":
      return (
        generator(node.expression) + ";" // << (...because we like to code the *correct* way)
      );

    // For `CallExpression` we will print the `callee`, add an open
    // parenthesis, we'll map through each node in the `arguments` array and run
    // them through the code generator, joining them with a comma, and then
    // we'll add a closing parenthesis.
    case "CallExpression":
      return (
        codeGenerator(node.callee) +
        "(" +
        node.arguments.map(codeGenerator).join(", ") +
        ")"
      );

    // For `Identifier` we'll just return the `node`'s name.
    case "Identifier":
      return node.name;

    // For `NumberLiteral` we'll just return the `node`'s value.
    case "NumberLiteral":
      return node.value;

    // For `StringLiteral` we'll add quotations around the `node`'s value.
    case "StringLiteral":
      return '"' + node.value + '"';

    default:
      throw new TypeError("Unknown node type: " + node.type);
  }
}

module.exports = generator;
