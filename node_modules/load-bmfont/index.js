var fs = require('fs')
var url = require('url')
var path = require('path')
var request = require('phin')
var parseASCII = require('parse-bmfont-ascii')
var parseXML = require('parse-bmfont-xml')
var readBinary = require('parse-bmfont-binary')
var mime = require('mime')
var noop = function() {}
var isBinary = require('./lib/is-binary')

function parseFont(file, data, cb) {
  var result, binary

  if (isBinary(data)) {
    if (typeof data === 'string') data = new Buffer(data, 'binary')
    binary = true
  } else data = data.toString().trim()

  try {
    if (binary) result = readBinary(data)
    else if (/json/.test(mime.lookup(file)) || data.charAt(0) === '{')
      result = JSON.parse(data)
    else if (/xml/.test(mime.lookup(file)) || data.charAt(0) === '<')
      result = parseXML(data)
    else result = parseASCII(data)
  } catch (e) {
    cb(e)
    cb = noop
  }

  cb(null, result)
}

module.exports = function loadFont(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop

  if (typeof opt === 'string') opt = { uri: opt, url: opt }
  else if (!opt) opt = {}

  var file = opt.uri || opt.url
  
  function handleData(err, data) {
    if (err) return cb(err)
    parseFont(file, data.body || data, cb)
  }

  if (url.parse(file).host) {
    request(opt, handleData)
  } else {
    fs.readFile(file, opt, handleData)
  }
}
