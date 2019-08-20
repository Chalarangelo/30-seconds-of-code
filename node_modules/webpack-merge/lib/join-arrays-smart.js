'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniteEntries = exports.uniteRules = undefined;

var _unionWith2 = require('lodash/unionWith');

var _unionWith3 = _interopRequireDefault(_unionWith2);

var _differenceWith2 = require('lodash/differenceWith');

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

var _mergeWith2 = require('lodash/mergeWith');

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = Array.isArray;

function uniteRules(rules, key, newRule, rule) {
  if (String(rule.test) !== String(newRule.test) || (newRule.enforce || rule.enforce) && rule.enforce !== newRule.enforce || newRule.include && !isSameValue(rule.include, newRule.include) || newRule.exclude && !isSameValue(rule.exclude, newRule.exclude)) {
    return false;
  } else if (!rule.test && !rule.include && !rule.exclude && (rule.loader && rule.loader.split('?')[0]) !== (newRule.loader && newRule.loader.split('?')[0])) {
    // Don't merge the rule if there isn't any identifying fields and the loaders don't match
    return false;
  } else if ((rule.include || rule.exclude) && !newRule.include && !newRule.exclude) {
    // Don't merge child without include/exclude to parent that has either
    return false;
  }

  // apply the same logic for oneOf
  if (rule.oneOf && newRule.oneOf) {
    rule.oneOf = (0, _unionWith3.default)(rule.oneOf, newRule.oneOf, uniteRules.bind(null, {}, 'oneOf'));

    return true;
  }

  // newRule.loader should always override use, loaders and oneOf
  if (newRule.loader) {
    var optionsKey = newRule.options ? 'options' : newRule.query && 'query';

    delete rule.use;
    delete rule.loaders;
    delete rule.oneOf;

    rule.loader = newRule.loader;

    if (optionsKey) {
      rule[optionsKey] = newRule[optionsKey];
    }
  } else if (newRule.oneOf) {
    delete rule.use;
    delete rule.loaders;
    delete rule.loader;

    rule.oneOf = newRule.oneOf;
  } else if ((rule.use || rule.loaders || rule.loader) && (newRule.use || newRule.loaders)) {
    var expandEntry = function expandEntry(loader) {
      return typeof loader === 'string' ? { loader: loader } : loader;
    };
    // this is only here to avoid breaking existing tests
    var unwrapEntry = function unwrapEntry(entry) {
      return !entry.options && !entry.query ? entry.loader : entry;
    };

    var entries = void 0;
    if (rule.loader) {
      var _optionsKey = rule.options ? 'options' : rule.query && 'query';
      entries = [{ loader: rule.loader }];

      if (_optionsKey) {
        entries[0][_optionsKey] = rule[_optionsKey];
      }

      delete rule.loader;

      if (_optionsKey) {
        delete rule[_optionsKey];
      }
    } else {
      entries = [].concat(rule.use || rule.loaders).map(expandEntry);
    }
    var newEntries = [].concat(newRule.use || newRule.loaders).map(expandEntry);

    var loadersKey = rule.use || newRule.use ? 'use' : 'loaders';
    var resolvedKey = key + '.' + loadersKey;

    switch (rules[resolvedKey]) {
      case 'prepend':
        rule[loadersKey] = [].concat(_toConsumableArray((0, _differenceWith3.default)(newEntries, entries, uniteEntries)), _toConsumableArray(entries)).map(unwrapEntry);
        break;
      case 'replace':
        rule[loadersKey] = newRule.use || newRule.loaders;
        break;
      default:
        rule[loadersKey] = combineEntries(newEntries, entries).map(unwrapEntry);
    }
  }

  if (newRule.include) {
    rule.include = newRule.include;
  }

  if (newRule.exclude) {
    rule.exclude = newRule.exclude;
  }

  return true;
}

/**
 * Check equality of two values using lodash's isEqual
 * Arrays need to be sorted for equality checking
 * but clone them first so as not to disrupt the sort order in tests
 */
function isSameValue(a, b) {
  var _map = [a, b].map(function (value) {
    return isArray(value) ? [].concat(_toConsumableArray(value)).sort() : value;
  }),
      _map2 = _slicedToArray(_map, 2),
      propA = _map2[0],
      propB = _map2[1];

  return (0, _isEqual3.default)(propA, propB);
}

function areEqualEntries(newEntry, entry) {
  var loaderNameRe = /^([^?]+)/ig;

  var _entry$loader$match = entry.loader.match(loaderNameRe),
      _entry$loader$match2 = _slicedToArray(_entry$loader$match, 1),
      loaderName = _entry$loader$match2[0];

  var _newEntry$loader$matc = newEntry.loader.match(loaderNameRe),
      _newEntry$loader$matc2 = _slicedToArray(_newEntry$loader$matc, 1),
      newLoaderName = _newEntry$loader$matc2[0];

  return loaderName === newLoaderName;
}

function uniteEntries(newEntry, entry) {
  if (areEqualEntries(newEntry, entry)) {
    // Replace query values with newer ones
    (0, _mergeWith3.default)(entry, newEntry);
    return true;
  }
  return false;
}

/* Combines entries and newEntries, while respecting the order of loaders in each.

Iterates through new entries. If the new entry also exists in existing entries,
we'll put in all of the loaders from existing entries that come before it (in case
those are pre-requisites). Any remaining existing entries are added at the end.

Since webpack processes right-to-left, we're working backwards through the arrays
*/
function combineEntries(newEntries, existingEntries) {
  var resultSet = [];

  // We're iterating through newEntries, this keeps track of where we are in the existingEntries
  var existingEntriesIteratorIndex = existingEntries.length - 1;

  for (var i = newEntries.length - 1; i >= 0; i -= 1) {
    var currentEntry = newEntries[i];
    var indexInExistingEntries = findLastIndexUsingComparinator(existingEntries, currentEntry, areEqualEntries, existingEntriesIteratorIndex);
    var hasEquivalentEntryInExistingEntries = indexInExistingEntries !== -1;

    if (hasEquivalentEntryInExistingEntries) {
      // If the same entry exists in existing entries, we should add all of the entries that
      // come before to maintain order
      for (var j = existingEntriesIteratorIndex; j > indexInExistingEntries; j -= 1) {
        var existingEntry = existingEntries[j];

        // If this entry also exists in new entries, we'll add as part of iterating through
        // new entries so that if there's a conflict between existing entries and new entries,
        // new entries order wins
        var hasMatchingEntryInNewEntries = findLastIndexUsingComparinator(newEntries, existingEntry, areEqualEntries, i) !== -1;

        if (!hasMatchingEntryInNewEntries) {
          resultSet.unshift(existingEntry);
        }
        existingEntriesIteratorIndex -= 1;
      }

      uniteEntries(currentEntry, existingEntries[existingEntriesIteratorIndex]);
      // uniteEntries mutates the second parameter to be a merged version, so that's what's pushed
      resultSet.unshift(existingEntries[existingEntriesIteratorIndex]);

      existingEntriesIteratorIndex -= 1;
    } else {
      var alreadyHasMatchingEntryInResultSet = findLastIndexUsingComparinator(resultSet, currentEntry, areEqualEntries) !== -1;

      if (!alreadyHasMatchingEntryInResultSet) {
        resultSet.unshift(currentEntry);
      }
    }
  }

  // Add remaining existing entries
  for (existingEntriesIteratorIndex; existingEntriesIteratorIndex >= 0; existingEntriesIteratorIndex -= 1) {

    var _existingEntry = existingEntries[existingEntriesIteratorIndex];
    var _alreadyHasMatchingEntryInResultSet = findLastIndexUsingComparinator(resultSet, _existingEntry, areEqualEntries) !== -1;

    if (!_alreadyHasMatchingEntryInResultSet) {
      resultSet.unshift(_existingEntry);
    }
  }

  return resultSet;
}

function findLastIndexUsingComparinator(entries, entryToFind, comparinator, startingIndex) {
  startingIndex = startingIndex || entries.length - 1;
  for (var i = startingIndex; i >= 0; i -= 1) {
    if (areEqualEntries(entryToFind, entries[i])) {
      return i;
    }
  }
  return -1;
}

exports.uniteRules = uniteRules;
exports.uniteEntries = uniteEntries;