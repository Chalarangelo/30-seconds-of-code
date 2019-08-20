/*!
 * babel-extract-comments <https://github.com/jonschlinkert/babel-extract-comments>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const babylon = require('babylon');

/**
 * Extract code comments from the given `string`.
 *
 * ```js
 * var extract = require('babel-extract-comments');
 * console.log(extract('// this is a code comment'));
 * // [{ type: 'CommentBlock',
 * //  value: '!\n * babel-extract-comments <https://github.com/jonschlinkert/babel-extract-comments>\n *\n *
 * // Copyright (c) 2014-2018, Jon Schlinkert.\n * Released under the MIT License.\n ',
 * //   start: 0,
 * //   end: 173,
 * //   loc: SourceLocation { start: [Position], end: [Position] } }]
 * ```
 * @param  {String} `string` String of javascript
 * @return {Array} Array of code comment objects.
 * @api public
 */

function extract(str, options) {
  const res = babylon.parse(str, options);
  return res.comments;
}

/**
 * Extract code comments from a JavaScript file.
 *
 * ```js
 * console.log(extract.file('some-file.js'), { cwd: 'some/path' });
 * // [ { type: 'Line',
 * //     value: ' this is a line comment',
 * //     range: [ 0, 25 ],
 * //     loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 25 } } } ]
 * ```
 * @param  {String} `file` Filepath to the file to parse.
 * @param  {Object} `options` Options to pass to [esprima][].
 * @return {Array} Array of code comment objects.
 * @api public
 */

extract.file = function(file, options) {
  const opts = Object.assign({ cwd: process.cwd() }, options);
  const str = fs.readFileSync(path.resolve(opts.cwd, file), 'utf8');
  return extract(str, options);
};

/**
 * Expose `extract`
 */

module.exports = extract;
