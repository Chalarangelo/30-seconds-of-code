// These tests are taken from http-browserify to ensure compatibility with
// that module
var test = require('tape')
var url = require('url')

var location = 'http://localhost:8081/foo/123'

var noop = function() {}
global.location = url.parse(location)
global.XMLHttpRequest = function() {
	this.open = noop
	this.send = noop
	this.withCredentials = false
}

var moduleName = require.resolve('../../')
delete require.cache[moduleName]
var http = require('../../')

test('Make sure http object has correct properties', function (t) {
	t.ok(http.Agent, 'Agent defined')
	t.ok(http.ClientRequest, 'ClientRequest defined')
	t.ok(http.ClientRequest.prototype, 'ClientRequest.prototype defined')
	t.ok(http.IncomingMessage, 'IncomingMessage defined')
	t.ok(http.IncomingMessage.prototype, 'IncomingMessage.prototype defined')
	t.ok(http.METHODS, 'METHODS defined')
	t.ok(http.STATUS_CODES, 'STATUS_CODES defined')
	t.ok(http.get, 'get defined')
	t.ok(http.globalAgent, 'globalAgent defined')
	t.ok(http.request, 'request defined')
	t.end()
})

test('Test simple url string', function(t) {
	var testUrl = { path: '/api/foo' }
	var request = http.get(testUrl, noop)

	var resolved = url.resolve(location, request._opts.url)
	t.equal(resolved, 'http://localhost:8081/api/foo', 'Url should be correct')
	t.end()

})

test('Test full url object', function(t) {
	var testUrl = {
		host: "localhost:8081",
		hostname: "localhost",
		href: "http://localhost:8081/api/foo?bar=baz",
		method: "GET",
		path: "/api/foo?bar=baz",
		pathname: "/api/foo",
		port: "8081",
		protocol: "http:",
		query: "bar=baz",
		search: "?bar=baz",
		slashes: true
	}

	var request = http.get(testUrl, noop)

	var resolved = url.resolve(location, request._opts.url)
	t.equal(resolved, 'http://localhost:8081/api/foo?bar=baz', 'Url should be correct')
	t.end()
})

test('Test alt protocol', function(t) {
	var params = {
		protocol: "foo:",
		hostname: "localhost",
		port: "3000",
		path: "/bar"
	}

	var request = http.get(params, noop)

	var resolved = url.resolve(location, request._opts.url)
	t.equal(resolved, 'foo://localhost:3000/bar', 'Url should be correct')
	t.end()
})

test('Test page with \'file:\' protocol', function (t) {
	var params = {
		hostname: 'localhost',
		port: 3000,
		path: '/bar'
	}

	var fileLocation = 'file:///home/me/stuff/index.html'

	var normalLocation = global.location
	global.location = url.parse(fileLocation) // Temporarily change the location
	var request = http.get(params, noop)
	global.location = normalLocation // Reset the location

	var resolved = url.resolve(fileLocation, request._opts.url)
	t.equal(resolved, 'http://localhost:3000/bar', 'Url should be correct')
	t.end()
})

test('Test string as parameters', function(t) {
	var testUrl = '/api/foo'
	var request = http.get(testUrl, noop)

	var resolved = url.resolve(location, request._opts.url)
	t.equal(resolved, 'http://localhost:8081/api/foo', 'Url should be correct')
	t.end()
})

test('Test withCredentials param', function(t) {
	var url = '/api/foo'

	var request = http.get({ url: url, withCredentials: false }, noop)
	t.equal(request._xhr.withCredentials, false, 'xhr.withCredentials should be false')

	var request = http.get({ url: url, withCredentials: true }, noop)
	t.equal(request._xhr.withCredentials, true, 'xhr.withCredentials should be true')

	var request = http.get({ url: url }, noop)
	t.equal(request._xhr.withCredentials, false, 'xhr.withCredentials should be false')

	t.end()
})

test('Test ipv6 address', function(t) {
	var testUrl = 'http://[::1]:80/foo'
	var request = http.get(testUrl, noop)

	var resolved = url.resolve(location, request._opts.url)
	t.equal(resolved, 'http://[::1]:80/foo', 'Url should be correct')
	t.end()
})

test('Test relative path in url', function(t) {
	var params = { path: './bar' }
	var request = http.get(params, noop)

	var resolved = url.resolve(location, request._opts.url)
	t.equal(resolved, 'http://localhost:8081/foo/bar', 'Url should be correct')
	t.end()
})

test('Cleanup', function (t) {
	delete global.location
	delete global.XMLHttpRequest
	delete require.cache[moduleName]
	t.end()
})
