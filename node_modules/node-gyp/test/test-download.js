'use strict'

var fs = require('fs')
var http = require('http')
var https = require('https')
var test = require('tape')
var install = require('../lib/install')

test('download over http', function (t) {
  t.plan(2)

  var server = http.createServer(function (req, res) {
    t.strictEqual(req.headers['user-agent'],
                  'node-gyp v42 (node ' + process.version + ')')
    res.end('ok')
    server.close()
  })

  var host = '127.0.0.1'
  server.listen(0, host, function () {
    var port = this.address().port
    var gyp = {
      opts: {},
      version: '42',
    }
    var url = 'http://' + host + ':' + port
    var req = install.test.download(gyp, {}, url)
    req.on('response', function (res) {
      var body = ''
      res.setEncoding('utf8')
      res.on('data', function(data) {
        body += data
      })
      res.on('end', function() {
        t.strictEqual(body, 'ok')
      })
    })
  })
})

test('download over https with custom ca', function (t) {
  t.plan(3)

  var cert = fs.readFileSync(__dirname + '/fixtures/server.crt', 'utf8')
  var key = fs.readFileSync(__dirname + '/fixtures/server.key', 'utf8')

  var cafile = __dirname + '/fixtures/ca.crt'
  var ca = install.test.readCAFile(cafile)
  t.strictEqual(ca.length, 1)

  var options = { ca: ca, cert: cert, key: key }
  var server = https.createServer(options, function (req, res) {
    t.strictEqual(req.headers['user-agent'],
                  'node-gyp v42 (node ' + process.version + ')')
    res.end('ok')
    server.close()
  })

  server.on('clientError', function (err) {
    throw err
  })

  var host = '127.0.0.1'
  server.listen(8000, host, function () {
    var port = this.address().port
    var gyp = {
      opts: { cafile: cafile },
      version: '42',
    }
    var url = 'https://' + host + ':' + port
    var req = install.test.download(gyp, {}, url)
    req.on('response', function (res) {
      var body = ''
      res.setEncoding('utf8')
      res.on('data', function(data) {
        body += data
      })
      res.on('end', function() {
        t.strictEqual(body, 'ok')
      })
    })
  })
})

test('download with missing cafile', function (t) {
  t.plan(1)
  var gyp = {
    opts: { cafile: 'no.such.file' },
  }
  try {
    install.test.download(gyp, {}, 'http://bad/')
  } catch (e) {
    t.ok(/no.such.file/.test(e.message))
  }
})

test('check certificate splitting', function (t) {
  var cas = install.test.readCAFile(__dirname + '/fixtures/ca-bundle.crt')
  t.plan(2)
  t.strictEqual(cas.length, 2)
  t.notStrictEqual(cas[0], cas[1])
})
