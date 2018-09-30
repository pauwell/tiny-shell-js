"use strict";

const TinyShell = require("../src/shell.js");
const Assert = require("assert");
const Expect = require("chai").expect;
const Should = require("chai").should();

describe("TinyShell", function() {
  describe("Test Prompt", function() {
    it("prompt.write('done').read()", function() {
      let out = new TinyShell().prompt.write("done").read();
      Expect(out).to.equal("done");
    });

    it("prompt.write('done').flush().read()", function() {
      let out = new TinyShell().prompt
        .write("done")
        .flush()
        .read();
      Expect(out).to.be.empty;
    });

    it("prompt.write('done').pop().pop().read()", function() {
      let out = new TinyShell().prompt
        .write("done")
        .pop()
        .pop()
        .read();
      Expect(out).to.equal("do");
    });
  });
});
