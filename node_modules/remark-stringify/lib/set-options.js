'use strict';

var xtend = require('xtend');
var encode = require('stringify-entities');
var defaults = require('./defaults');
var escapeFactory = require('./escape');
var returner = require('./util/returner');

module.exports = setOptions;

/* Map of applicable enum's. */
var maps = {
  entities: {true: true, false: true, numbers: true, escape: true},
  bullet: {'*': true, '-': true, '+': true},
  rule: {'-': true, _: true, '*': true},
  listItemIndent: {tab: true, mixed: true, 1: true},
  emphasis: {_: true, '*': true},
  strong: {_: true, '*': true},
  fence: {'`': true, '~': true}
};

/* Expose `validate`. */
var validate = {
  boolean: validateBoolean,
  string: validateString,
  number: validateNumber,
  function: validateFunction
};

/* Set options.  Does not overwrite previously set
 * options. */
function setOptions(options) {
  var self = this;
  var current = self.options;
  var ruleRepetition;
  var key;

  if (options == null) {
    options = {};
  } else if (typeof options === 'object') {
    options = xtend(options);
  } else {
    throw new Error('Invalid value `' + options + '` for setting `options`');
  }

  for (key in defaults) {
    validate[typeof defaults[key]](options, key, current[key], maps[key]);
  }

  ruleRepetition = options.ruleRepetition;

  if (ruleRepetition && ruleRepetition < 3) {
    raise(ruleRepetition, 'options.ruleRepetition');
  }

  self.encode = encodeFactory(String(options.entities));
  self.escape = escapeFactory(options);

  self.options = options;

  return self;
}

/* Throw an exception with in its `message` `value`
 * and `name`. */
function raise(value, name) {
  throw new Error('Invalid value `' + value + '` for setting `' + name + '`');
}

/* Validate a value to be boolean. Defaults to `def`.
 * Raises an exception with `context[name]` when not
 * a boolean. */
function validateBoolean(context, name, def) {
  var value = context[name];

  if (value == null) {
    value = def;
  }

  if (typeof value !== 'boolean') {
    raise(value, 'options.' + name);
  }

  context[name] = value;
}

/* Validate a value to be boolean. Defaults to `def`.
 * Raises an exception with `context[name]` when not
 * a boolean. */
function validateNumber(context, name, def) {
  var value = context[name];

  if (value == null) {
    value = def;
  }

  if (isNaN(value)) {
    raise(value, 'options.' + name);
  }

  context[name] = value;
}

/* Validate a value to be in `map`. Defaults to `def`.
 * Raises an exception with `context[name]` when not
 * in `map`. */
function validateString(context, name, def, map) {
  var value = context[name];

  if (value == null) {
    value = def;
  }

  value = String(value);

  if (!(value in map)) {
    raise(value, 'options.' + name);
  }

  context[name] = value;
}

/* Validate a value to be function. Defaults to `def`.
 * Raises an exception with `context[name]` when not
 * a function. */
function validateFunction(context, name, def) {
  var value = context[name];

  if (value == null) {
    value = def;
  }

  if (typeof value !== 'function') {
    raise(value, 'options.' + name);
  }

  context[name] = value;
}

/* Factory to encode HTML entities.
 * Creates a no-operation function when `type` is
 * `'false'`, a function which encodes using named
 * references when `type` is `'true'`, and a function
 * which encodes using numbered references when `type` is
 * `'numbers'`. */
function encodeFactory(type) {
  var options = {};

  if (type === 'false') {
    return returner;
  }

  if (type === 'true') {
    options.useNamedReferences = true;
  }

  if (type === 'escape') {
    options.escapeOnly = true;
    options.useNamedReferences = true;
  }

  return wrapped;

  /* Encode HTML entities using the bound options. */
  function wrapped(value) {
    return encode(value, options);
  }
}
