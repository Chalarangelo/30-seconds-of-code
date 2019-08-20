/*!
 * global-modules <https://github.com/jonschlinkert/global-modules>
 *
 * Copyright (c) 2015-2017 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var prefix = require('global-prefix');
var isWindows = require('is-windows');
var gm;

function getPath() {
  if (isWindows()) {
    return path.resolve(prefix, 'node_modules');
  }
  return path.resolve(prefix, 'lib/node_modules');
}

/**
 * Expose `global-modules` path
 */

Object.defineProperty(module, 'exports', {
  enumerable: true,
  get: function() {
    return gm || (gm = getPath());
  }
});
