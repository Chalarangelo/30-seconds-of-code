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
/**
 * Recycles subtrees from `prevData` by replacing equal subtrees in `nextData`.
 */

function recycleNodesInto(prevData, nextData) {
  if (prevData === nextData || typeof prevData !== 'object' || !prevData || typeof nextData !== 'object' || !nextData) {
    return nextData;
  }

  var canRecycle = false; // Assign local variables to preserve Flow type refinement.

  var prevArray = Array.isArray(prevData) ? prevData : null;
  var nextArray = Array.isArray(nextData) ? nextData : null;

  if (prevArray && nextArray) {
    canRecycle = nextArray.reduce(function (wasEqual, nextItem, ii) {
      var prevValue = prevArray[ii];
      var nextValue = recycleNodesInto(prevValue, nextItem);

      if (nextValue !== nextArray[ii]) {
        if (process.env.NODE_ENV !== "production") {
          if (!Object.isFrozen(nextArray)) {
            nextArray[ii] = nextValue;
          }
        } else {
          nextArray[ii] = nextValue;
        }
      }

      return wasEqual && nextValue === prevArray[ii];
    }, true) && prevArray.length === nextArray.length;
  } else if (!prevArray && !nextArray) {
    // Assign local variables to preserve Flow type refinement.
    var prevObject = prevData;
    var nextObject = nextData;
    var prevKeys = Object.keys(prevObject);
    var nextKeys = Object.keys(nextObject);
    canRecycle = nextKeys.reduce(function (wasEqual, key) {
      var prevValue = prevObject[key];
      var nextValue = recycleNodesInto(prevValue, nextObject[key]);

      if (nextValue !== nextObject[key]) {
        if (process.env.NODE_ENV !== "production") {
          if (!Object.isFrozen(nextObject)) {
            nextObject[key] = nextValue;
          }
        } else {
          nextObject[key] = nextValue;
        }
      }

      return wasEqual && nextValue === prevObject[key];
    }, true) && prevKeys.length === nextKeys.length;
  }

  return canRecycle ? prevData : nextData;
}

module.exports = recycleNodesInto;