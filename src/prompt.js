"use strict";

const Util = require("./util.js");

module.exports = class Prompt {
  // -----------------------------------
  constructor(width) {
    this._width = width;
    this._buffer = "";
    this._cursor = "▃";
  }

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
    return "$ " + this._buffer + this._cursor;
  }

  rawBuffer() {
    return this._buffer;
  }

  write(text) {
    if (typeof text !== "string") {
      Util.error("write(text) - 'text' must be of type string.");
    }
    this._buffer = Util.trimBuffer(this._buffer + text, this.maxBufferSize);
    return this;
  }
  // -----------------------------------
};
