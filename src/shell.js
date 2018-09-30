"use strict";

const Window = require("./window.js");
const History = require("./history.js");
const Prompt = require("./prompt.js");

module.exports = class Shell {
  // -----------------------------------
  constructor(width, height, fontSize, canvas) {

    // Initialize components.
    this._window = new Window(width, height, fontSize, canvas);
    this._history = new History(height);
    this._prompt = new Prompt(width);

    // Initial render.
    this.window.draw(this.history.read(), this.prompt.read());

    // Handle keyboard-input.
    window.addEventListener('keydown', function(e) {
      var k = e.key;
      if(k == 'Backspace'){
        this.prompt.pop();
      }else if(k == 'Enter'){
        this.history.write(this.prompt.rawBuffer());
        this.prompt.flush();
      }else{ 
        this.prompt.write(k);
      }
      this.window.draw(this.history.read(), this.prompt.read());
      console.log(this.prompt.read());
    }.bind(this), false);
  }

  get history(){
    return this._history;
  }

  get prompt() {
    return this._prompt;
  }
  get window() {
    return this._window;
  }
  // -----------------------------------
};

