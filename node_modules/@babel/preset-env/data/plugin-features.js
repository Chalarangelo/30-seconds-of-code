const es = {
  "transform-template-literals": {
    features: ["template literals"],
  },
  "transform-literals": {
    features: ["Unicode code point escapes"],
  },
  "transform-function-name": {
    features: ['function "name" property'],
  },
  "transform-arrow-functions": {
    features: ["arrow functions"],
  },
  "transform-block-scoped-functions": {
    features: ["block-level function declaration"],
  },
  "transform-classes": {
    features: ["class", "super"],
  },
  "transform-object-super": {
    features: ["super"],
  },
  "transform-shorthand-properties": {
    features: ["object literal extensions / shorthand properties"],
  },
  "transform-duplicate-keys": {
    features: ["miscellaneous / duplicate property names in strict mode"],
  },
  "transform-computed-properties": {
    features: ["object literal extensions / computed properties"],
  },
  "transform-for-of": {
    features: ["for..of loops"],
  },
  "transform-sticky-regex": {
    features: [
      'RegExp "y" and "u" flags / "y" flag, lastIndex',
      'RegExp "y" and "u" flags / "y" flag',
    ],
  },

  // We want to apply this prior to unicode regex so that "." and "u"
  // are properly handled.
  //
  // Ref: https://github.com/babel/babel/pull/7065#issuecomment-395959112
  "transform-dotall-regex": "s (dotAll) flag for regular expressions",

  "transform-unicode-regex": {
    features: [
      'RegExp "y" and "u" flags / "u" flag, case folding',
      'RegExp "y" and "u" flags / "u" flag, Unicode code point escapes',
      'RegExp "y" and "u" flags / "u" flag, non-BMP Unicode characters',
      'RegExp "y" and "u" flags / "u" flag',
    ],
  },

  "transform-spread": {
    features: "spread syntax for iterable objects",
  },
  "transform-parameters": {
    features: [
      "default function parameters",
      "rest parameters",
      "destructuring, parameters / defaults, arrow function",
    ],
  },
  "transform-destructuring": {
    features: [
      "destructuring, assignment",
      "destructuring, declarations",
    ],
  },
  "transform-block-scoping": {
    features: ["const", "let"],
  },
  "transform-typeof-symbol": {
    features: ["Symbol / typeof support"],
  },
  "transform-new-target": {
    features: ["new.target"],
  },
  "transform-regenerator": {
    features: ["generators"],
  },

  "transform-exponentiation-operator": {
    features: ["exponentiation (**) operator"],
  },

  "transform-async-to-generator": {
    features: ["async functions"],
  },

  "proposal-async-generator-functions": "Asynchronous Iterators",
  "proposal-object-rest-spread": "object rest/spread properties",
  "proposal-unicode-property-regex": "RegExp Unicode Property Escapes",

  "proposal-json-strings": "JSON superset",
  "proposal-optional-catch-binding": "optional catch binding",
  "transform-named-capturing-groups-regex": "RegExp named capture groups",
  "transform-member-expression-literals": "Object/array literal extensions / Reserved words as property names",
  "transform-property-literals": "Object/array literal extensions / Reserved words as property names",
  "transform-reserved-words": "Miscellaneous / Unreserved words",
};

const proposals = require("./shipped-proposals").features;

module.exports = Object.assign({}, es, proposals);
