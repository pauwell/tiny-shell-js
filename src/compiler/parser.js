"use strict";

/**
 * Turning an array of tokens into an AST (abstract syntax tree). E.g:
 * [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 * @param {Array} tokens List of tokens to parse.
 */
function parser(tokens) {
  let current = 0; // Tracking our position in the code like a cursor.

  // Creating recursive walk function.
  function walk() {
    let tok = tokens[current]; // Grab the current token.
    console.log(tok);

    if (tok.type === "number") {
      ++current;

      // Return a new AST node called `NumberLiteral`.
      return {
        type: "NumberLiteral",
        value: tok.value
      };
    }
    if (tok.type === "string") {
      ++current;

      // Return a new AST node called `StringLiteral`.
      return { type: "StringLiteral", value: tok.value };
    }

    // Looking for CallExpressions. They start with an open parenthesis.
    if (tok.type === "paren" && tok.value === "(") {
      tok = tokens[++current]; // Skip parenthesis.

      let node = { type: "CallExpression", name: tok.value, params: [] };

      tok = tokens[++current]; // Skip `name` token.

      // Loop through each token until we encounter a closing parenthesis.
      while (
        tok.type !== "paren" ||
        (tok.type === "paren" && tok.value !== ")")
      ) {
        // This is where the magic happens.
        // Recursively call walk() again which returns itself a node,
        // which will be pushed to the params of our current node.
        node.params.push(walk());
        tok = tokens[current];
      }

      ++current; // Skip parenthesis.
      return node;
    }

    throw new TypeError("Unknown token type: " + tok.type);
  }

  // Create the AST with a root called `Program`.
  let ast = {
    type: "Program",
    body: []
  };

  // Fill the body with our `walk` function with a loop, because our program
  // can have `CallExpression` after one another instead of being nested.
  //   (add 2 2)
  //   (subtract 4 2)
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

module.exports = parser;
