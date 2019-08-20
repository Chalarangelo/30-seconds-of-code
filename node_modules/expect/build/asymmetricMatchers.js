'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.stringNotMatching = exports.stringMatching = exports.stringNotContaining = exports.stringContaining = exports.objectNotContaining = exports.objectContaining = exports.arrayNotContaining = exports.arrayContaining = exports.anything = exports.any = exports.AsymmetricMatcher = void 0;

var _jasmineUtils = require('./jasmineUtils');

var _utils = require('./utils');

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class AsymmetricMatcher {
  constructor(sample) {
    _defineProperty(this, 'sample', void 0);

    _defineProperty(this, '$$typeof', void 0);

    _defineProperty(this, 'inverse', void 0);

    this.$$typeof = Symbol.for('jest.asymmetricMatcher');
    this.sample = sample;
  }
}

exports.AsymmetricMatcher = AsymmetricMatcher;

class Any extends AsymmetricMatcher {
  constructor(sample) {
    if (typeof sample === 'undefined') {
      throw new TypeError(
        'any() expects to be passed a constructor function. ' +
          'Please pass one or use anything() to match any object.'
      );
    }

    super(sample);
  }

  asymmetricMatch(other) {
    if (this.sample == String) {
      return typeof other == 'string' || other instanceof String;
    }

    if (this.sample == Number) {
      return typeof other == 'number' || other instanceof Number;
    }

    if (this.sample == Function) {
      return typeof other == 'function' || other instanceof Function;
    }

    if (this.sample == Object) {
      return typeof other == 'object';
    }

    if (this.sample == Boolean) {
      return typeof other == 'boolean';
    }

    return other instanceof this.sample;
  }

  toString() {
    return 'Any';
  }

  getExpectedType() {
    if (this.sample == String) {
      return 'string';
    }

    if (this.sample == Number) {
      return 'number';
    }

    if (this.sample == Function) {
      return 'function';
    }

    if (this.sample == Object) {
      return 'object';
    }

    if (this.sample == Boolean) {
      return 'boolean';
    }

    return (0, _jasmineUtils.fnNameFor)(this.sample);
  }

  toAsymmetricMatcher() {
    return 'Any<' + (0, _jasmineUtils.fnNameFor)(this.sample) + '>';
  }
}

class Anything extends AsymmetricMatcher {
  asymmetricMatch(other) {
    return !(0, _jasmineUtils.isUndefined)(other) && other !== null;
  }

  toString() {
    return 'Anything';
  } // No getExpectedType method, because it matches either null or undefined.

  toAsymmetricMatcher() {
    return 'Anything';
  }
}

class ArrayContaining extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    super(sample);
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    if (!Array.isArray(this.sample)) {
      throw new Error(
        `You must provide an array to ${this.toString()}, not '` +
          typeof this.sample +
          "'."
      );
    }

    const result =
      this.sample.length === 0 ||
      (Array.isArray(other) &&
        this.sample.every(item =>
          other.some(another => (0, _jasmineUtils.equals)(item, another))
        ));
    return this.inverse ? !result : result;
  }

  toString() {
    return `Array${this.inverse ? 'Not' : ''}Containing`;
  }

  getExpectedType() {
    return 'array';
  }
}

class ObjectContaining extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    super(sample);
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    if (typeof this.sample !== 'object') {
      throw new Error(
        `You must provide an object to ${this.toString()}, not '` +
          typeof this.sample +
          "'."
      );
    }

    if (this.inverse) {
      for (const property in this.sample) {
        if (
          (0, _jasmineUtils.hasProperty)(other, property) &&
          (0, _jasmineUtils.equals)(this.sample[property], other[property]) &&
          !(0, _utils.emptyObject)(this.sample[property]) &&
          !(0, _utils.emptyObject)(other[property])
        ) {
          return false;
        }
      }

      return true;
    } else {
      for (const property in this.sample) {
        if (
          !(0, _jasmineUtils.hasProperty)(other, property) ||
          !(0, _jasmineUtils.equals)(this.sample[property], other[property])
        ) {
          return false;
        }
      }

      return true;
    }
  }

  toString() {
    return `Object${this.inverse ? 'Not' : ''}Containing`;
  }

  getExpectedType() {
    return 'object';
  }
}

class StringContaining extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    if (!(0, _jasmineUtils.isA)('String', sample)) {
      throw new Error('Expected is not a string');
    }

    super(sample);
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    const result =
      (0, _jasmineUtils.isA)('String', other) && other.includes(this.sample);
    return this.inverse ? !result : result;
  }

  toString() {
    return `String${this.inverse ? 'Not' : ''}Containing`;
  }

  getExpectedType() {
    return 'string';
  }
}

class StringMatching extends AsymmetricMatcher {
  constructor(sample, inverse = false) {
    if (
      !(0, _jasmineUtils.isA)('String', sample) &&
      !(0, _jasmineUtils.isA)('RegExp', sample)
    ) {
      throw new Error('Expected is not a String or a RegExp');
    }

    super(new RegExp(sample));
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    const result =
      (0, _jasmineUtils.isA)('String', other) && this.sample.test(other);
    return this.inverse ? !result : result;
  }

  toString() {
    return `String${this.inverse ? 'Not' : ''}Matching`;
  }

  getExpectedType() {
    return 'string';
  }
}

const any = expectedObject => new Any(expectedObject);

exports.any = any;

const anything = () => new Anything();

exports.anything = anything;

const arrayContaining = sample => new ArrayContaining(sample);

exports.arrayContaining = arrayContaining;

const arrayNotContaining = sample => new ArrayContaining(sample, true);

exports.arrayNotContaining = arrayNotContaining;

const objectContaining = sample => new ObjectContaining(sample);

exports.objectContaining = objectContaining;

const objectNotContaining = sample => new ObjectContaining(sample, true);

exports.objectNotContaining = objectNotContaining;

const stringContaining = expected => new StringContaining(expected);

exports.stringContaining = stringContaining;

const stringNotContaining = expected => new StringContaining(expected, true);

exports.stringNotContaining = stringNotContaining;

const stringMatching = expected => new StringMatching(expected);

exports.stringMatching = stringMatching;

const stringNotMatching = expected => new StringMatching(expected, true);

exports.stringNotMatching = stringNotMatching;
