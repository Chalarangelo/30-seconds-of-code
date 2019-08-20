var url = require('url')
var tunnel = require('tunnel-agent')
var noop = Object.assign({
  http: function () {},
  silly: function () {}
}, require('noop-logger'))

function applyProxy (reqOpts, opts) {
  var log = opts.log || noop

  var proxy = opts['https-proxy'] || opts.proxy

  if (proxy) {
    var parsedDownloadUrl = url.parse(reqOpts.url)
    var parsedProxy = url.parse(proxy)
    var uriProtocol = (parsedDownloadUrl.protocol === 'https:' ? 'https' : 'http')
    var proxyProtocol = (parsedProxy.protocol === 'https:' ? 'Https' : 'Http')
    var tunnelFnName = [uriProtocol, proxyProtocol].join('Over')
    reqOpts.agent = tunnel[tunnelFnName]({
      proxy: {
        host: parsedProxy.hostname,
        port: +parsedProxy.port,
        proxyAuth: parsedProxy.auth
      }
    })
    log.http('request', 'Proxy setup detected (Host: ' +
    parsedProxy.hostname + ', Port: ' +
      parsedProxy.port + ', Authentication: ' +
      (parsedProxy.auth ? 'Yes' : 'No') + ')' +
      ' Tunneling with ' + tunnelFnName)
  }

  return reqOpts
}

module.exports = applyProxy
