/*!
 * strip-comments <https://github.com/jonschlinkert/strip-comments>
 *
 * Copyright (c) 2014-2016, 2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const assign = Object.assign;
const extract = require('babel-extract-comments');

/**
 * Strip all code comments from the given `input`, including protected
 * comments that start with `!`, unless disabled by setting `options.keepProtected`
 * to true.
 *
 * ```js
 * const str = strip('const foo = "bar";// this is a comment\n /* me too *\/');
 * console.log(str);
 * // => 'const foo = "bar";'
 * ```
 * @name  strip
 * @param  {String} `input` string from which to strip comments
 * @param  {Object} `options` optional options, passed to [extract-comments][extract-comments]
 * @option {Boolean} [options] `line` if `false` strip only block comments, default `true`
 * @option {Boolean} [options] `block` if `false` strip only line comments, default `true`
 * @option {Boolean} [options] `keepProtected` Keep ignored comments (e.g. `/*!` and `//!`)
 * @option {Boolean} [options] `preserveNewlines` Preserve newlines after comments are stripped
 * @return {String} modified input
 * @api public
 */

function strip(input, options) {
  return stripComments(input, assign({ block: true, line: true }, options));
}

/**
 * Strip only block comments.
 *
 * ```js
 * const strip = require('..');
 * const str = strip.block('const foo = "bar";// this is a comment\n /* me too *\/');
 * console.log(str);
 * // => 'const foo = "bar";// this is a comment'
 * ```
 * @name  .block
 * @param  {String} `input` string from which to strip comments
 * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `/*!`)
 * @return {String} modified string
 * @api public
 */

strip.block = function(input, options) {
  return stripComments(input, assign({ block: true }, options));
};

/**
 * Strip only line comments.
 *
 * ```js
 * const str = strip.line('const foo = "bar";// this is a comment\n /* me too *\/');
 * console.log(str);
 * // => 'const foo = "bar";\n/* me too *\/'
 * ```
 * @name  .line
 * @param  {String} `input` string from which to strip comments
 * @param  {Object} `options` pass `opts.keepProtected: true` to keep ignored comments (e.g. `//!`)
 * @return {String} modified string
 * @api public
 */

strip.line = function(input, options) {
  return stripComments(input, assign({ line: true }, options));
};

/**
 * Strip the first comment from the given `input`. Or, if `opts.keepProtected` is true,
 * the first non-protected comment will be stripped.
 *
 * ```js
 * const output = strip.first(input, { keepProtected: true });
 * console.log(output);
 * // => '//! first comment\nfoo; '
 * ```
 * @name .first
 * @param {String} `input`
 * @param {Object} `options` pass `opts.keepProtected: true` to keep comments with `!`
 * @return {String}
 * @api public
 */

strip.first = function(input, options) {
  const opts = assign({ block: true, line: true, first: true }, options);
  return stripComments(input, opts);
};

/**
 * Strip comments
 */

function stripComments(input, options) {
  if (typeof input !== 'string') {
    throw new TypeError('expected a string');
  }

  // strip all by default, including `ingored` comments.
  const defaults = {
    // we shouldn't care about this here since our goal is to strip comments,
    // not transpiling, and this has been a common cause of parsing issues
    allowReturnOutsideFunction: true,
    block: false,
    line: false,
    safe: false,
    first: false,
    plugins: []
  };

  const opts = assign({}, defaults, options);
  opts.plugins.push('objectRestSpread');

  if (typeof opts.keepProtected !== 'boolean') {
    opts.keepProtected = opts.safe;
  }

  try {
    const comments = extract(input, opts);
    let pos = { start: 0, end: 0, removed: 0 };
    if (!comments) return input;

    for (const comment of comments) {
      if (typeof opts.filter === 'function' && opts.filter(comment, opts) === false) {
        continue;
      }

      input = remove(input, comment, opts, pos);

      if (opts.first === true && !isProtected(comment, opts)) {
        break;
      }
    }
  } catch (err) {
    if (options.silent !== true) {
      throw err;
    }
  }
  return input;
}

/**
 * Remove a single comment from the given string.
 */

function remove(str, comment, options, pos) {
  let nl = '';

  if (isProtected(comment, options)) {
    return str;
  }

  if (options && options.preserveNewlines) {
    nl = comment.value.replace(/[^\r\n]/g, '');
  }

  if (comment.type === 'CommentLine' && options.line === true) {
    const before = str.slice(0, comment.start - pos.removed);
    const after = str.slice(comment.end - pos.removed);
    pos.removed += comment.end - comment.start - nl.length;
    return before + nl + after;
  }

  if (comment.type === 'CommentBlock' && options.block === true) {
    const before = str.slice(0, comment.start - pos.removed);
    const after = str.slice(comment.end - pos.removed);
    pos.removed += comment.end - comment.start - nl.length;
    return before + nl + after;
  }

  return str;
}

function isProtected(comment, options) {
  return options && options.keepProtected === true && /^\*?!/.test(comment.value);
}

module.exports = strip;
