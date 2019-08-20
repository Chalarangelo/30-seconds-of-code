'use strict';

const EventEmitter = require('events');
const urlLib = require('url');
const normalizeUrl = require('normalize-url');
const getStream = require('get-stream');
const CachePolicy = require('http-cache-semantics');
const Response = require('responselike');
const lowercaseKeys = require('lowercase-keys');
const cloneResponse = require('clone-response');
const Keyv = require('keyv');

class CacheableRequest {
	constructor(request, cacheAdapter) {
		if (typeof request !== 'function') {
			throw new TypeError('Parameter `request` must be a function');
		}

		this.cache = new Keyv({
			uri: typeof cacheAdapter === 'string' && cacheAdapter,
			store: typeof cacheAdapter !== 'string' && cacheAdapter,
			namespace: 'cacheable-request'
		});

		return this.createCacheableRequest(request);
	}

	createCacheableRequest(request) {
		return (opts, cb) => {
			if (typeof opts === 'string') {
				opts = urlLib.parse(opts);
			}
			opts = Object.assign({
				headers: {},
				method: 'GET',
				cache: true,
				strictTtl: false,
				automaticFailover: false
			}, opts);
			opts.headers = lowercaseKeys(opts.headers);

			const ee = new EventEmitter();
			const url = normalizeUrl(urlLib.format(opts));
			const key = `${opts.method}:${url}`;
			let revalidate = false;
			let madeRequest = false;

			const makeRequest = opts => {
				madeRequest = true;
				const handler = response => {
					if (revalidate) {
						const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts, response);
						if (!revalidatedPolicy.modified) {
							const headers = revalidatedPolicy.policy.responseHeaders();
							response = new Response(response.statusCode, headers, revalidate.body, revalidate.url);
							response.cachePolicy = revalidatedPolicy.policy;
							response.fromCache = true;
						}
					}

					if (!response.fromCache) {
						response.cachePolicy = new CachePolicy(opts, response);
						response.fromCache = false;
					}

					let clonedResponse;
					if (opts.cache && response.cachePolicy.storable()) {
						clonedResponse = cloneResponse(response);
						getStream.buffer(response)
							.then(body => {
								const value = {
									cachePolicy: response.cachePolicy.toObject(),
									url: response.url,
									statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
									body
								};
								const ttl = opts.strictTtl ? response.cachePolicy.timeToLive() : undefined;
								return this.cache.set(key, value, ttl);
							})
							.catch(err => ee.emit('error', new CacheableRequest.CacheError(err)));
					} else if (opts.cache && revalidate) {
						this.cache.delete(key)
							.catch(err => ee.emit('error', new CacheableRequest.CacheError(err)));
					}

					ee.emit('response', clonedResponse || response);
					if (typeof cb === 'function') {
						cb(clonedResponse || response);
					}
				};

				try {
					const req = request(opts, handler);
					ee.emit('request', req);
				} catch (err) {
					ee.emit('error', new CacheableRequest.RequestError(err));
				}
			};

			const get = opts => Promise.resolve()
				.then(() => opts.cache ? this.cache.get(key) : undefined)
				.then(cacheEntry => {
					if (typeof cacheEntry === 'undefined') {
						return makeRequest(opts);
					}

					const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
					if (policy.satisfiesWithoutRevalidation(opts)) {
						const headers = policy.responseHeaders();
						const response = new Response(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
						response.cachePolicy = policy;
						response.fromCache = true;

						ee.emit('response', response);
						if (typeof cb === 'function') {
							cb(response);
						}
					} else {
						revalidate = cacheEntry;
						opts.headers = policy.revalidationHeaders(opts);
						makeRequest(opts);
					}
				});

			this.cache.on('error', err => ee.emit('error', new CacheableRequest.CacheError(err)));

			get(opts).catch(err => {
				if (opts.automaticFailover && !madeRequest) {
					makeRequest(opts);
				}
				ee.emit('error', new CacheableRequest.CacheError(err));
			});

			return ee;
		};
	}
}

CacheableRequest.RequestError = class extends Error {
	constructor(err) {
		super(err.message);
		this.name = 'RequestError';
		Object.assign(this, err);
	}
};

CacheableRequest.CacheError = class extends Error {
	constructor(err) {
		super(err.message);
		this.name = 'CacheError';
		Object.assign(this, err);
	}
};

module.exports = CacheableRequest;
