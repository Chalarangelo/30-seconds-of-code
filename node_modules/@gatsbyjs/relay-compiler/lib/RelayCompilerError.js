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

var _require = require("graphql"),
    GraphQLError = _require.GraphQLError;

/**
 * Creates an error describing invalid application code (GraphQL/Schema)
 * that must be fixed by the end developer. This should only be used
 * for local errors that don't affect processing of other user code.
 */
function createUserError(message, locations, nodes) {
  var _nodes;

  var messageWithLocations = message;

  if (locations != null) {
    var printedLocations = printLocations(locations);
    messageWithLocations = printedLocations.length === 0 ? message : [message].concat(printedLocations).join('\n\n') + '\n';
  }

  return new GraphQLError(messageWithLocations, (_nodes = nodes) !== null && _nodes !== void 0 ? _nodes : []);
}
/**
 * Similar to createUserError but for errors that are *not* recoverable:
 * the compiler should not continue to process other inputs because their
 * validity can't be determined.
 */


function createNonRecoverableUserError(message, locations, nodes) {
  var _nodes2;

  var messageWithLocations = message;

  if (locations != null) {
    var printedLocations = printLocations(locations);
    messageWithLocations = printedLocations.length === 0 ? message : [message].concat(printedLocations).join('\n\n') + '\n';
  }

  var error = new GraphQLError(messageWithLocations, (_nodes2 = nodes) !== null && _nodes2 !== void 0 ? _nodes2 : []);
  return new Error(error.message);
}
/**
 * Creates an error describing a problem with the compiler itself - such
 * as a broken invariant - that must be fixed within the compiler.
 */


function createCompilerError(message, locations, nodes) {
  var _nodes3;

  var messageWithLocations = message;

  if (locations != null) {
    var printedLocations = printLocations(locations);
    messageWithLocations = printedLocations.length === 0 ? message : [message].concat(printedLocations).join('\n\n') + '\n';
  }

  var error = new GraphQLError("Internal Error: ".concat(messageWithLocations), (_nodes3 = nodes) !== null && _nodes3 !== void 0 ? _nodes3 : []);
  return new Error(error.message);
}
/**
 * Merges the results of multiple user errors into one so that they
 * can be reported in bulk.
 */


function createCombinedError(errors, maybePrefix) {
  var prefix = maybePrefix != null ? "".concat(maybePrefix, ": ") : '';
  return new Error("".concat(prefix, "Encountered ").concat(errors.length, " error(s):\n") + errors.map(function (error) {
    return String(error).split('\n').map(function (line, index) {
      return index === 0 ? "- ".concat(line) : "  ".concat(line);
    }).join('\n');
  }).join('\n'));
}
/**
 * Iterates over the elements of some iterable value, calling the
 * supplied callback for each item with a guard for user errors.
 * Returns null if the iteration completed without errors, otherwise
 * returns an array of all the user errors encountered.
 *
 * Note that non-user errors are rethrown since they are
 * non-recoverable.
 */


function eachWithErrors(iterable, fn) {
  var errors = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      try {
        fn(item);
      } catch (error) {
        if (error instanceof GraphQLError) {
          errors.push(error);
        } else {
          throw error;
        }
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

  if (errors.length !== 0) {
    return errors;
  }

  return null;
}

function printLocations(locations) {
  var printedLocations = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = locations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var location = _step2.value;
      var sourceLocation = location;

      while (sourceLocation.kind === 'Derived') {
        sourceLocation = sourceLocation.source;
      }

      switch (sourceLocation.kind) {
        case 'Source':
          {
            // source location
            var prefix = sourceLocation === location ? 'Source: ' : 'Source (derived): ';
            printedLocations.push(prefix + highlightSourceAtLocation(sourceLocation.source, getLocation(sourceLocation.source, sourceLocation.start)));
            break;
          }

        case 'Generated':
          {
            printedLocations.push('Source: (generated)');
            break;
          }

        case 'Unknown':
          {
            printedLocations.push('Source: (unknown)');
            break;
          }

        default:
          {
            sourceLocation;
            throw createCompilerError("RelayCompilerError: cannot print location '".concat(String(sourceLocation), "'."));
          }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return printedLocations;
}
/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */


function highlightSourceAtLocation(source, location) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = location.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = location.line + lineOffset;
  var columnOffset = location.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = location.column + columnOffset;
  var lines = body.split(/\r\n|[\n\r]/g);
  return "".concat(source.name, " (").concat(lineNum, ":").concat(columnNum, ")\n") + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
  ["".concat(lineNum - 1, ": "), lines[lineIndex - 1]], ["".concat(lineNum, ": "), lines[lineIndex]], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1, ": "), lines[lineIndex + 1]]]);
}

function printPrefixedLines(lines) {
  var existingLines = lines.filter(function (_ref) {
    var _ = _ref[0],
        line = _ref[1];
    return line !== undefined;
  });
  var padLen = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = existingLines[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _step3.value,
          prefix = _step3$value[0];
      padLen = Math.max(padLen, prefix.length);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return existingLines.map(function (_ref2) {
    var prefix = _ref2[0],
        line = _ref2[1];
    return lpad(padLen, prefix) + line;
  }).join('\n');
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function lpad(len, str) {
  return whitespace(len - str.length) + str;
}

function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;

  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }

  return {
    line: line,
    column: column
  };
}

module.exports = {
  createCombinedError: createCombinedError,
  createCompilerError: createCompilerError,
  createNonRecoverableUserError: createNonRecoverableUserError,
  createUserError: createUserError,
  eachWithErrors: eachWithErrors
};