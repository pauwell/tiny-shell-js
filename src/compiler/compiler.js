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

module.exports = {
  Tokenizer,
  Parser,
  Transformer,
  Generator
};
