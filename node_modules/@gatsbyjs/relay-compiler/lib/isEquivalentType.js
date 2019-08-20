/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var _require = require("./GraphQLSchemaUtils"),
    getRawType = _require.getRawType;

var _require2 = require("graphql"),
    GraphQLNonNull = _require2.GraphQLNonNull,
    GraphQLList = _require2.GraphQLList;

/**
 * Determine if a type is the same type (same name and class) as another type.
 * Needed if we're comparing IRs created at different times: we don't yet have
 * an IR schema, so the type we assign to an IR field could be !== than
 * what we assign to it after adding some schema definitions or extensions.
 */
function isEquivalentType(typeA, typeB) {
  // Easy short-circuit: equal types are equal.
  if (typeA === typeB) {
    return true;
  } // If either type is non-null, the other must also be non-null.


  if (typeA instanceof GraphQLNonNull && typeB instanceof GraphQLNonNull) {
    return isEquivalentType(typeA.ofType, typeB.ofType);
  } // If either type is a list, the other must also be a list.


  if (typeA instanceof GraphQLList && typeB instanceof GraphQLList) {
    return isEquivalentType(typeA.ofType, typeB.ofType);
  } // Make sure the two types are of the same class


  if (typeA.constructor.name === typeB.constructor.name) {
    var rawA = getRawType(typeA);
    var rawB = getRawType(typeB); // And they must have the exact same name

    return rawA.name === rawB.name;
  } // Otherwise the types are not equal.


  return false;
}

module.exports = isEquivalentType;