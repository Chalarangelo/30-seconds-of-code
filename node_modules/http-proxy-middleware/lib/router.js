var _ = require('lodash')
var logger = require('./logger.js').getInstance()

module.exports = {
  getTarget: getTarget
}

function getTarget(req, config) {
  var newTarget
  var router = config.router

  if (_.isPlainObject(router)) {
    newTarget = getTargetFromProxyTable(req, router)
  } else if (_.isFunction(router)) {
    newTarget = router(req)
  }

  return newTarget
}

function getTargetFromProxyTable(req, table) {
  var result
  var host = req.headers.host
  var path = req.url

  var hostAndPath = host + path

  _.forIn(table, function(value, key) {
    if (containsPath(key)) {
      if (hostAndPath.indexOf(key) > -1) {
        // match 'localhost:3000/api'
        result = table[key]
        logger.debug('[HPM] Router table match: "%s"', key)
        return false
      }
    } else {
      if (key === host) {
        // match 'localhost:3000'
        result = table[key]
        logger.debug('[HPM] Router table match: "%s"', host)
        return false
      }
    }
  })

  return result
}

function containsPath(v) {
  return v.indexOf('/') > -1
}
