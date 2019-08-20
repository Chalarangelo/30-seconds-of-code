/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var SignedSource = require("signedsource");

var _require = require("graphql"),
    GraphQLEnumType = _require.GraphQLEnumType;

function writeForSchema(schema, licenseHeader, codegenDir, moduleName) {
  var typeMap = schema.getTypeMap();
  var stableTypeNames = Object.keys(typeMap).sort();
  var types = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stableTypeNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;
      var type = typeMap[name];

      if (type instanceof GraphQLEnumType) {
        var values = type.getValues().map(function (_ref) {
          var value = _ref.value;
          return value;
        });
        values.sort();
        types.push("export type ".concat(name, " =\n  | '") + values.join("'\n  | '") + "'\n  | '%future added value';");
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var content = '/**\n' + licenseHeader.map(function (line) {
    return " * ".concat(line, "\n");
  }).join('') + ' *\n' + " * ".concat(SignedSource.getSigningToken(), "\n") + ' * @flow\n' + ' */\n' + '\n' + // use Flow comment to avoid long Babel compile times
  '/*::\n' + types.join('\n\n') + '\n*/\n';
  codegenDir.writeFile(moduleName + '.js', SignedSource.signFile(content));
}

module.exports = {
  writeForSchema: writeForSchema
};