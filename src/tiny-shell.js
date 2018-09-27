"use strict";

const Util = require("./util.js");

module.exports = class TinyShell {
  // -----------------------------------

  constructor(maxBufferSize = 200) {
    this._maxBufferSize = maxBufferSize;
    this._buffer = "";
  }

  // -----------------------------------

  get maxBufferSize() {
    return this._maxBufferSize;
  }

  get buffer() {
    return this._buffer;
  }

  // -----------------------------------

  flush() {
    this._buffer = "";
    return this;
  }

  read() {
    return this.buffer;
  }

  write(text) {
    this._buffer = Util.trimBuffer(this.buffer + text, this.maxBufferSize);
    return this;
  }
  // -----------------------------------
};
