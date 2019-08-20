/*!
 * regjsgen 0.5.0
 * Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 * Available under MIT license <https://github.com/bnjmnt4n/regjsgen/blob/master/LICENSE>
 */
;(function() {
  'use strict';

  // Used to determine if values are of the language type `Object`.
  var objectTypes = {
    'function': true,
    'object': true
  };

  // Used as a reference to the global object.
  var root = (objectTypes[typeof window] && window) || this;

  // Detect free variable `exports`.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Detect free variable `module`.
  var hasFreeModule = objectTypes[typeof module] && module && !module.nodeType;

  // Detect free variable `global` from Node.js or Browserified code and use it as `root`.
  var freeGlobal = freeExports && hasFreeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Used to check objects for own properties.
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /*--------------------------------------------------------------------------*/

  // Generates a string based on the given code point.
  // Based on https://mths.be/fromcodepoint by @mathias.
  function fromCodePoint() {
    var codePoint = Number(arguments[0]);

    if (
      !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
      codePoint < 0 || // not a valid Unicode code point
      codePoint > 0x10FFFF || // not a valid Unicode code point
      Math.floor(codePoint) != codePoint // not an integer
    ) {
      throw RangeError('Invalid code point: ' + codePoint);
    }

    if (codePoint <= 0xFFFF) {
      // BMP code point
      return String.fromCharCode(codePoint);
    } else {
      // Astral code point; split in surrogate halves
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      var highSurrogate = (codePoint >> 10) + 0xD800;
      var lowSurrogate = (codePoint % 0x400) + 0xDC00;
      return String.fromCharCode(highSurrogate, lowSurrogate);
    }
  }

  /*--------------------------------------------------------------------------*/

  // Ensures that nodes have the correct types.
  var assertTypeRegexMap = {};
  function assertType(type, expected) {
    if (expected.indexOf('|') == -1) {
      if (type == expected) {
        return;
      }

      throw Error('Invalid node type: ' + type + '; expected type: ' + expected);
    }

    expected = hasOwnProperty.call(assertTypeRegexMap, expected)
      ? assertTypeRegexMap[expected]
      : (assertTypeRegexMap[expected] = RegExp('^(?:' + expected + ')$'));

    if (expected.test(type)) {
      return;
    }

    throw Error('Invalid node type: ' + type + '; expected types: ' + expected);
  }

  /*--------------------------------------------------------------------------*/

  // Generates a regular expression string based on an AST.
  function generate(node) {
    var type = node.type;

    if (hasOwnProperty.call(generators, type)) {
      return generators[type](node);
    }

    throw Error('Invalid node type: ' + type);
  }

  /*--------------------------------------------------------------------------*/

  function generateAlternative(node) {
    assertType(node.type, 'alternative');

    var terms = node.body,
        i = -1,
        length = terms.length,
        result = '';

    while (++i < length) {
      result += generateTerm(terms[i]);
    }

    return result;
  }

  function generateAnchor(node) {
    assertType(node.type, 'anchor');

    switch (node.kind) {
      case 'start':
        return '^';
      case 'end':
        return '$';
      case 'boundary':
        return '\\b';
      case 'not-boundary':
        return '\\B';
      default:
        throw Error('Invalid assertion');
    }
  }

  function generateAtom(node) {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');

    return generate(node);
  }

  function generateCharacterClass(node) {
    assertType(node.type, 'characterClass');

    var classRanges = node.body,
        i = -1,
        length = classRanges.length,
        result = '';

    if (node.negative) {
      result += '^';
    }

    while (++i < length) {
      result += generateClassAtom(classRanges[i]);
    }

    return '[' + result + ']';
  }

  function generateCharacterClassEscape(node) {
    assertType(node.type, 'characterClassEscape');

    return '\\' + node.value;
  }

  function generateUnicodePropertyEscape(node) {
    assertType(node.type, 'unicodePropertyEscape');

    return '\\' + (node.negative ? 'P' : 'p') + '{' + node.value + '}';
  }

  function generateCharacterClassRange(node) {
    assertType(node.type, 'characterClassRange');

    var min = node.min,
        max = node.max;

    if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
      throw Error('Invalid character class range');
    }

    return generateClassAtom(min) + '-' + generateClassAtom(max);
  }

  function generateClassAtom(node) {
    assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');

    return generate(node);
  }

  function generateDisjunction(node) {
    assertType(node.type, 'disjunction');

    var body = node.body,
        i = -1,
        length = body.length,
        result = '';

    while (++i < length) {
      if (i != 0) {
        result += '|';
      }
      result += generate(body[i]);
    }

    return result;
  }

  function generateDot(node) {
    assertType(node.type, 'dot');

    return '.';
  }

  function generateGroup(node) {
    assertType(node.type, 'group');

    var result = '';

    switch (node.behavior) {
      case 'normal':
        if (node.name) {
          result += '?<' + generateIdentifier(node.name) + '>';
        }
        break;
      case 'ignore':
        result += '?:';
        break;
      case 'lookahead':
        result += '?=';
        break;
      case 'negativeLookahead':
        result += '?!';
        break;
      case 'lookbehind':
        result += '?<=';
        break;
      case 'negativeLookbehind':
        result += '?<!';
        break;
      default:
        throw Error('Invalid behaviour: ' + node.behaviour);
    }

    var body = node.body,
        i = -1,
        length = body.length;

    while (++i < length) {
      result += generate(body[i]);
    }

    return '(' + result + ')';
  }

  function generateIdentifier(node) {
    assertType(node.type, 'identifier');

    return node.value;
  }

  function generateQuantifier(node) {
    assertType(node.type, 'quantifier');

    var quantifier = '',
        min = node.min,
        max = node.max;

    if (max == null) {
      if (min == 0) {
        quantifier = '*';
      } else if (min == 1) {
        quantifier = '+';
      } else {
        quantifier = '{' + min + ',}';
      }
    } else if (min == max) {
      quantifier = '{' + min + '}';
    } else if (min == 0 && max == 1) {
      quantifier = '?';
    } else {
      quantifier = '{' + min + ',' + max + '}';
    }

    if (!node.greedy) {
      quantifier += '?';
    }

    return generateAtom(node.body[0]) + quantifier;
  }

  function generateReference(node) {
    assertType(node.type, 'reference');

    if (node.matchIndex) {
      return '\\' + node.matchIndex;
    }
    if (node.name) {
      return '\\k<' + generateIdentifier(node.name) + '>';
    }

    throw new Error('Unknown reference type');
  }

  function generateTerm(node) {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|unicodePropertyEscape|value');

    return generate(node);
  }

  function generateValue(node) {
    assertType(node.type, 'value');

    var kind = node.kind,
        codePoint = node.codePoint;

    if (typeof codePoint != 'number') {
      throw new Error('Invalid code point: ' + codePoint);
    }

    switch (kind) {
      case 'controlLetter':
        return '\\c' + fromCodePoint(codePoint + 64);
      case 'hexadecimalEscape':
        return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
      case 'identifier':
        return '\\' + fromCodePoint(codePoint);
      case 'null':
        return '\\' + codePoint;
      case 'octal':
        return '\\' + codePoint.toString(8);
      case 'singleEscape':
        switch (codePoint) {
          case 0x0008:
            return '\\b';
          case 0x0009:
            return '\\t';
          case 0x000A:
            return '\\n';
          case 0x000B:
            return '\\v';
          case 0x000C:
            return '\\f';
          case 0x000D:
            return '\\r';
          default:
            throw Error('Invalid code point: ' + codePoint);
        }
      case 'symbol':
        return fromCodePoint(codePoint);
      case 'unicodeEscape':
        return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
      case 'unicodeCodePointEscape':
        return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
      default:
        throw Error('Unsupported node kind: ' + kind);
    }
  }

  /*--------------------------------------------------------------------------*/

  // Used to generate strings for each node type.
  var generators = {
    'alternative': generateAlternative,
    'anchor': generateAnchor,
    'characterClass': generateCharacterClass,
    'characterClassEscape': generateCharacterClassEscape,
    'characterClassRange': generateCharacterClassRange,
    'unicodePropertyEscape': generateUnicodePropertyEscape,
    'disjunction': generateDisjunction,
    'dot': generateDot,
    'group': generateGroup,
    'quantifier': generateQuantifier,
    'reference': generateReference,
    'value': generateValue
  };

  /*--------------------------------------------------------------------------*/

  // Export regjsgen.
  var regjsgen = {
    'generate': generate
  };

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Define as an anonymous module so it can be aliased through path mapping.
    define(function() {
      return regjsgen;
    });

    root.regjsgen = regjsgen;
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && hasFreeModule) {
    // Export for CommonJS support.
    freeExports.generate = generate;
  }
  else {
    // Export to the global object.
    root.regjsgen = regjsgen;
  }
}.call(this));
