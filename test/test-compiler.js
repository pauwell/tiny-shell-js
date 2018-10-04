"use strict";

const TinyCompiler = require("../src/compiler/compiler.js");
const Assert = require("assert");
const Expect = require("chai").expect;
const Should = require("chai").should();

describe("Test TinyCompiler", function() {
  describe("Compilation", function() {
    it("Tokenizer", function() {
      let input = "(add 2(sub 4 3))";
      let tokens = TinyCompiler.Tokenizer(input);
      Expect(tokens).to.not.be.a("null");
      Expect(tokens).to.not.be.empty;
      Expect(tokens)
        .to.be.an("array")
        .and.has.lengthOf(9);
      Expect(tokens[0]).to.have.property("type");
      Expect(tokens[0]).to.have.property("value");
    });
    it("Parser", function() {
      let input = "(add 2(sub 4 3))\n(add 10 20)";
      let tokens = TinyCompiler.Tokenizer(input);
      let ast = TinyCompiler.Parser(tokens);

      Expect(ast)
        .to.be.an("object")
        .that.has.all.keys("type", "body");
      Expect(ast).to.include.all.keys("type");
      Expect(ast["body"]).to.have.lengthOf(2);
      Expect(ast["body"][0]).to.deep.include({
        type: "CallExpression",
        name: "add"
      });
    });
    it("Transformer", function() {
      let input = "(add 2(sub 4 3))";
      let tokens = TinyCompiler.Tokenizer(input);
      let ast = TinyCompiler.Parser(tokens);
      let newAst = TinyCompiler.Transformer(ast);

      Expect(newAst)
        .to.be.an("object")
        .that.has.all.keys("type", "body");
      Expect(newAst).to.include.all.keys("type");
      Expect(newAst["body"]).to.have.lengthOf(1);
      Expect(newAst["body"][0]).to.deep.include({
        type: "ExpressionStatement"
      });
    });
    it("Generator", function() {
      let input = "(add 2(sub 4 3))";
      let tokens = TinyCompiler.Tokenizer(input);
      let ast = TinyCompiler.Parser(tokens);
      let newAst = TinyCompiler.Transformer(ast);
      let code = TinyCompiler.Generator(newAst);
      Expect(code).to.be.a("string");
      Expect(code).to.equal("add(2, sub(4, 3));");
    });
  });
  describe("Evaluate", function() {
    it("Execute", function() {
      let add = (a, b) => a + b;
      let input = "(add 1(add 2 3))";
      let tokens = TinyCompiler.Tokenizer(input);
      let ast = TinyCompiler.Parser(tokens);
      let newAst = TinyCompiler.Transformer(ast);
      let code = TinyCompiler.Generator(newAst);
      let result = eval(code);
      Expect(result).to.not.be.a("null");
      Expect(result).to.equal(6);
    });
  });
});
