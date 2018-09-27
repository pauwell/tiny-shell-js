"use strict";

const Prompt = require("./prompt.js");

module.exports = class TinyShell {
  // -----------------------------------

  constructor(maxBufferSize = 200) {
    this._prompt = new Prompt(maxBufferSize);
  }

  get prompt() {
    return this._prompt;
  }
};
