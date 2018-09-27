"use strict";

const TinyShell = require("../src/tiny-shell.js");
const Assert = require("assert");
const Expect = require("chai").expect;
const Should = require("chai").should();

describe("TinyShell", function() {
  describe("Test Buffer", function() {
    it("write('done').read() -> 'done'", function() {
      let tiny = new TinyShell().write("done");
      Expect(tiny.read()).to.equal("done");
    });
    it("write('done').flush().read() -> ''", function() {
      let tiny = new TinyShell().write("done").flush();
      Expect(tiny.read()).to.be.empty;
    });
  });
});
