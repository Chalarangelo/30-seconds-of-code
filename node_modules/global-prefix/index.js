/*!
 * global-prefix <https://github.com/jonschlinkert/global-prefix>
 *
 * Copyright (c) 2015-2017 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var expand = require('expand-tilde');
var homedir = require('homedir-polyfill');
var ini = require('ini');
var prefix;

function getPrefix() {
  if (process.env.PREFIX) {
    prefix = process.env.PREFIX;
  } else {
    // Start by checking if the global prefix is set by the user
    var home = homedir();
    if (home) {
      // homedir() returns undefined if $HOME not set; path.resolve requires strings
      var userConfig = path.resolve(home, '.npmrc');
      prefix = tryConfigPath(userConfig);
    }

    if (!prefix) {
      // Otherwise find the path of npm
      var npm = tryNpmPath();
      if (npm) {
        // Check the built-in npm config file
        var builtinConfig = path.resolve(npm, '..', '..', 'npmrc');
        prefix = tryConfigPath(builtinConfig);

        if (prefix) {
          // Now the global npm config can also be checked.
          var globalConfig = path.resolve(prefix, 'etc', 'npmrc');
          prefix = tryConfigPath(globalConfig) || prefix;
        }
      }

      if (!prefix) fallback();
    }
  }

  if (prefix) {
    return expand(prefix);
  }
}

function fallback() {
  var isWindows = require('is-windows');
  if (isWindows()) {
    // c:\node\node.exe --> prefix=c:\node\
    prefix = process.env.APPDATA
      ? path.join(process.env.APPDATA, 'npm')
      : path.dirname(process.execPath);
  } else {
    // /usr/local/bin/node --> prefix=/usr/local
    prefix = path.dirname(path.dirname(process.execPath));

    // destdir only is respected on Unix
    if (process.env.DESTDIR) {
      prefix = path.join(process.env.DESTDIR, prefix);
    }
  }
}

function tryNpmPath() {
  try {
    return fs.realpathSync(require('which').sync('npm'));
  } catch (err) {}
  return null;
}

function tryConfigPath(configPath) {
  try {
    var data = fs.readFileSync(configPath, 'utf-8');
    var config = ini.parse(data);
    if (config.prefix) return config.prefix;
  } catch (err) {}
  return null;
}

/**
 * Expose `prefix`
 */

Object.defineProperty(module, 'exports', {
  enumerable: true,
  get: function() {
    return prefix || (prefix = getPrefix());
  }
});
