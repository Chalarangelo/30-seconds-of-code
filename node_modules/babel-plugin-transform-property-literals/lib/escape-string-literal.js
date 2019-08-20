"use strict";
/**
 * Original Source:
 * https://github.com/shapesecurity/shift-codegen-js/blob/0d09bd8a/src/coderep.js#L122
 *
 * The following function is an exact copy of the original implementation
 *
 * LICENSE

Copyright 2014 Shape Security, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */

module.exports = function escapeStringLiteral(stringValue) {
  let result = "";
  let nSingle = 0,
      nDouble = 0;

  for (let i = 0, l = stringValue.length; i < l; ++i) {
    let ch = stringValue[i];

    if (ch === '"') {
      ++nDouble;
    } else if (ch === "'") {
      ++nSingle;
    }
  }

  let delim = nDouble > nSingle ? "'" : '"';
  result += delim;

  for (let i = 0; i < stringValue.length; i++) {
    let ch = stringValue.charAt(i);

    switch (ch) {
      case delim:
        result += "\\" + delim;
        break;

      case "\n":
        result += "\\n";
        break;

      case "\r":
        result += "\\r";
        break;

      case "\\":
        result += "\\\\";
        break;

      case "\u2028":
        result += "\\u2028";
        break;

      case "\u2029":
        result += "\\u2029";
        break;

      default:
        result += ch;
        break;
    }
  }

  result += delim;
  return result;
};