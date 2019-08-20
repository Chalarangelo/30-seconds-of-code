/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  weak
 * @typechecks
 */
'use strict';

var invariant = require("./invariant");
/**
 * Constructs an enumeration with keys equal to their value. If the value is an
 * object, the method is run recursively, including the parent key as a suffix.
 * An optional prefix can be provided that will be prepended to each value.
 *
 * For example:
 *
 *   var ACTIONS = keyMirror({FOO: null, BAR: { BAZ: null, BOZ: null }}});
 *   ACTIONS.BAR.BAZ = 'BAR.BAZ';
 *
 *   Input:  {key1: null, key2: { nested1: null, nested2: null }}}
 *   Output: {key1: key1, key2: { nested1: nested1, nested2: nested2 }}}
 *
 *   var CONSTANTS = keyMirror({FOO: {BAR: null}}, 'NameSpace');
 *   console.log(CONSTANTS.FOO.BAR); // NameSpace.FOO.BAR
 */


function keyMirrorRecursive(obj, prefix) {
  return keyMirrorRecursiveInternal(obj, prefix);
}

function keyMirrorRecursiveInternal(
/*object*/
obj,
/*?string*/
prefix)
/*object*/
{
  var ret = {};
  var key;
  !isObject(obj) ? process.env.NODE_ENV !== "production" ? invariant(false, 'keyMirrorRecursive(...): Argument must be an object.') : invariant(false) : void 0;

  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    var val = obj[key];
    var newPrefix = prefix ? prefix + '.' + key : key;

    if (isObject(val)) {
      val = keyMirrorRecursiveInternal(val, newPrefix);
    } else {
      val = newPrefix;
    }

    ret[key] = val;
  }

  return ret;
}

function isObject(obj)
/*boolean*/
{
  return obj instanceof Object && !Array.isArray(obj);
}

module.exports = keyMirrorRecursive;