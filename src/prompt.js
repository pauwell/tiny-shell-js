"use strict";

const Util = require("./util.js");

module.exports = class Prompt {
  // -----------------------------------

  constructor(maxBufferSize = 200) {
    this._maxBufferSize = maxBufferSize;
    this._buffer = "";
    this._cursor = "▃";
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

  pop() {
    if (this._buffer.length > 0) {
      this._buffer = this._buffer.slice(0, -1);
    }
    return this;
  }

  read() {
    return this.buffer;
  }

  write(text) {
    // @Todohere: if(typeof text !== string|char)
    this._buffer = Util.trimBuffer(this.buffer + text, this.maxBufferSize);
    return this;
  }
  // -----------------------------------
};
