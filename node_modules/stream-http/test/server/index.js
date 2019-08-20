var cookieParser = require('cookie-parser')
var basicAuth = require('basic-auth')
var express = require('express')
var fs = require('fs')
var http = require('http')
var path = require('path')
var url = require('url')

var app = express()
var server = http.createServer(app)

// Otherwise, use 'application/octet-stream'
var copiesMimeTypes = {
	'/basic.txt': 'text/plain'
}

var maxDelay = 5000 // ms

// This should make sure bodies aren't cached
// so the streaming tests always pass
app.use(function (req, res, next) {
	res.setHeader('Cache-Control', 'no-store')
	next()
})

app.get('/testHeaders', function (req, res) {
	var parsed = url.parse(req.url, true)

	// Values in query parameters are sent as response headers
	Object.keys(parsed.query).forEach(function (key) {
		res.setHeader('Test-' + key, parsed.query[key])
	})

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 'no-cache')

	// Request headers are sent in the body as json
	var reqHeaders = {}
	Object.keys(req.headers).forEach(function (key) {
		key = key.toLowerCase()
		if (key.indexOf('test-') === 0) {
			// different browsers format request headers with multiple values
			// slightly differently, so normalize
			reqHeaders[key] = req.headers[key].replace(', ', ',')
		}
	})

	var body = JSON.stringify(reqHeaders)
	res.setHeader('Content-Length', body.length)
	res.write(body)
	res.end()
})

app.get('/cookie', cookieParser(), function (req, res) {
	res.setHeader('Content-Type', 'text/plain')
	res.write('hello=' + req.cookies.hello)
	res.end()
})

app.get('/auth', function (req, res) {
	var user = basicAuth(req)

	if (!user || user.name !== 'TestUser' || user.pass !== 'trustno1') {
		res.setHeader('WWW-Authenticate', 'Basic realm="example"')
		res.end('Access denied')
	} else {
		res.setHeader('Content-Type', 'text/plain')
		res.write('You\'re in!')
		res.end()
	}
})

app.post('/echo', function (req, res) {
	res.setHeader('Content-Type', 'application/octet-stream')
	req.pipe(res)
})

app.use('/verifyEmpty', function (req, res) {
	var empty = true
	req.on('data', function (buf) {
		if (buf.length > 0) {
			empty = false
		}
	})
	req.on('end', function () {
		res.setHeader('Content-Type', 'text/plain')

		if (empty) {
			res.end('empty')
		} else {
			res.end('not empty')
		}
	})
})

app.use(function (req, res, next) {
	var parsed = url.parse(req.url, true)

	if ('copies' in parsed.query) {
		var totalCopies = parseInt(parsed.query.copies, 10)
		function fail () {
			res.statusCode = 500
			res.end()
		}
		fs.readFile(path.join(__dirname, 'static', parsed.pathname), function (err, data) {
			if (err)
				return fail()

			var mimeType = copiesMimeTypes[parsed.pathname] || 'application/octet-stream'
			res.setHeader('Content-Type', mimeType)
			res.setHeader('Content-Length', data.length * totalCopies)
			var pieceDelay = maxDelay / totalCopies
			if (pieceDelay > 100)
				pieceDelay = 100

			function write (copies) {
				if (copies === 0) 
					return res.end()

				res.write(data, function (err) {
					if (err)
						return fail()
					setTimeout(write.bind(null, copies - 1), pieceDelay)
				})
			}
			write(totalCopies)
		})
		return
	}
	next()
})

app.use(express.static(path.join(__dirname, 'static')))

var port = parseInt(process.env.AIRTAP_PORT) || 8199
console.log('Test server listening on port', port)
server.listen(port)
