"use strict";

const fs = require("fs");
const path = require("path");

function relative(loc) {
  return path.join(__dirname, "..", loc);
}

fs.writeFileSync(
  relative("browser.js"),
  fs.readFileSync(relative("dist/polyfill.min.js"))
);
