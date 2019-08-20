'use strict'

module.exports = function parseOptions (params) {
  if (typeof params.plugins === 'function') {
    params.plugins = params.plugins.call(this, this)
  }

  let plugins

  if (typeof params.plugins === 'undefined') plugins = []
  else if (Array.isArray(params.plugins)) plugins = params.plugins
  else plugins = [ params.plugins ]

  const options = {}

  if (typeof params !== 'undefined') {
    options.parser = params.parser
    options.syntax = params.syntax
    options.stringifier = params.stringifier
  }

  const exec = params && params.exec

  return Promise.resolve({ options: options, plugins: plugins, exec: exec })
}
