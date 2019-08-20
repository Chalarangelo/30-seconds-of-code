var path = require('path')
  , log = require('npmlog')

function findNodeDirectory(scriptLocation, processObj) {
  // set dirname and process if not passed in
  // this facilitates regression tests
  if (scriptLocation === undefined) {
    scriptLocation = __dirname
  }
  if (processObj === undefined) {
    processObj = process
  }

  // Have a look to see what is above us, to try and work out where we are
  npm_parent_directory = path.join(scriptLocation, '../../../..')
  log.verbose('node-gyp root', 'npm_parent_directory is '
              + path.basename(npm_parent_directory))
  node_root_dir = ""

  log.verbose('node-gyp root', 'Finding node root directory')
  if (path.basename(npm_parent_directory) === 'deps') {
    // We are in a build directory where this script lives in
    // deps/npm/node_modules/node-gyp/lib
    node_root_dir = path.join(npm_parent_directory, '..')
    log.verbose('node-gyp root', 'in build directory, root = '
                + node_root_dir)
  } else if (path.basename(npm_parent_directory) === 'node_modules') {
    // We are in a node install directory where this script lives in
    // lib/node_modules/npm/node_modules/node-gyp/lib or
    // node_modules/npm/node_modules/node-gyp/lib depending on the
    // platform
    if (processObj.platform === 'win32') {
      node_root_dir = path.join(npm_parent_directory, '..')
    } else {
      node_root_dir = path.join(npm_parent_directory, '../..')
    }
    log.verbose('node-gyp root', 'in install directory, root = '
                + node_root_dir)
  } else {
    // We don't know where we are, try working it out from the location
    // of the node binary
    var node_dir = path.dirname(processObj.execPath)
    var directory_up = path.basename(node_dir)
    if (directory_up === 'bin') {
      node_root_dir = path.join(node_dir, '..')
    } else if (directory_up === 'Release' || directory_up === 'Debug') {
      // If we are a recently built node, and the directory structure
      // is that of a repository. If we are on Windows then we only need
      // to go one level up, everything else, two
      if (processObj.platform === 'win32') {
        node_root_dir = path.join(node_dir, '..')
      } else {
        node_root_dir = path.join(node_dir, '../..')
      }
    }
    // Else return the default blank, "".
  }
  return node_root_dir
}

module.exports = findNodeDirectory
