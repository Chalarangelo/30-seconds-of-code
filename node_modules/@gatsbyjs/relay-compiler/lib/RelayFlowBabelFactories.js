/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 * @format
 */
'use strict';

var invariant = require("fbjs/lib/invariant");

var t = require("@babel/types");

/**
 * type NAME = any;
 */
function anyTypeAlias(name) {
  return t.typeAlias(t.identifier(name), null, t.anyTypeAnnotation());
}
/**
 * {|
 *   PROPS
 * |}
 */


function exactObjectTypeAnnotation(props) {
  var typeAnnotation = t.objectTypeAnnotation(props);
  typeAnnotation.exact = true;
  return typeAnnotation;
}
/**
 * export type NAME = TYPE
 */


function exportType(name, type) {
  return t.exportNamedDeclaration(t.typeAlias(t.identifier(name), null, type), [], null);
}
/**
 * import type {NAMES[0], NAMES[1], ...} from 'MODULE';
 */


function importTypes(names, module) {
  var importDeclaration = t.importDeclaration(names.map(function (name) {
    return t.importSpecifier(t.identifier(name), t.identifier(name));
  }), t.stringLiteral(module));
  importDeclaration.importKind = 'type';
  return importDeclaration;
}
/**
 * Create an intersection type if needed.
 *
 * TYPES[0] & TYPES[1] & ...
 */


function intersectionTypeAnnotation(types) {
  !(types.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayFlowBabelFactories: cannot create an intersection of 0 types') : invariant(false) : void 0;
  return types.length === 1 ? types[0] : t.intersectionTypeAnnotation(types);
}

function lineComments() {
  for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
    lines[_key] = arguments[_key];
  }

  /* $FlowFixMe(>=0.70.0) This comment suppresses an error found when
   * Flow v0.70 was deployed. To see the error delete this comment and
   * run Flow. */
  return lines.map(function (line) {
    return {
      type: 'CommentLine',
      value: ' ' + line
    };
  });
}
/**
 * $ReadOnlyArray<TYPE>
 */


function readOnlyArrayOfType(thing) {
  return t.genericTypeAnnotation(t.identifier('$ReadOnlyArray'), t.typeParameterInstantiation([thing]));
}
/**
 * +KEY: VALUE
 */


function readOnlyObjectTypeProperty(key, value) {
  var prop = t.objectTypeProperty(t.identifier(key), value);
  prop.variance = t.variance('plus');
  return prop;
}

function stringLiteralTypeAnnotation(value) {
  return t.stringLiteralTypeAnnotation(value);
}
/**
 * Create a union type if needed.
 *
 * TYPES[0] | TYPES[1] | ...
 */


function unionTypeAnnotation(types) {
  !(types.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayFlowBabelFactories: cannot create a union of 0 types') : invariant(false) : void 0;
  return types.length === 1 ? types[0] : t.unionTypeAnnotation(types);
}

module.exports = {
  anyTypeAlias: anyTypeAlias,
  exactObjectTypeAnnotation: exactObjectTypeAnnotation,
  exportType: exportType,
  importTypes: importTypes,
  intersectionTypeAnnotation: intersectionTypeAnnotation,
  lineComments: lineComments,
  readOnlyArrayOfType: readOnlyArrayOfType,
  readOnlyObjectTypeProperty: readOnlyObjectTypeProperty,
  stringLiteralTypeAnnotation: stringLiteralTypeAnnotation,
  unionTypeAnnotation: unionTypeAnnotation
};