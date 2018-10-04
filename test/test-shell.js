"use strict";

const TinyShell = require("../src/shell/shell.js");
const Assert = require("assert");
const Expect = require("chai").expect;
const Should = require("chai").should();

describe("Test TinyShell", function() {
  describe("Prompt", function() {
    it("Read", function() {
      let out = new TinyShell(320, 240, 14, null).prompt
        .write("done")
        .rawBuffer();
      Expect(out).to.equal("done");
    });

    it("Flush", function() {
      let out = new TinyShell().prompt
        .write("done")
        .flush()
        .rawBuffer();
      Expect(out).to.be.empty;
    });

    it("Pop", function() {
      let out = new TinyShell().prompt
        .write("done")
        .pop()
        .pop()
        .rawBuffer();
      Expect(out).to.equal("do");
    });
  });
});
