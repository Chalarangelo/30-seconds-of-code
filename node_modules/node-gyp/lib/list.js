
module.exports = exports = list

exports.usage = 'Prints a listing of the currently installed node development files'

/**
 * Module dependencies.
 */

var fs = require('graceful-fs')
  , path = require('path')
  , log = require('npmlog')

function list (gyp, args, callback) {

  var devDir = gyp.devDir
  log.verbose('list', 'using node-gyp dir:', devDir)

  // readdir() the node-gyp dir
  fs.readdir(devDir, onreaddir)

  function onreaddir (err, versions) {
    if (err && err.code != 'ENOENT') {
      return callback(err)
    }
    if (Array.isArray(versions)) {
      versions = versions.filter(function (v) { return v != 'current' })
    } else {
      versions = []
    }
    callback(null, versions)
  }
}
