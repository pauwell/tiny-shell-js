"use strict";

module.exports = class Window {
  // -----------------------------------

  constructor(width, height, fontSize, canvas) {
    this._width = width;
    this._height = height;
    this._fontSize = fontSize;
    this._canvas = canvas;
    if(canvas){
      this._canvas.width = width;
      this._canvas.height = height;
    }
  }

  draw(historyText, promptText) {
    if(!(this._canvas)){
      return;
    }

    // Get the canvas context.
    let context = this._canvas.getContext("2d");

    // Clear the canvas.
    context.fillStyle = "#000";
    context.fillRect(0, 0, this._width, this._height);

    // Clear the path.
    context.beginPath();

    // Use the default compmode.
    context.globalCompositeOperation = "source-over";

    // Reset alpha.
    context.globalAlpha = 1;

    // Font.
    context.fillStyle = "#FFF";
    context.font = this._fontSize + "px Consolas";

    // Draw history.
    historyText.forEach((entry, idx, arr) => {
      context.fillText(entry, 10, idx * this._fontSize + this._fontSize);
    });

    // Draw prompt.
    context.fillText(promptText, 10, this._height - this._fontSize);

    // Close and fill.
    context.closePath();
    context.fill();

    return this;
  }
};
