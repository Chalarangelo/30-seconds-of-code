var util = require('util')
var _ = require('lodash')

var loggerInstance

var defaultProvider = {
  log: console.log,
  debug: console.log, // use .log(); since console does not have .debug()
  info: console.info,
  warn: console.warn,
  error: console.error
}

// log level 'weight'
var LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 50,
  silent: 80
}

module.exports = {
  // singleton
  getInstance: function() {
    if (!loggerInstance) {
      loggerInstance = new Logger()
    }

    return loggerInstance
  },
  getArrow: getArrow
}

function Logger() {
  var logLevel
  var provider

  var api = {
    log: log,
    debug: debug,
    info: info,
    warn: warn,
    error: error,
    setLevel: function(v) {
      if (isValidLevel(v)) {
        logLevel = v
      }
    },
    setProvider: function(fn) {
      if (fn && isValidProvider(fn)) {
        provider = fn(defaultProvider)
      }
    }
  }

  init()

  return api

  function init() {
    api.setLevel('info')
    api.setProvider(function() {
      return defaultProvider
    })
  }

  // log will log messages, regardless of logLevels
  function log() {
    provider.log(_interpolate.apply(null, arguments))
  }

  function debug() {
    if (_showLevel('debug')) {
      provider.debug(_interpolate.apply(null, arguments))
    }
  }

  function info() {
    if (_showLevel('info')) {
      provider.info(_interpolate.apply(null, arguments))
    }
  }

  function warn() {
    if (_showLevel('warn')) {
      provider.warn(_interpolate.apply(null, arguments))
    }
  }

  function error() {
    if (_showLevel('error')) {
      provider.error(_interpolate.apply(null, arguments))
    }
  }

  /**
   * Decide to log or not to log, based on the log levels 'weight'
   * @param  {String}  showLevel [debug, info, warn, error, silent]
   * @return {Boolean}
   */
  function _showLevel(showLevel) {
    var result = false
    var currentLogLevel = LEVELS[logLevel]

    if (currentLogLevel && currentLogLevel <= LEVELS[showLevel]) {
      result = true
    }

    return result
  }

  // make sure logged messages and its data are return interpolated
  // make it possible for additional log data, such date/time or custom prefix.
  function _interpolate() {
    var fn = _.spread(util.format)
    var result = fn(_.slice(arguments))

    return result
  }

  function isValidProvider(fnProvider) {
    var result = true

    if (fnProvider && !_.isFunction(fnProvider)) {
      throw new Error('[HPM] Log provider config error. Expecting a function.')
    }

    return result
  }

  function isValidLevel(levelName) {
    var validLevels = _.keys(LEVELS)
    var isValid = _.includes(validLevels, levelName)

    if (!isValid) {
      throw new Error('[HPM] Log level error. Invalid logLevel.')
    }

    return isValid
  }
}

/**
 * -> normal proxy
 * => router
 * ~> pathRewrite
 * ≈> router + pathRewrite
 *
 * @param  {String} originalPath
 * @param  {String} newPath
 * @param  {String} originalTarget
 * @param  {String} newTarget
 * @return {String}
 */
function getArrow(originalPath, newPath, originalTarget, newTarget) {
  var arrow = ['>']
  var isNewTarget = originalTarget !== newTarget // router
  var isNewPath = originalPath !== newPath // pathRewrite

  if (isNewPath && !isNewTarget) {
    arrow.unshift('~')
  } else if (!isNewPath && isNewTarget) {
    arrow.unshift('=')
  } else if (isNewPath && isNewTarget) {
    arrow.unshift('≈')
  } else {
    arrow.unshift('-')
  }

  return arrow.join('')
}
