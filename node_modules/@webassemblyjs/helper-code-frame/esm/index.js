function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { print } from "@webassemblyjs/wast-printer";
var SHOW_LINES_AROUND_POINTER = 5;

function repeat(char, nb) {
  return Array(nb).fill(char).join("");
} // TODO(sven): allow arbitrary ast nodes


export function codeFrameFromAst(ast, loc) {
  return codeFrameFromSource(print(ast), loc);
}
export function codeFrameFromSource(source, loc) {
  var start = loc.start,
      end = loc.end;
  var length = 1;

  if (_typeof(end) === "object") {
    length = end.column - start.column + 1;
  }

  return source.split("\n").reduce(function (acc, line, lineNbr) {
    if (Math.abs(start.line - lineNbr) < SHOW_LINES_AROUND_POINTER) {
      acc += line + "\n";
    } // Add a new line with the pointer padded left


    if (lineNbr === start.line - 1) {
      acc += repeat(" ", start.column - 1);
      acc += repeat("^", length);
      acc += "\n";
    }

    return acc;
  }, "");
}