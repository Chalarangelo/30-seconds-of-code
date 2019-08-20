var resolve = require('resolve')
  , path = require('path')

var log = require('debug')('eslint-plugin-import:resolver:node')

exports.interfaceVersion = 2

exports.resolve = function (source, file, config) {
  log('Resolving:', source, 'from:', file)
  var resolvedPath

  if (resolve.isCore(source)) {
    log('resolved to core')
    return { found: true, path: null }
  }

  try {
    resolvedPath = resolve.sync(source, opts(file, config))
    log('Resolved to:', resolvedPath)
    return { found: true, path: resolvedPath }
  } catch (err) {
    log('resolve threw error:', err)
    return { found: false }
  }
}

function opts(file, config) {
  return Object.assign({
      // more closely matches Node (#333)
      // plus 'mjs' for native modules! (#939)
      extensions: ['.mjs', '.js', '.json'],
    },
    config,
    {
      // path.resolve will handle paths relative to CWD
      basedir: path.dirname(path.resolve(file)),
      packageFilter: packageFilter,

    })
}

function packageFilter(pkg) {
  if (pkg['jsnext:main']) {
    pkg['main'] = pkg['jsnext:main']
  }
  return pkg
}
