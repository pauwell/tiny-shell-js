"use strict";

module.exports = class History {
  // -----------------------------------
  constructor(maxHeight) {
    this._maxHeight = maxHeight;
    this._entries = [];
  }

  read(){
    return this._entries;
  }

  write(entry){
    this._entries.push(entry);
    return this;
  }
  // -----------------------------------
};