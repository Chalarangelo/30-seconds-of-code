'use strict';

var test = require('tape')
var gyp = require('../lib/node-gyp')

test('options in environment', function (t) {
  t.plan(1)

  // `npm test` dumps a ton of npm_config_* variables in the environment.
  Object.keys(process.env)
        .filter(function(key) { return /^npm_config_/.test(key) })
        .forEach(function(key) { delete process.env[key] })

  // Zero-length keys should get filtered out.
  process.env.npm_config_ = '42'
  // Other keys should get added.
  process.env.npm_config_x = '42'
  // Except loglevel.
  process.env.npm_config_loglevel = 'debug'

  var g = gyp();
  g.parseArgv(['rebuild'])  // Also sets opts.argv.

  t.deepEqual(Object.keys(g.opts).sort(), ['argv', 'x'])
})
