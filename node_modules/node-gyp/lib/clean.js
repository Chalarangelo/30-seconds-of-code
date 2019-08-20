
module.exports = exports = clean

exports.usage = 'Removes any generated build files and the "out" dir'

/**
 * Module dependencies.
 */

var rm = require('rimraf')
var log = require('npmlog')


function clean (gyp, argv, callback) {

  // Remove the 'build' dir
  var buildDir = 'build'

  log.verbose('clean', 'removing "%s" directory', buildDir)
  rm(buildDir, callback)

}
