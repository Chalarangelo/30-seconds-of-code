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
/**
 * Given a object of nested properties, return JavaScript text that would merge
 * in an object named `objectName` by a series of individual assignments.
 */

function deepMergeAssignments(objectName, properties) {
  var assignments = [];
  collectAssignmentsInto(assignments, [], properties);
  var jsAssignments = assignments.map(function (_ref) {
    var path = _ref.path,
        value = _ref.value;
    return formatJSAssignment(objectName, path, value);
  });
  return jsAssignments.length === 0 ? '' : jsAssignments.join('\n');
} // Recursively collect assignments


function collectAssignmentsInto(assignments, parentPath, parentValue) {
  // Iterate over the entries in the array or object.
  forEach(parentValue, function (value, key) {
    // The "path" is the sequence of keys to arrive at this assignment.
    var path = parentPath.concat(key); // For each entry, either add an assignment or recurse.

    if (typeof value === 'object' && value !== null) {
      collectAssignmentsInto(assignments, path, value);
    } else {
      assignments.push({
        path: path,
        value: value
      });
    }
  });
} // Print a path/value pair as a JS assignment expression.


function formatJSAssignment(objectName, path, value) {
  var assignmentPath = path.map(function (p) {
    return typeof p === 'string' ? ".".concat(p) : "[".concat(p, "]");
  }).join('');
  var jsValue = value === undefined ? 'undefined' : JSON.stringify(value);
  return "".concat(objectName).concat(assignmentPath, " = ").concat(jsValue, ";");
} // Utility for looping over entries in both Arrays and Objects.


function forEach(value, fn) {
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      fn(value[i], i);
    }
  } else {
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        fn(value[k], k);
      }
    }
  }
}

module.exports = deepMergeAssignments;