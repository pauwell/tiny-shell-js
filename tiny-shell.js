"use strict";

const TinyShell = require("./src/shell/shell.js");
let shellNode = document.getElementById("shell-wrap");
let tinyShell = new TinyShell(320, 240, 14, shellNode);
