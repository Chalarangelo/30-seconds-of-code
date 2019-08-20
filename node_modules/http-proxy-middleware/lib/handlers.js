var _ = require('lodash')
var logger = require('./logger').getInstance()

module.exports = {
  init: init,
  getHandlers: getProxyEventHandlers
}

function init(proxy, opts) {
  var handlers = getProxyEventHandlers(opts)

  _.forIn(handlers, function(handler, eventName) {
    proxy.on(eventName, handlers[eventName])
  })

  logger.debug('[HPM] Subscribed to http-proxy events: ', _.keys(handlers))
}

function getProxyEventHandlers(opts) {
  // https://github.com/nodejitsu/node-http-proxy#listening-for-proxy-events
  var proxyEvents = [
    'error',
    'proxyReq',
    'proxyReqWs',
    'proxyRes',
    'open',
    'close'
  ]
  var handlers = {}

  _.forEach(proxyEvents, function(event) {
    // all handlers for the http-proxy events are prefixed with 'on'.
    // loop through options and try to find these handlers
    // and add them to the handlers object for subscription in init().
    var eventName = _.camelCase('on ' + event)
    var fnHandler = _.get(opts, eventName)

    if (_.isFunction(fnHandler)) {
      handlers[event] = fnHandler
    }
  })

  // add default error handler in absence of error handler
  if (!_.isFunction(handlers.error)) {
    handlers.error = defaultErrorHandler
  }

  // add default close handler in absence of close handler
  if (!_.isFunction(handlers.close)) {
    handlers.close = logClose
  }

  return handlers
}

function defaultErrorHandler(err, req, res) {
  var host = req.headers && req.headers.host
  var code = err.code

  if (res.writeHead && !res.headersSent) {
    if (/HPE_INVALID/.test(code)) {
      res.writeHead(502)
    } else {
      switch (code) {
        case 'ECONNRESET':
        case 'ENOTFOUND':
        case 'ECONNREFUSED':
          res.writeHead(504)
          break
        default:
          res.writeHead(500)
      }
    }
  }

  res.end('Error occured while trying to proxy to: ' + host + req.url)
}

function logClose(req, socket, head) {
  // view disconnected websocket connections
  logger.info('[HPM] Client disconnected')
}
