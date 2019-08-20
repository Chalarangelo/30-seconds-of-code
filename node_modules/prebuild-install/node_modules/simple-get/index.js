module.exports = simpleGet

var concat = require('simple-concat')
var http = require('http')
var https = require('https')
var once = require('once')
var querystring = require('querystring')
var decompressResponse = require('decompress-response') // excluded from browser build
var url = require('url')

function simpleGet (opts, cb) {
  opts = typeof opts === 'string' ? {url: opts} : Object.assign({}, opts)
  cb = once(cb)

  opts.headers = Object.assign({}, opts.headers)

  Object.keys(opts.headers).forEach(function (h) {
    if (h.toLowerCase() !== h) {
      opts.headers[h.toLowerCase()] = opts.headers[h]
      delete opts.headers[h]
    }
  })

  if (opts.url) {
    var loc = url.parse(opts.url)
    if (loc.hostname) opts.hostname = loc.hostname
    if (loc.port) opts.port = loc.port
    if (loc.protocol) opts.protocol = loc.protocol
    if (loc.auth) opts.auth = loc.auth
    opts.path = loc.path
    delete opts.url
  }

  if (opts.maxRedirects == null) opts.maxRedirects = 10
  if (opts.method) opts.method = opts.method.toUpperCase()

  var body
  if (opts.body) {
    body = opts.json && !isStream(opts.body) ? JSON.stringify(opts.body) : opts.body
  } else if (opts.form) {
    body = typeof opts.form === 'string' ? opts.form : querystring.stringify(opts.form)
    opts.headers['content-type'] = 'application/x-www-form-urlencoded'
  }
  delete opts.body; delete opts.form

  if (body) {
    if (!opts.method) opts.method = 'POST'
    if (!isStream(body)) opts.headers['content-length'] = Buffer.byteLength(body)
    if (opts.json) opts.headers['content-type'] = 'application/json'
  }

  if (opts.json) opts.headers.accept = 'application/json'
  if (!opts.headers['accept-encoding']) opts.headers['accept-encoding'] = 'gzip, deflate' // Prefer gzip

  var protocol = opts.protocol === 'https:' ? https : http // Support http/https urls
  var req = protocol.request(opts, function (res) {
    if (res.statusCode >= 300 && res.statusCode < 400 && 'location' in res.headers) {
      opts.url = res.headers.location // Follow 3xx redirects
      delete opts.headers.host // Discard `host` header on redirect (see #32)
      res.resume() // Discard response

      if ((res.statusCode === 301 || res.statusCode === 302) && opts.method === 'POST') {
        opts.method = 'GET' // On 301/302 redirect, change POST to GET (see #35)
        delete opts.headers['content-length']
        delete opts.headers['content-type']
      }

      if (opts.maxRedirects === 0) return cb(new Error('too many redirects'))
      opts.maxRedirects -= 1
      return simpleGet(opts, cb)
    }

    var tryUnzip = typeof decompressResponse === 'function' && opts.method !== 'HEAD'
    cb(null, tryUnzip ? decompressResponse(res) : res)
  })
  req.on('timeout', function () {
    req.abort()
    cb(new Error('Request timed out'))
  })
  req.on('error', cb)

  if (body && isStream(body)) body.on('error', cb).pipe(req)
  else req.end(body)

  return req
}

simpleGet.concat = function (opts, cb) {
  return simpleGet(opts, function (err, res) {
    if (err) return cb(err)
    concat(res, function (err, data) {
      if (err) return cb(err)
      if (opts.json) {
        try {
          data = JSON.parse(data.toString())
        } catch (err) {
          return cb(err, res, data)
        }
      }
      cb(null, res, data)
    })
  })
}

;['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(function (method) {
  simpleGet[method] = function (opts, cb) {
    if (typeof opts === 'string') opts = {url: opts}
    opts.method = method.toUpperCase()
    return simpleGet(opts, cb)
  }
})

function isStream (obj) { return typeof obj.pipe === 'function' }
