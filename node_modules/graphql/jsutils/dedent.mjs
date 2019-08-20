/**
 * An ES6 string tag that fixes indentation. Also removes leading newlines
 * and trailing spaces and tabs, but keeps trailing newlines.
 *
 * Example usage:
 * const str = dedent`
 *   {
 *     test
 *   }
 * `;
 * str === "{\n  test\n}\n";
 */
export default function dedent(strings) {
  var str = '';

  for (var i = 0; i < strings.length; ++i) {
    str += strings[i];

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      str += i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]; // interpolation
    }
  }

  var trimmedStr = str.replace(/^\n*/m, '') //  remove leading newline
  .replace(/[ \t]*$/, ''); // remove trailing spaces and tabs
  // fixes indentation by removing leading spaces and tabs from each line

  var indent = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = trimmedStr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var char = _step.value;

      if (char !== ' ' && char !== '\t') {
        break;
      }

      indent += char;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return trimmedStr.replace(RegExp('^' + indent, 'mg'), ''); // remove indent
}
