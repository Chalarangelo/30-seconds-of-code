'use strict';
const urlLib = require('url');
const http = require('http');
const PCancelable = require('p-cancelable');
const is = require('@sindresorhus/is');

class GotError extends Error {
	constructor(message, error, opts) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.name = 'GotError';

		if (!is.undefined(error.code)) {
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

module.exports.GotError = GotError;

module.exports.CacheError = class extends GotError {
	constructor(error, opts) {
		super(error.message, error, opts);
		this.name = 'CacheError';
	}
};

module.exports.RequestError = class extends GotError {
	constructor(error, opts) {
		super(error.message, error, opts);
		this.name = 'RequestError';
	}
};

module.exports.ReadError = class extends GotError {
	constructor(error, opts) {
		super(error.message, error, opts);
		this.name = 'ReadError';
	}
};

module.exports.ParseError = class extends GotError {
	constructor(error, statusCode, opts, data) {
		super(`${error.message} in "${urlLib.format(opts)}": \n${data.slice(0, 77)}...`, error, opts);
		this.name = 'ParseError';
		this.statusCode = statusCode;
		this.statusMessage = http.STATUS_CODES[this.statusCode];
	}
};

module.exports.HTTPError = class extends GotError {
	constructor(statusCode, statusMessage, headers, opts) {
		if (statusMessage) {
			statusMessage = statusMessage.replace(/\r?\n/g, ' ').trim();
		} else {
			statusMessage = http.STATUS_CODES[statusCode];
		}
		super(`Response code ${statusCode} (${statusMessage})`, {}, opts);
		this.name = 'HTTPError';
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.headers = headers;
	}
};

module.exports.MaxRedirectsError = class extends GotError {
	constructor(statusCode, redirectUrls, opts) {
		super('Redirected 10 times. Aborting.', {}, opts);
		this.name = 'MaxRedirectsError';
		this.statusCode = statusCode;
		this.statusMessage = http.STATUS_CODES[this.statusCode];
		this.redirectUrls = redirectUrls;
	}
};

module.exports.UnsupportedProtocolError = class extends GotError {
	constructor(opts) {
		super(`Unsupported protocol "${opts.protocol}"`, {}, opts);
		this.name = 'UnsupportedProtocolError';
	}
};

module.exports.CancelError = PCancelable.CancelError;
