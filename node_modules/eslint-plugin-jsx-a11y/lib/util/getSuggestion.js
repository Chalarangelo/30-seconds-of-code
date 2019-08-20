"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getSuggestion;

var _damerauLevenshtein = _interopRequireDefault(require("damerau-levenshtein"));

// Minimum edit distance to be considered a good suggestion.
var THRESHOLD = 2;
/**
 * Returns an array of suggestions given a word and a dictionary and limit of suggestions
 * to return.
 */

function getSuggestion(word) {
  var dictionary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var distances = dictionary.reduce(function (suggestions, dictionaryWord) {
    var distance = (0, _damerauLevenshtein["default"])(word.toUpperCase(), dictionaryWord.toUpperCase());
    var steps = distance.steps;
    suggestions[dictionaryWord] = steps; // eslint-disable-line

    return suggestions;
  }, {});
  return Object.keys(distances).filter(function (suggestion) {
    return distances[suggestion] <= THRESHOLD;
  }).sort(function (a, b) {
    return distances[a] - distances[b];
  }) // Sort by distance
  .slice(0, limit);
}