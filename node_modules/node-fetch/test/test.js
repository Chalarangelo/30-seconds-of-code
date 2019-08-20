
// test tools
var chai = require('chai');
var cap = require('chai-as-promised');
chai.use(cap);
var expect = chai.expect;
var bluebird = require('bluebird');
var then = require('promise');
var spawn = require('child_process').spawn;
var stream = require('stream');
var resumer = require('resumer');
var FormData = require('form-data');
var http = require('http');
var fs = require('fs');

var TestServer = require('./server');

// test subjects
var fetch = require('../index.js');
var Headers = require('../lib/headers.js');
var Response = require('../lib/response.js');
var Request = require('../lib/request.js');
var Body = require('../lib/body.js');
var FetchError = require('../lib/fetch-error.js');
// test with native promise on node 0.11, and bluebird for node 0.10
fetch.Promise = fetch.Promise || bluebird;

var url, opts, local, base;

describe('node-fetch', function() {

	before(function(done) {
		local = new TestServer();
		base = 'http://' + local.hostname + ':' + local.port;
		local.start(done);
	});

	after(function(done) {
		local.stop(done);
	});

	it('should return a promise', function() {
		url = 'http://example.com/';
		var p = fetch(url);
		expect(p).to.be.an.instanceof(fetch.Promise);
		expect(p).to.have.property('then');
	});

	it('should allow custom promise', function() {
		url = 'http://example.com/';
		var old = fetch.Promise;
		fetch.Promise = then;
		expect(fetch(url)).to.be.an.instanceof(then);
		expect(fetch(url)).to.not.be.an.instanceof(bluebird);
		fetch.Promise = old;
	});

	it('should throw error when no promise implementation are found', function() {
		url = 'http://example.com/';
		var old = fetch.Promise;
		fetch.Promise = undefined;
		expect(function() {
			fetch(url)
		}).to.throw(Error);
		fetch.Promise = old;
	});

	it('should expose Headers, Response and Request constructors', function() {
		expect(fetch.Headers).to.equal(Headers);
		expect(fetch.Response).to.equal(Response);
		expect(fetch.Request).to.equal(Request);
	});

	it('should reject with error if url is protocol relative', function() {
		url = '//example.com/';
		return expect(fetch(url)).to.eventually.be.rejectedWith(Error);
	});

	it('should reject with error if url is relative path', function() {
		url = '/some/path';
		return expect(fetch(url)).to.eventually.be.rejectedWith(Error);
	});

	it('should reject with error if protocol is unsupported', function() {
		url = 'ftp://example.com/';
		return expect(fetch(url)).to.eventually.be.rejectedWith(Error);
	});

	it('should reject with error on network failure', function() {
		url = 'http://localhost:50000/';
		return expect(fetch(url)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.include({ type: 'system', code: 'ECONNREFUSED', errno: 'ECONNREFUSED' });
	});

	it('should resolve into response', function() {
		url = base + '/hello';
		return fetch(url).then(function(res) {
			expect(res).to.be.an.instanceof(Response);
			expect(res.headers).to.be.an.instanceof(Headers);
			expect(res.body).to.be.an.instanceof(stream.Transform);
			expect(res.bodyUsed).to.be.false;

			expect(res.url).to.equal(url);
			expect(res.ok).to.be.true;
			expect(res.status).to.equal(200);
			expect(res.statusText).to.equal('OK');
		});
	});

	it('should accept plain text response', function() {
		url = base + '/plain';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(res.bodyUsed).to.be.true;
				expect(result).to.be.a('string');
				expect(result).to.equal('text');
			});
		});
	});

	it('should accept html response (like plain text)', function() {
		url = base + '/html';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/html');
			return res.text().then(function(result) {
				expect(res.bodyUsed).to.be.true;
				expect(result).to.be.a('string');
				expect(result).to.equal('<html></html>');
			});
		});
	});

	it('should accept json response', function() {
		url = base + '/json';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('application/json');
			return res.json().then(function(result) {
				expect(res.bodyUsed).to.be.true;
				expect(result).to.be.an('object');
				expect(result).to.deep.equal({ name: 'value' });
			});
		});
	});

	it('should send request with custom headers', function() {
		url = base + '/inspect';
		opts = {
			headers: { 'x-custom-header': 'abc' }
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.headers['x-custom-header']).to.equal('abc');
		});
	});

	it('should accept headers instance', function() {
		url = base + '/inspect';
		opts = {
			headers: new Headers({ 'x-custom-header': 'abc' })
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.headers['x-custom-header']).to.equal('abc');
		});
	});

	it('should accept custom host header', function() {
		url = base + '/inspect';
		opts = {
			headers: {
				host: 'example.com'
			}
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.headers['host']).to.equal('example.com');
		});
	});

	it('should follow redirect code 301', function() {
		url = base + '/redirect/301';
		return fetch(url).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
			expect(res.ok).to.be.true;
		});
	});

	it('should follow redirect code 302', function() {
		url = base + '/redirect/302';
		return fetch(url).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
		});
	});

	it('should follow redirect code 303', function() {
		url = base + '/redirect/303';
		return fetch(url).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
		});
	});

	it('should follow redirect code 307', function() {
		url = base + '/redirect/307';
		return fetch(url).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
		});
	});

	it('should follow redirect code 308', function() {
		url = base + '/redirect/308';
		return fetch(url).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
		});
	});

	it('should follow redirect chain', function() {
		url = base + '/redirect/chain';
		return fetch(url).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
		});
	});

	it('should follow POST request redirect code 301 with GET', function() {
		url = base + '/redirect/301';
		opts = {
			method: 'POST'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
			return res.json().then(function(result) {
				expect(result.method).to.equal('GET');
				expect(result.body).to.equal('');
			});
		});
	});

	it('should follow POST request redirect code 302 with GET', function() {
		url = base + '/redirect/302';
		opts = {
			method: 'POST'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
			return res.json().then(function(result) {
				expect(result.method).to.equal('GET');
				expect(result.body).to.equal('');
			});
		});
	});

	it('should follow redirect code 303 with GET', function() {
		url = base + '/redirect/303';
		opts = {
			method: 'PUT'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
			return res.json().then(function(result) {
				expect(result.method).to.equal('GET');
				expect(result.body).to.equal('');
			});
		});
	});

	it('should obey maximum redirect, reject case', function() {
		url = base + '/redirect/chain';
		opts = {
			follow: 1
		}
		return expect(fetch(url, opts)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('type', 'max-redirect');
	});

	it('should obey redirect chain, resolve case', function() {
		url = base + '/redirect/chain';
		opts = {
			follow: 2
		}
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			expect(res.status).to.equal(200);
		});
	});

	it('should allow not following redirect', function() {
		url = base + '/redirect/301';
		opts = {
			follow: 0
		}
		return expect(fetch(url, opts)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('type', 'max-redirect');
	});

	it('should support redirect mode, manual flag', function() {
		url = base + '/redirect/301';
		opts = {
			redirect: 'manual'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(url);
			expect(res.status).to.equal(301);
			expect(res.headers.get('location')).to.equal(base + '/inspect');
		});
	});

	it('should support redirect mode, error flag', function() {
		url = base + '/redirect/301';
		opts = {
			redirect: 'error'
		};
		return expect(fetch(url, opts)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('type', 'no-redirect');
	});

	it('should support redirect mode, manual flag when there is no redirect', function() {
		url = base + '/hello';
		opts = {
			redirect: 'manual'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(url);
			expect(res.status).to.equal(200);
			expect(res.headers.get('location')).to.be.null;
		});
	});

	it('should follow redirect code 301 and keep existing headers', function() {
		url = base + '/redirect/301';
		opts = {
			headers: new Headers({ 'x-custom-header': 'abc' })
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(base + '/inspect');
			return res.json();
		}).then(function(res) {
			expect(res.headers['x-custom-header']).to.equal('abc');
		});
	});

	it('should reject broken redirect', function() {
		url = base + '/error/redirect';
		return expect(fetch(url)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('type', 'invalid-redirect');
	});

	it('should not reject broken redirect under manual redirect', function() {
		url = base + '/error/redirect';
		opts = {
			redirect: 'manual'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.url).to.equal(url);
			expect(res.status).to.equal(301);
			expect(res.headers.get('location')).to.be.null;
		});
	});

	it('should handle client-error response', function() {
		url = base + '/error/400';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			expect(res.status).to.equal(400);
			expect(res.statusText).to.equal('Bad Request');
			expect(res.ok).to.be.false;
			return res.text().then(function(result) {
				expect(res.bodyUsed).to.be.true;
				expect(result).to.be.a('string');
				expect(result).to.equal('client error');
			});
		});
	});

	it('should handle server-error response', function() {
		url = base + '/error/500';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			expect(res.status).to.equal(500);
			expect(res.statusText).to.equal('Internal Server Error');
			expect(res.ok).to.be.false;
			return res.text().then(function(result) {
				expect(res.bodyUsed).to.be.true;
				expect(result).to.be.a('string');
				expect(result).to.equal('server error');
			});
		});
	});

	it('should handle network-error response', function() {
		url = base + '/error/reset';
		return expect(fetch(url)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('code', 'ECONNRESET');
	});

	it('should handle DNS-error response', function() {
		url = 'http://domain.invalid';
		return expect(fetch(url)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('code', 'ENOTFOUND');
	});

	it('should reject invalid json response', function() {
		url = base + '/error/json';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('application/json');
			return expect(res.json()).to.eventually.be.rejectedWith(Error);
		});
	});

	it('should handle no content response', function() {
		url = base + '/no-content';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(204);
			expect(res.statusText).to.equal('No Content');
			expect(res.ok).to.be.true;
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.be.empty;
			});
		});
	});

	it('should throw on no-content json response', function() {
		url = base + '/no-content';
		return fetch(url).then(function(res) {
			return expect(res.json()).to.eventually.be.rejectedWith(FetchError);
		});
	});

	it('should handle no content response with gzip encoding', function() {
		url = base + '/no-content/gzip';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(204);
			expect(res.statusText).to.equal('No Content');
			expect(res.headers.get('content-encoding')).to.equal('gzip');
			expect(res.ok).to.be.true;
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.be.empty;
			});
		});
	});

	it('should handle not modified response', function() {
		url = base + '/not-modified';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(304);
			expect(res.statusText).to.equal('Not Modified');
			expect(res.ok).to.be.false;
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.be.empty;
			});
		});
	});

	it('should handle not modified response with gzip encoding', function() {
		url = base + '/not-modified/gzip';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(304);
			expect(res.statusText).to.equal('Not Modified');
			expect(res.headers.get('content-encoding')).to.equal('gzip');
			expect(res.ok).to.be.false;
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.be.empty;
			});
		});
	});

	it('should decompress gzip response', function() {
		url = base + '/gzip';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.equal('hello world');
			});
		});
	});

	it('should decompress deflate response', function() {
		url = base + '/deflate';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.equal('hello world');
			});
		});
	});

	it('should decompress deflate raw response from old apache server', function() {
		url = base + '/deflate-raw';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.equal('hello world');
			});
		});
	});

	it('should skip decompression if unsupported', function() {
		url = base + '/sdch';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.equal('fake sdch string');
			});
		});
	});

	it('should reject if response compression is invalid', function() {
		url = base + '/invalid-content-encoding';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return expect(res.text()).to.eventually.be.rejected
				.and.be.an.instanceOf(FetchError)
				.and.have.property('code', 'Z_DATA_ERROR');
		});
	});

	it('should allow disabling auto decompression', function() {
		url = base + '/gzip';
		opts = {
			compress: false
		};
		return fetch(url, opts).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(result).to.be.a('string');
				expect(result).to.not.equal('hello world');
			});
		});
	});

	it('should allow custom timeout', function() {
		this.timeout(500);
		url = base + '/timeout';
		opts = {
			timeout: 100
		};
		return expect(fetch(url, opts)).to.eventually.be.rejected
			.and.be.an.instanceOf(FetchError)
			.and.have.property('type', 'request-timeout');
	});

	it('should allow custom timeout on response body', function() {
		this.timeout(500);
		url = base + '/slow';
		opts = {
			timeout: 100
		};
		return fetch(url, opts).then(function(res) {
			expect(res.ok).to.be.true;
			return expect(res.text()).to.eventually.be.rejected
				.and.be.an.instanceOf(FetchError)
				.and.have.property('type', 'body-timeout');
		});
	});

	it('should clear internal timeout on fetch response', function (done) {
		this.timeout(1000);
		spawn('node', ['-e', 'require("./")("' + base + '/hello", { timeout: 5000 })'])
			.on('exit', function () {
				done();
			});
	});

	it('should clear internal timeout on fetch redirect', function (done) {
		this.timeout(1000);
		spawn('node', ['-e', 'require("./")("' + base + '/redirect/301", { timeout: 5000 })'])
			.on('exit', function () {
				done();
			});
	});

	it('should clear internal timeout on fetch error', function (done) {
		this.timeout(1000);
		spawn('node', ['-e', 'require("./")("' + base + '/error/reset", { timeout: 5000 })'])
			.on('exit', function () {
				done();
			});
	});

	it('should allow POST request', function() {
		url = base + '/inspect';
		opts = {
			method: 'POST'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.headers['transfer-encoding']).to.be.undefined;
			expect(res.headers['content-length']).to.equal('0');
		});
	});

	it('should allow POST request with string body', function() {
		url = base + '/inspect';
		opts = {
			method: 'POST'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.body).to.equal('a=1');
			expect(res.headers['transfer-encoding']).to.be.undefined;
			expect(res.headers['content-length']).to.equal('3');
		});
	});

	it('should allow POST request with buffer body', function() {
		url = base + '/inspect';
		opts = {
			method: 'POST'
			, body: new Buffer('a=1', 'utf-8')
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.body).to.equal('a=1');
			expect(res.headers['transfer-encoding']).to.equal('chunked');
			expect(res.headers['content-length']).to.be.undefined;
		});
	});

	it('should allow POST request with readable stream as body', function() {
		var body = resumer().queue('a=1').end();
		body = body.pipe(new stream.PassThrough());

		url = base + '/inspect';
		opts = {
			method: 'POST'
			, body: body
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.body).to.equal('a=1');
			expect(res.headers['transfer-encoding']).to.equal('chunked');
			expect(res.headers['content-length']).to.be.undefined;
		});
	});

	it('should allow POST request with form-data as body', function() {
		var form = new FormData();
		form.append('a','1');

		url = base + '/multipart';
		opts = {
			method: 'POST'
			, body: form
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.headers['content-type']).to.contain('multipart/form-data');
			expect(res.headers['content-length']).to.be.a('string');
			expect(res.body).to.equal('a=1');
		});
	});

	it('should allow POST request with form-data using stream as body', function() {
		var form = new FormData();
		form.append('my_field', fs.createReadStream('test/dummy.txt'));

		url = base + '/multipart';
		opts = {
			method: 'POST'
			, body: form
		};

		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.headers['content-type']).to.contain('multipart/form-data');
			expect(res.headers['content-length']).to.be.undefined;
			expect(res.body).to.contain('my_field=');
		});
	});

	it('should allow POST request with form-data as body and custom headers', function() {
		var form = new FormData();
		form.append('a','1');

		var headers = form.getHeaders();
		headers['b'] = '2';

		url = base + '/multipart';
		opts = {
			method: 'POST'
			, body: form
			, headers: headers
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.headers['content-type']).to.contain('multipart/form-data');
			expect(res.headers['content-length']).to.be.a('string');
			expect(res.headers.b).to.equal('2');
			expect(res.body).to.equal('a=1');
		});
	});

	it('should allow POST request with object body', function() {
		url = base + '/inspect';
		// note that fetch simply calls tostring on an object
		opts = {
			method: 'POST'
			, body: { a:1 }
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.body).to.equal('[object Object]');
		});
	});

	it('should allow PUT request', function() {
		url = base + '/inspect';
		opts = {
			method: 'PUT'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('PUT');
			expect(res.body).to.equal('a=1');
		});
	});

	it('should allow DELETE request', function() {
		url = base + '/inspect';
		opts = {
			method: 'DELETE'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('DELETE');
		});
	});

	it('should allow POST request with string body', function() {
		url = base + '/inspect';
		opts = {
			method: 'POST'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('POST');
			expect(res.body).to.equal('a=1');
			expect(res.headers['transfer-encoding']).to.be.undefined;
			expect(res.headers['content-length']).to.equal('3');
		});
	});

	it('should allow DELETE request with string body', function() {
		url = base + '/inspect';
		opts = {
			method: 'DELETE'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('DELETE');
			expect(res.body).to.equal('a=1');
			expect(res.headers['transfer-encoding']).to.be.undefined;
			expect(res.headers['content-length']).to.equal('3');
		});
	});

	it('should allow PATCH request', function() {
		url = base + '/inspect';
		opts = {
			method: 'PATCH'
			, body: 'a=1'
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.method).to.equal('PATCH');
			expect(res.body).to.equal('a=1');
		});
	});

	it('should allow HEAD request', function() {
		url = base + '/hello';
		opts = {
			method: 'HEAD'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.status).to.equal(200);
			expect(res.statusText).to.equal('OK');
			expect(res.headers.get('content-type')).to.equal('text/plain');
			expect(res.body).to.be.an.instanceof(stream.Transform);
			return res.text();
		}).then(function(text) {
			expect(text).to.equal('');
		});
	});

	it('should allow HEAD request with content-encoding header', function() {
		url = base + '/error/404';
		opts = {
			method: 'HEAD'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.status).to.equal(404);
			expect(res.headers.get('content-encoding')).to.equal('gzip');
			return res.text();
		}).then(function(text) {
			expect(text).to.equal('');
		});
	});

	it('should allow OPTIONS request', function() {
		url = base + '/options';
		opts = {
			method: 'OPTIONS'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.status).to.equal(200);
			expect(res.statusText).to.equal('OK');
			expect(res.headers.get('allow')).to.equal('GET, HEAD, OPTIONS');
			expect(res.body).to.be.an.instanceof(stream.Transform);
		});
	});

	it('should reject decoding body twice', function() {
		url = base + '/plain';
		return fetch(url).then(function(res) {
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return res.text().then(function(result) {
				expect(res.bodyUsed).to.be.true;
				return expect(res.text()).to.eventually.be.rejectedWith(Error);
			});
		});
	});

	it('should support maximum response size, multiple chunk', function() {
		url = base + '/size/chunk';
		opts = {
			size: 5
		};
		return fetch(url, opts).then(function(res) {
			expect(res.status).to.equal(200);
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return expect(res.text()).to.eventually.be.rejected
				.and.be.an.instanceOf(FetchError)
				.and.have.property('type', 'max-size');
		});
	});

	it('should support maximum response size, single chunk', function() {
		url = base + '/size/long';
		opts = {
			size: 5
		};
		return fetch(url, opts).then(function(res) {
			expect(res.status).to.equal(200);
			expect(res.headers.get('content-type')).to.equal('text/plain');
			return expect(res.text()).to.eventually.be.rejected
				.and.be.an.instanceOf(FetchError)
				.and.have.property('type', 'max-size');
		});
	});

	it('should support encoding decode, xml dtd detect', function() {
		url = base + '/encoding/euc-jp';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			return res.text().then(function(result) {
				expect(result).to.equal('<?xml version="1.0" encoding="EUC-JP"?><title>日本語</title>');
			});
		});
	});

	it('should support encoding decode, content-type detect', function() {
		url = base + '/encoding/shift-jis';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			return res.text().then(function(result) {
				expect(result).to.equal('<div>日本語</div>');
			});
		});
	});

	it('should support encoding decode, html5 detect', function() {
		url = base + '/encoding/gbk';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			return res.text().then(function(result) {
				expect(result).to.equal('<meta charset="gbk"><div>中文</div>');
			});
		});
	});

	it('should support encoding decode, html4 detect', function() {
		url = base + '/encoding/gb2312';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			return res.text().then(function(result) {
				expect(result).to.equal('<meta http-equiv="Content-Type" content="text/html; charset=gb2312"><div>中文</div>');
			});
		});
	});

	it('should default to utf8 encoding', function() {
		url = base + '/encoding/utf8';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			expect(res.headers.get('content-type')).to.be.null;
			return res.text().then(function(result) {
				expect(result).to.equal('中文');
			});
		});
	});

	it('should support uncommon content-type order, charset in front', function() {
		url = base + '/encoding/order1';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			return res.text().then(function(result) {
				expect(result).to.equal('中文');
			});
		});
	});

	it('should support uncommon content-type order, end with qs', function() {
		url = base + '/encoding/order2';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			return res.text().then(function(result) {
				expect(result).to.equal('中文');
			});
		});
	});

	it('should support chunked encoding, html4 detect', function() {
		url = base + '/encoding/chunked';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			// because node v0.12 doesn't have str.repeat
			var padding = new Array(10 + 1).join('a');
			return res.text().then(function(result) {
				expect(result).to.equal(padding + '<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS" /><div>日本語</div>');
			});
		});
	});

	it('should only do encoding detection up to 1024 bytes', function() {
		url = base + '/encoding/invalid';
		return fetch(url).then(function(res) {
			expect(res.status).to.equal(200);
			// because node v0.12 doesn't have str.repeat
			var padding = new Array(1200 + 1).join('a');
			return res.text().then(function(result) {
				expect(result).to.not.equal(padding + '中文');
			});
		});
	});

	it('should allow piping response body as stream', function(done) {
		url = base + '/hello';
		fetch(url).then(function(res) {
			expect(res.body).to.be.an.instanceof(stream.Transform);
			res.body.on('data', function(chunk) {
				if (chunk === null) {
					return;
				}
				expect(chunk.toString()).to.equal('world');
			});
			res.body.on('end', function() {
				done();
			});
		});
	});

	it('should allow cloning a response, and use both as stream', function(done) {
		url = base + '/hello';
		return fetch(url).then(function(res) {
			var counter = 0;
			var r1 = res.clone();
			expect(res.body).to.be.an.instanceof(stream.Transform);
			expect(r1.body).to.be.an.instanceof(stream.Transform);
			res.body.on('data', function(chunk) {
				if (chunk === null) {
					return;
				}
				expect(chunk.toString()).to.equal('world');
			});
			res.body.on('end', function() {
				counter++;
				if (counter == 2) {
					done();
				}
			});
			r1.body.on('data', function(chunk) {
				if (chunk === null) {
					return;
				}
				expect(chunk.toString()).to.equal('world');
			});
			r1.body.on('end', function() {
				counter++;
				if (counter == 2) {
					done();
				}
			});
		});
	});

	it('should allow cloning a json response and log it as text response', function() {
		url = base + '/json';
		return fetch(url).then(function(res) {
			var r1 = res.clone();
			return fetch.Promise.all([res.json(), r1.text()]).then(function(results) {
				expect(results[0]).to.deep.equal({name: 'value'});
				expect(results[1]).to.equal('{"name":"value"}');
			});
		});
	});

	it('should allow cloning a json response, and then log it as text response', function() {
		url = base + '/json';
		return fetch(url).then(function(res) {
			var r1 = res.clone();
			return res.json().then(function(result) {
				expect(result).to.deep.equal({name: 'value'});
				return r1.text().then(function(result) {
					expect(result).to.equal('{"name":"value"}');
				});
			});
		});
	});

	it('should allow cloning a json response, first log as text response, then return json object', function() {
		url = base + '/json';
		return fetch(url).then(function(res) {
			var r1 = res.clone();
			return r1.text().then(function(result) {
				expect(result).to.equal('{"name":"value"}');
				return res.json().then(function(result) {
					expect(result).to.deep.equal({name: 'value'});
				});
			});
		});
	});

	it('should not allow cloning a response after its been used', function() {
		url = base + '/hello';
		return fetch(url).then(function(res) {
			return res.text().then(function(result) {
				expect(function() {
					var r1 = res.clone();
				}).to.throw(Error);
			});
		})
	});

	it('should allow get all responses of a header', function() {
		url = base + '/cookie';
		return fetch(url).then(function(res) {
			expect(res.headers.get('set-cookie')).to.equal('a=1');
			expect(res.headers.get('Set-Cookie')).to.equal('a=1');
			expect(res.headers.getAll('set-cookie')).to.deep.equal(['a=1', 'b=1']);
			expect(res.headers.getAll('Set-Cookie')).to.deep.equal(['a=1', 'b=1']);
		});
	});

	it('should allow iterating through all headers', function() {
		var headers = new Headers({
			a: 1
			, b: [2, 3]
			, c: [4]
		});
		expect(headers).to.have.property('forEach');

		var result = [];
		headers.forEach(function(val, key) {
			result.push([key, val]);
		});

		expected = [
			["a", "1"]
			, ["b", "2"]
			, ["b", "3"]
			, ["c", "4"]
		];
		expect(result).to.deep.equal(expected);
	});

	it('should allow deleting header', function() {
		url = base + '/cookie';
		return fetch(url).then(function(res) {
			res.headers.delete('set-cookie');
			expect(res.headers.get('set-cookie')).to.be.null;
			expect(res.headers.getAll('set-cookie')).to.be.empty;
		});
	});

	it('should send request with connection keep-alive if agent is provided', function() {
		url = base + '/inspect';
		opts = {
			agent: new http.Agent({
				keepAlive: true
			})
		};
		return fetch(url, opts).then(function(res) {
			return res.json();
		}).then(function(res) {
			expect(res.headers['connection']).to.equal('keep-alive');
		});
	});

	it('should ignore unsupported attributes while reading headers', function() {
		var FakeHeader = function() {};
		// prototypes are ignored
		FakeHeader.prototype.z = 'fake';

		var res = new FakeHeader;
		// valid
		res.a = 'string';
		res.b = ['1','2'];
		res.c = '';
		res.d = [];
		// common mistakes, normalized
		res.e = 1;
		res.f = [1, 2];
		// invalid, ignored
		res.g = { a:1 };
		res.h = undefined;
		res.i = null;
		res.j = NaN;
		res.k = true;
		res.l = false;
		res.m = new Buffer('test');

		var h1 = new Headers(res);

		expect(h1._headers['a']).to.include('string');
		expect(h1._headers['b']).to.include('1');
		expect(h1._headers['b']).to.include('2');
		expect(h1._headers['c']).to.include('');
		expect(h1._headers['d']).to.be.undefined;

		expect(h1._headers['e']).to.include('1');
		expect(h1._headers['f']).to.include('1');
		expect(h1._headers['f']).to.include('2');

		expect(h1._headers['g']).to.be.undefined;
		expect(h1._headers['h']).to.be.undefined;
		expect(h1._headers['i']).to.be.undefined;
		expect(h1._headers['j']).to.be.undefined;
		expect(h1._headers['k']).to.be.undefined;
		expect(h1._headers['l']).to.be.undefined;
		expect(h1._headers['m']).to.be.undefined;

		expect(h1._headers['z']).to.be.undefined;
	});

	it('should wrap headers', function() {
		var h1 = new Headers({
			a: '1'
		});

		var h2 = new Headers(h1);
		h2.set('b', '1');

		var h3 = new Headers(h2);
		h3.append('a', '2');

		expect(h1._headers['a']).to.include('1');
		expect(h1._headers['a']).to.not.include('2');

		expect(h2._headers['a']).to.include('1');
		expect(h2._headers['a']).to.not.include('2');
		expect(h2._headers['b']).to.include('1');

		expect(h3._headers['a']).to.include('1');
		expect(h3._headers['a']).to.include('2');
		expect(h3._headers['b']).to.include('1');
	});

	it('should support fetch with Request instance', function() {
		url = base + '/hello';
		var req = new Request(url);
		return fetch(req).then(function(res) {
			expect(res.url).to.equal(url);
			expect(res.ok).to.be.true;
			expect(res.status).to.equal(200);
		});
	});

	it('should support wrapping Request instance', function() {
		url = base + '/hello';

		var form = new FormData();
		form.append('a', '1');

		var r1 = new Request(url, {
			method: 'POST'
			, follow: 1
			, body: form
		});
		var r2 = new Request(r1, {
			follow: 2
		});

		expect(r2.url).to.equal(url);
		expect(r2.method).to.equal('POST');
		// note that we didn't clone the body
		expect(r2.body).to.equal(form);
		expect(r1.follow).to.equal(1);
		expect(r2.follow).to.equal(2);
		expect(r1.counter).to.equal(0);
		expect(r2.counter).to.equal(0);
	});

	it('should support overwrite Request instance', function() {
		url = base + '/inspect';
		var req = new Request(url, {
			method: 'POST'
			, headers: {
				a: '1'
			}
		});
		return fetch(req, {
			method: 'GET'
			, headers: {
				a: '2'
			}
		}).then(function(res) {
			return res.json();
		}).then(function(body) {
			expect(body.method).to.equal('GET');
			expect(body.headers.a).to.equal('2');
		});
	});

	it('should support empty options in Response constructor', function() {
		var body = resumer().queue('a=1').end();
		body = body.pipe(new stream.PassThrough());
		var res = new Response(body);
		return res.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should support parsing headers in Response constructor', function() {
		var res = new Response(null, {
			headers: {
				a: '1'
			}
		});
		expect(res.headers.get('a')).to.equal('1');
	});

	it('should support text() method in Response constructor', function() {
		var res = new Response('a=1');
		return res.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should support json() method in Response constructor', function() {
		var res = new Response('{"a":1}');
		return res.json().then(function(result) {
			expect(result.a).to.equal(1);
		});
	});

	it('should support buffer() method in Response constructor', function() {
		var res = new Response('a=1');
		return res.buffer().then(function(result) {
			expect(result.toString()).to.equal('a=1');
		});
	});

	it('should support clone() method in Response constructor', function() {
		var body = resumer().queue('a=1').end();
		body = body.pipe(new stream.PassThrough());
		var res = new Response(body, {
			headers: {
				a: '1'
			}
			, url: base
			, status: 346
			, statusText: 'production'
		});
		var cl = res.clone();
		expect(cl.headers.get('a')).to.equal('1');
		expect(cl.url).to.equal(base);
		expect(cl.status).to.equal(346);
		expect(cl.statusText).to.equal('production');
		expect(cl.ok).to.be.false;
		// clone body shouldn't be the same body
		expect(cl.body).to.not.equal(body);
		return cl.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should support stream as body in Response constructor', function() {
		var body = resumer().queue('a=1').end();
		body = body.pipe(new stream.PassThrough());
		var res = new Response(body);
		return res.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should support string as body in Response constructor', function() {
		var res = new Response('a=1');
		return res.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should support buffer as body in Response constructor', function() {
		var res = new Response(new Buffer('a=1'));
		return res.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should default to 200 as status code', function() {
		var res = new Response(null);
		expect(res.status).to.equal(200);
	});

	it('should support parsing headers in Request constructor', function() {
		url = base;
		var req = new Request(url, {
			headers: {
				a: '1'
			}
		});
		expect(req.url).to.equal(url);
		expect(req.headers.get('a')).to.equal('1');
	});

	it('should support text() method in Request constructor', function() {
		url = base;
		var req = new Request(url, {
			body: 'a=1'
		});
		expect(req.url).to.equal(url);
		return req.text().then(function(result) {
			expect(result).to.equal('a=1');
		});
	});

	it('should support json() method in Request constructor', function() {
		url = base;
		var req = new Request(url, {
			body: '{"a":1}'
		});
		expect(req.url).to.equal(url);
		return req.json().then(function(result) {
			expect(result.a).to.equal(1);
		});
	});

	it('should support buffer() method in Request constructor', function() {
		url = base;
		var req = new Request(url, {
			body: 'a=1'
		});
		expect(req.url).to.equal(url);
		return req.buffer().then(function(result) {
			expect(result.toString()).to.equal('a=1');
		});
	});

	it('should support arbitrary url in Request constructor', function() {
		url = 'anything';
		var req = new Request(url);
		expect(req.url).to.equal('anything');
	});

	it('should support clone() method in Request constructor', function() {
		url = base;
		var body = resumer().queue('a=1').end();
		body = body.pipe(new stream.PassThrough());
		var agent = new http.Agent();
		var req = new Request(url, {
			body: body
			, method: 'POST'
			, redirect: 'manual'
			, headers: {
				b: '2'
			}
			, follow: 3
			, compress: false
			, agent: agent
		});
		var cl = req.clone();
		expect(cl.url).to.equal(url);
		expect(cl.method).to.equal('POST');
		expect(cl.redirect).to.equal('manual');
		expect(cl.headers.get('b')).to.equal('2');
		expect(cl.follow).to.equal(3);
		expect(cl.compress).to.equal(false);
		expect(cl.method).to.equal('POST');
		expect(cl.counter).to.equal(0);
		expect(cl.agent).to.equal(agent);
		// clone body shouldn't be the same body
		expect(cl.body).to.not.equal(body);
		return fetch.Promise.all([cl.text(), req.text()]).then(function(results) {
			expect(results[0]).to.equal('a=1');
			expect(results[1]).to.equal('a=1');
		});
	});

	it('should support text(), json() and buffer() method in Body constructor', function() {
		var body = new Body('a=1');
		expect(body).to.have.property('text');
		expect(body).to.have.property('json');
		expect(body).to.have.property('buffer');
	});

	it('should create custom FetchError', function funcName() {
		var systemError = new Error('system');
		systemError.code = 'ESOMEERROR';

		var err = new FetchError('test message', 'test-error', systemError);
		expect(err).to.be.an.instanceof(Error);
		expect(err).to.be.an.instanceof(FetchError);
		expect(err.name).to.equal('FetchError');
		expect(err.message).to.equal('test message');
		expect(err.type).to.equal('test-error');
		expect(err.code).to.equal('ESOMEERROR');
		expect(err.errno).to.equal('ESOMEERROR');
		expect(err.stack).to.include('funcName');
		expect(err.stack.split('\n')[0]).to.equal(err.name + ': ' + err.message);
	});

	it('should support https request', function() {
		this.timeout(5000);
		url = 'https://github.com/';
		opts = {
			method: 'HEAD'
		};
		return fetch(url, opts).then(function(res) {
			expect(res.status).to.equal(200);
			expect(res.ok).to.be.true;
		});
	});

});
