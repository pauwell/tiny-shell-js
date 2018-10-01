"use strict";

/**
 * Transforms an input string of code into tokens. E.g:
 * (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 * @param {String} input input string of code to tokenize
 */
function tokenizer(input) {
  var current = 0; // Tracking our position in the code like a cursor.
  var tokens = []; // Array for pushing our tokens to.

  while (current < input.length) {
    let char = input[current]; // Getting the current character from input.

    // Test for open and closing paranthesis '(', ')'.
    if (char === "(" || char === ")") {
      tokens.push({
        type: "paren",
        value: char
      });
      ++current;
      continue;
    }

    // Test for whitespace.
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      ++current;
      continue;
    }

    // Test for numbers. Can be more than one digit.
    //   (add 123 456)
    //        ^^^ ^^^ numbers
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "number", value: value });
      continue;
    }

    // Test for strings. Strings are marked by double quotes.
    //   (concat "foo" "bar")
    //            ^^^   ^^^ string tokens
    if (char === '"') {
      let value = "";
      char = input[++current];

      while (char != '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: "string", value: value });
      continue;
    }

    // Test for name tokens. e.g variable names, function names.
    //   (add 2 4)
    //    ^^^ name token
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "name", value });
      continue;
    }

    // If the character was not matched until here, we got an error.
    throw new TypeError("Unknown char token found: " + char);
  }

  return tokens;
}

module.exports = tokenizer;
