"use strict";

const TinyCompiler = require("./src/compiler/compiler.js");

let compilerInputTextarea = document.getElementById("compiler-input");
let compilerCompileButton = document.getElementById("compiler-compile");
let compilerOutputTextarea = document.getElementById("compiler-output");

compilerCompileButton.addEventListener(
  "click",
  function() {
    let input = compilerInputTextarea.value;
    let tokens = TinyCompiler.Tokenizer(input);
    let ast = TinyCompiler.Parser(tokens);
    let newAst = TinyCompiler.Transformer(ast);
    let code = TinyCompiler.Generator(newAst);
    compilerOutputTextarea.value = code;
  }.bind(this)
);
