'use strict';
const EventEmitter = require('events');
const http = require('http');
const https = require('https');
const PassThrough = require('stream').PassThrough;
const urlLib = require('url');
const querystring = require('querystring');
const duplexer3 = require('duplexer3');
const isStream = require('is-stream');
const getStream = require('get-stream');
const timedOut = require('timed-out');
const urlParseLax = require('url-parse-lax');
const urlToOptions = require('url-to-options');
const lowercaseKeys = require('lowercase-keys');
const decompressResponse = require('decompress-response');
const isRetryAllowed = require('is-retry-allowed');
const Buffer = require('safe-buffer').Buffer;
const isURL = require('isurl');
const isPlainObj = require('is-plain-obj');
const PCancelable = require('p-cancelable');
const pTimeout = require('p-timeout');
const pkg = require('./package');

const getMethodRedirectCodes = new Set([300, 301, 302, 303, 304, 305, 307, 308]);
const allMethodRedirectCodes = new Set([300, 303, 307, 308]);

function requestAsEventEmitter(opts) {
	opts = opts || {};

	const ee = new EventEmitter();
	const requestUrl = opts.href || urlLib.resolve(urlLib.format(opts), opts.path);
	const redirects = [];
	let retryCount = 0;
	let redirectUrl;

	const get = opts => {
		if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
			ee.emit('error', new got.UnsupportedProtocolError(opts));
			return;
		}

		let fn = opts.protocol === 'https:' ? https : http;

		if (opts.useElectronNet && process.versions.electron) {
			const electron = require('electron');
			fn = electron.net || electron.remote.net;
		}

		const req = fn.request(opts, res => {
			const statusCode = res.statusCode;

			res.url = redirectUrl || requestUrl;
			res.requestUrl = requestUrl;

			const followRedirect = opts.followRedirect && 'location' in res.headers;
			const redirectGet = followRedirect && getMethodRedirectCodes.has(statusCode);
			const redirectAll = followRedirect && allMethodRedirectCodes.has(statusCode);

			if (redirectAll || (redirectGet && (opts.method === 'GET' || opts.method === 'HEAD'))) {
				res.resume();

				if (statusCode === 303) {
					// Server responded with "see other", indicating that the resource exists at another location,
					// and the client should request it from that location via GET or HEAD.
					opts.method = 'GET';
				}

				if (redirects.length >= 10) {
					ee.emit('error', new got.MaxRedirectsError(statusCode, redirects, opts), null, res);
					return;
				}

				const bufferString = Buffer.from(res.headers.location, 'binary').toString();

				redirectUrl = urlLib.resolve(urlLib.format(opts), bufferString);

				redirects.push(redirectUrl);

				const redirectOpts = Object.assign({}, opts, urlLib.parse(redirectUrl));

				ee.emit('redirect', res, redirectOpts);

				get(redirectOpts);

				return;
			}

			setImmediate(() => {
				const response = opts.decompress === true &&
					typeof decompressResponse === 'function' &&
					req.method !== 'HEAD' ? decompressResponse(res) : res;

				if (!opts.decompress && ['gzip', 'deflate'].indexOf(res.headers['content-encoding']) !== -1) {
					opts.encoding = null;
				}

				response.redirectUrls = redirects;

				ee.emit('response', response);
			});
		});

		req.once('error', err => {
			const backoff = opts.retries(++retryCount, err);

			if (backoff) {
				setTimeout(get, backoff, opts);
				return;
			}

			ee.emit('error', new got.RequestError(err, opts));
		});

		if (opts.gotTimeout) {
			timedOut(req, opts.gotTimeout);
		}

		setImmediate(() => {
			ee.emit('request', req);
		});
	};

	setImmediate(() => {
		get(opts);
	});
	return ee;
}

function asPromise(opts) {
	const timeoutFn = requestPromise => opts.gotTimeout && opts.gotTimeout.request ?
		pTimeout(requestPromise, opts.gotTimeout.request, new got.RequestError({message: 'Request timed out', code: 'ETIMEDOUT'}, opts)) :
		requestPromise;

	return timeoutFn(new PCancelable((onCancel, resolve, reject) => {
		const ee = requestAsEventEmitter(opts);
		let cancelOnRequest = false;

		onCancel(() => {
			cancelOnRequest = true;
		});

		ee.on('request', req => {
			if (cancelOnRequest) {
				req.abort();
			}

			onCancel(() => {
				req.abort();
			});

			if (isStream(opts.body)) {
				opts.body.pipe(req);
				opts.body = undefined;
				return;
			}

			req.end(opts.body);
		});

		ee.on('response', res => {
			const stream = opts.encoding === null ? getStream.buffer(res) : getStream(res, opts);

			stream
				.catch(err => reject(new got.ReadError(err, opts)))
				.then(data => {
					const statusCode = res.statusCode;
					const limitStatusCode = opts.followRedirect ? 299 : 399;

					res.body = data;

					if (opts.json && res.body) {
						try {
							res.body = JSON.parse(res.body);
						} catch (e) {
							if (statusCode >= 200 && statusCode < 300) {
								throw new got.ParseError(e, statusCode, opts, data);
							}
						}
					}

					if (statusCode !== 304 && (statusCode < 200 || statusCode > limitStatusCode)) {
						throw new got.HTTPError(statusCode, res.headers, opts);
					}

					resolve(res);
				})
				.catch(err => {
					Object.defineProperty(err, 'response', {value: res});
					reject(err);
				});
		});

		ee.on('error', reject);
	}));
}

function asStream(opts) {
	const input = new PassThrough();
	const output = new PassThrough();
	const proxy = duplexer3(input, output);
	let timeout;

	if (opts.gotTimeout && opts.gotTimeout.request) {
		timeout = setTimeout(() => {
			proxy.emit('error', new got.RequestError({message: 'Request timed out', code: 'ETIMEDOUT'}, opts));
		}, opts.gotTimeout.request);
	}

	if (opts.json) {
		throw new Error('got can not be used as stream when options.json is used');
	}

	if (opts.body) {
		proxy.write = () => {
			throw new Error('got\'s stream is not writable when options.body is used');
		};
	}

	const ee = requestAsEventEmitter(opts);

	ee.on('request', req => {
		proxy.emit('request', req);

		if (isStream(opts.body)) {
			opts.body.pipe(req);
			return;
		}

		if (opts.body) {
			req.end(opts.body);
			return;
		}

		if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
			input.pipe(req);
			return;
		}

		req.end();
	});

	ee.on('response', res => {
		clearTimeout(timeout);

		const statusCode = res.statusCode;

		res.pipe(output);

		if (statusCode !== 304 && (statusCode < 200 || statusCode > 299)) {
			proxy.emit('error', new got.HTTPError(statusCode, res.headers, opts), null, res);
			return;
		}

		proxy.emit('response', res);
	});

	ee.on('redirect', proxy.emit.bind(proxy, 'redirect'));
	ee.on('error', proxy.emit.bind(proxy, 'error'));

	return proxy;
}

function normalizeArguments(url, opts) {
	if (typeof url !== 'string' && typeof url !== 'object') {
		throw new TypeError(`Parameter \`url\` must be a string or object, not ${typeof url}`);
	} else if (typeof url === 'string') {
		url = url.replace(/^unix:/, 'http://$&');
		url = urlParseLax(url);
	} else if (isURL.lenient(url)) {
		url = urlToOptions(url);
	}

	if (url.auth) {
		throw new Error('Basic authentication must be done with auth option');
	}

	opts = Object.assign(
		{
			path: '',
			retries: 2,
			decompress: true,
			useElectronNet: true
		},
		url,
		{
			protocol: url.protocol || 'http:' // Override both null/undefined with default protocol
		},
		opts
	);

	opts.headers = Object.assign({
		'user-agent': `${pkg.name}/${pkg.version} (https://github.com/sindresorhus/got)`,
		'accept-encoding': 'gzip,deflate'
	}, lowercaseKeys(opts.headers));

	const query = opts.query;

	if (query) {
		if (typeof query !== 'string') {
			opts.query = querystring.stringify(query);
		}

		opts.path = `${opts.path.split('?')[0]}?${opts.query}`;
		delete opts.query;
	}

	if (opts.json && opts.headers.accept === undefined) {
		opts.headers.accept = 'application/json';
	}

	const body = opts.body;
	if (body !== null && body !== undefined) {
		const headers = opts.headers;
		if (!isStream(body) && typeof body !== 'string' && !Buffer.isBuffer(body) && !(opts.form || opts.json)) {
			throw new TypeError('options.body must be a ReadableStream, string, Buffer or plain Object');
		}

		const canBodyBeStringified = isPlainObj(body) || Array.isArray(body);
		if ((opts.form || opts.json) && !canBodyBeStringified) {
			throw new TypeError('options.body must be a plain Object or Array when options.form or options.json is used');
		}

		if (isStream(body) && typeof body.getBoundary === 'function') {
			// Special case for https://github.com/form-data/form-data
			headers['content-type'] = headers['content-type'] || `multipart/form-data; boundary=${body.getBoundary()}`;
		} else if (opts.form && canBodyBeStringified) {
			headers['content-type'] = headers['content-type'] || 'application/x-www-form-urlencoded';
			opts.body = querystring.stringify(body);
		} else if (opts.json && canBodyBeStringified) {
			headers['content-type'] = headers['content-type'] || 'application/json';
			opts.body = JSON.stringify(body);
		}

		if (headers['content-length'] === undefined && headers['transfer-encoding'] === undefined && !isStream(body)) {
			const length = typeof opts.body === 'string' ? Buffer.byteLength(opts.body) : opts.body.length;
			headers['content-length'] = length;
		}

		opts.method = (opts.method || 'POST').toUpperCase();
	} else {
		opts.method = (opts.method || 'GET').toUpperCase();
	}

	if (opts.hostname === 'unix') {
		const matches = /(.+?):(.+)/.exec(opts.path);

		if (matches) {
			opts.socketPath = matches[1];
			opts.path = matches[2];
			opts.host = null;
		}
	}

	if (typeof opts.retries !== 'function') {
		const retries = opts.retries;

		opts.retries = (iter, err) => {
			if (iter > retries || !isRetryAllowed(err)) {
				return 0;
			}

			const noise = Math.random() * 100;

			return ((1 << iter) * 1000) + noise;
		};
	}

	if (opts.followRedirect === undefined) {
		opts.followRedirect = true;
	}

	if (opts.timeout) {
		if (typeof opts.timeout === 'number') {
			opts.gotTimeout = {request: opts.timeout};
		} else {
			opts.gotTimeout = opts.timeout;
		}
		delete opts.timeout;
	}

	return opts;
}

function got(url, opts) {
	try {
		return asPromise(normalizeArguments(url, opts));
	} catch (err) {
		return Promise.reject(err);
	}
}

got.stream = (url, opts) => asStream(normalizeArguments(url, opts));

const methods = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

for (const method of methods) {
	got[method] = (url, opts) => got(url, Object.assign({}, opts, {method}));
	got.stream[method] = (url, opts) => got.stream(url, Object.assign({}, opts, {method}));
}

class StdError extends Error {
	constructor(message, error, opts) {
		super(message);
		this.name = 'StdError';

		if (error.code !== undefined) {
			this.code = error.code;
		}

		Object.assign(this, {
			host: opts.host,
			hostname: opts.hostname,
			method: opts.method,
			path: opts.path,
			protocol: opts.protocol,
			url: opts.href
		});
	}
}

got.RequestError = class extends StdError {
	constructor(error, opts) {
		super(error.message, error, opts);
		this.name = 'RequestError';
	}
};

got.ReadError = class extends StdError {
	constructor(error, opts) {
		super(error.message, error, opts);
		this.name = 'ReadError';
	}
};

got.ParseError = class extends StdError {
	constructor(error, statusCode, opts, data) {
		super(`${error.message} in "${urlLib.format(opts)}": \n${data.slice(0, 77)}...`, error, opts);
		this.name = 'ParseError';
		this.statusCode = statusCode;
		this.statusMessage = http.STATUS_CODES[this.statusCode];
	}
};

got.HTTPError = class extends StdError {
	constructor(statusCode, headers, opts) {
		const statusMessage = http.STATUS_CODES[statusCode];
		super(`Response code ${statusCode} (${statusMessage})`, {}, opts);
		this.name = 'HTTPError';
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.headers = headers;
	}
};

got.MaxRedirectsError = class extends StdError {
	constructor(statusCode, redirectUrls, opts) {
		super('Redirected 10 times. Aborting.', {}, opts);
		this.name = 'MaxRedirectsError';
		this.statusCode = statusCode;
		this.statusMessage = http.STATUS_CODES[this.statusCode];
		this.redirectUrls = redirectUrls;
	}
};

got.UnsupportedProtocolError = class extends StdError {
	constructor(opts) {
		super(`Unsupported protocol "${opts.protocol}"`, {}, opts);
		this.name = 'UnsupportedProtocolError';
	}
};

module.exports = got;
