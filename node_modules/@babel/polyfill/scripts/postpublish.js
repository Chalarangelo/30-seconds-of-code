"use strict";

const fs = require("fs");
const path = require("path");

try {
  fs.unlinkSync(path.join(__dirname, "../browser.js"));
} catch (err) {}
