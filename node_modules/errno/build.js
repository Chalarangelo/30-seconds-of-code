#!/usr/bin/env node

var request   = require('request')
  , fs        = require('fs')

  , uvheadloc = 'https://raw.github.com/joyent/libuv/master/include/uv.h'
  , defreg    = /^\s*XX\(\s*([\-\d]+),\s*([A-Z]+),\s*"([^"]*)"\s*\)\s*\\?$/


request(uvheadloc, function (err, response) {
  if (err)
    throw err

  var data, out

  data = response.body
    .split('\n')
    .map(function (line) { return line.match(defreg) })
    .filter(function (match) { return match })
    .map(function (match) { return {
        errno: parseInt(match[1], 10)
      , code: match[2]
      , description: match[3]
    }})

  out = 'var all = module.exports.all = ' + JSON.stringify(data, 0, 1) + '\n\n'

  out += '\nmodule.exports.errno = {\n    '
    + data.map(function (e, i) {
        return '\'' + e.errno + '\': all[' + i + ']'
      }).join('\n  , ')
    + '\n}\n\n'

  out += '\nmodule.exports.code = {\n    '
    + data.map(function (e, i) {
        return '\'' + e.code + '\': all[' + i + ']'
      }).join('\n  , ')
    + '\n}\n\n'

  out += '\nmodule.exports.custom = require("./custom")(module.exports)\n'

  fs.writeFile('errno.js', out)
})