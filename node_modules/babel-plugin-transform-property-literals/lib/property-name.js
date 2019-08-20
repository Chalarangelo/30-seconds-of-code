"use strict";

const _require = require("esutils"),
      keyword = _require.keyword;

const escapeStringLiteral = require("./escape-string-literal");

module.exports = {
  reduceStaticPropertyNameES5
};
/**
 *
 * Original Source:
 * https://github.com/shapesecurity/shift-codegen-js/blob/0d09bd8a/src/minimal-codegen.js#L635
 *
 * This implementation modifies the original source in the following ways
 * + Check for ES5 Identifier name instead of ES6 Identifier name
 * + Use Babel-Types & Babel's AST instead of ShiftAST
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

function reduceStaticPropertyNameES5(t, node) {
  if (keyword.isIdentifierNameES5(node.value)) {
    return t.Identifier(node.value);
  }

  let n = parseFloat(node.value);

  if (n >= 0 && n.toString() === node.value) {
    return t.NumericLiteral(n);
  }

  return t.Identifier(escapeStringLiteral(node.value));
}