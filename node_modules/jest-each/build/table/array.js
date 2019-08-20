'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _util() {
  const data = _interopRequireDefault(require('util'));

  _util = function _util() {
    return data;
  };

  return data;
}

function _prettyFormat() {
  const data = _interopRequireDefault(require('pretty-format'));

  _prettyFormat = function _prettyFormat() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

const SUPPORTED_PLACEHOLDERS = /%[sdifjoOp%]/g;
const PRETTY_PLACEHOLDER = '%p';
const INDEX_PLACEHOLDER = '%#';
const PLACEHOLDER_PREFIX = '%';
const JEST_EACH_PLACEHOLDER_ESCAPE = '@@__JEST_EACH_PLACEHOLDER_ESCAPE__@@';

var _default = (title, arrayTable) =>
  normaliseTable(arrayTable).map((row, index) => ({
    arguments: row,
    title: formatTitle(title, row, index)
  }));

exports.default = _default;

const normaliseTable = table => (isTable(table) ? table : table.map(colToRow));

const isTable = table => table.every(Array.isArray);

const colToRow = col => [col];

const formatTitle = (title, row, rowIndex) =>
  row
    .reduce((formattedTitle, value) => {
      const _getMatchingPlacehold = getMatchingPlaceholders(formattedTitle),
        _getMatchingPlacehold2 = _slicedToArray(_getMatchingPlacehold, 1),
        placeholder = _getMatchingPlacehold2[0];

      const normalisedValue = normalisePlaceholderValue(value);
      if (!placeholder) return formattedTitle;
      if (placeholder === PRETTY_PLACEHOLDER)
        return interpolatePrettyPlaceholder(formattedTitle, normalisedValue);
      return _util().default.format(formattedTitle, normalisedValue);
    }, interpolateTitleIndex(title, rowIndex))
    .replace(new RegExp(JEST_EACH_PLACEHOLDER_ESCAPE, 'g'), PLACEHOLDER_PREFIX);

const normalisePlaceholderValue = value =>
  typeof value === 'string' && SUPPORTED_PLACEHOLDERS.test(value)
    ? value.replace(PLACEHOLDER_PREFIX, JEST_EACH_PLACEHOLDER_ESCAPE)
    : value;

const getMatchingPlaceholders = title =>
  title.match(SUPPORTED_PLACEHOLDERS) || [];

const interpolateTitleIndex = (title, index) =>
  title.replace(INDEX_PLACEHOLDER, index.toString());

const interpolatePrettyPlaceholder = (title, value) =>
  title.replace(
    PRETTY_PLACEHOLDER,
    (0, _prettyFormat().default)(value, {
      maxDepth: 1,
      min: true
    })
  );
