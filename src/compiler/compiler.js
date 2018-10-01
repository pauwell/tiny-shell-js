"use strict";
/*
    Ref: https://github.com/jamiebuilds/the-super-tiny-compiler

    [Input code]
        V
    [Tokenizer]
        V
    [Parser]
        V
    [Transformer] <----- [Traverser]
        V
    [Generator]
        V
    [Output code]
*/

const Tokenizer = require("./tokenizer.js");
const Parser = require("./parser.js");
const Transformer = require("./transformer.js");
const Generator = require("./generator.js");

let testcode = "(add 2 (subtract 4 2))";
console.log("Input code: " + testcode);

console.log("1] Tokenize:");
let tokens = Tokenizer(testcode);
console.log(tokens);

console.log("2] Parse:");
let ast = Parser(tokens);

console.log("3] Transform:");
let newAst = Transformer(ast);
console.log(newAst);

console.log("4] Generate:");
let code = Generator(newAst);
console.log(code);
