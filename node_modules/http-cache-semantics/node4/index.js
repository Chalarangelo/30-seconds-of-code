'use strict';
// rfc7231 6.1

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var statusCodeCacheableByDefault = [200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501];

// This implementation does not understand partial responses (206)
var understoodStatuses = [200, 203, 204, 300, 301, 302, 303, 307, 308, 404, 405, 410, 414, 501];

var hopByHopHeaders = { 'connection': true, 'keep-alive': true, 'proxy-authenticate': true, 'proxy-authorization': true, 'te': true, 'trailer': true, 'transfer-encoding': true, 'upgrade': true };
var excludedFromRevalidationUpdate = {
    // Since the old body is reused, it doesn't make sense to change properties of the body
    'content-length': true, 'content-encoding': true, 'transfer-encoding': true,
    'content-range': true
};

function parseCacheControl(header) {
    var cc = {};
    if (!header) return cc;

    // TODO: When there is more than one value present for a given directive (e.g., two Expires header fields, multiple Cache-Control: max-age directives),
    // the directive's value is considered invalid. Caches are encouraged to consider responses that have invalid freshness information to be stale
    var parts = header.trim().split(/\s*,\s*/); // TODO: lame parsing
    for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var part = _ref;

        var _part$split = part.split(/\s*=\s*/, 2),
            k = _part$split[0],
            v = _part$split[1];

        cc[k] = v === undefined ? true : v.replace(/^"|"$/g, ''); // TODO: lame unquoting
    }

    return cc;
}

function formatCacheControl(cc) {
    var parts = [];
    for (var k in cc) {
        var v = cc[k];
        parts.push(v === true ? k : k + '=' + v);
    }
    if (!parts.length) {
        return undefined;
    }
    return parts.join(', ');
}

module.exports = function () {
    function CachePolicy(req, res) {
        var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            shared = _ref2.shared,
            cacheHeuristic = _ref2.cacheHeuristic,
            immutableMinTimeToLive = _ref2.immutableMinTimeToLive,
            ignoreCargoCult = _ref2.ignoreCargoCult,
            _fromObject = _ref2._fromObject;

        _classCallCheck(this, CachePolicy);

        if (_fromObject) {
            this._fromObject(_fromObject);
            return;
        }

        if (!res || !res.headers) {
            throw Error("Response headers missing");
        }
        this._assertRequestHasHeaders(req);

        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._cacheHeuristic = undefined !== cacheHeuristic ? cacheHeuristic : 0.1; // 10% matches IE
        this._immutableMinTtl = undefined !== immutableMinTimeToLive ? immutableMinTimeToLive : 24 * 3600 * 1000;

        this._status = 'status' in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers['cache-control']);
        this._method = 'method' in req ? req.method : 'GET';
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null; // Don't keep all request headers if they won't be used
        this._reqcc = parseCacheControl(req.headers['cache-control']);

        // Assume that if someone uses legacy, non-standard uncecessary options they don't understand caching,
        // so there's no point stricly adhering to the blindly copy&pasted directives.
        if (ignoreCargoCult && "pre-check" in this._rescc && "post-check" in this._rescc) {
            delete this._rescc['pre-check'];
            delete this._rescc['post-check'];
            delete this._rescc['no-cache'];
            delete this._rescc['no-store'];
            delete this._rescc['must-revalidate'];
            this._resHeaders = Object.assign({}, this._resHeaders, { 'cache-control': formatCacheControl(this._rescc) });
            delete this._resHeaders.expires;
            delete this._resHeaders.pragma;
        }

        // When the Cache-Control header field is not present in a request, caches MUST consider the no-cache request pragma-directive
        // as having the same effect as if "Cache-Control: no-cache" were present (see Section 5.2.1).
        if (!res.headers['cache-control'] && /no-cache/.test(res.headers.pragma)) {
            this._rescc['no-cache'] = true;
        }
    }

    CachePolicy.prototype.now = function now() {
        return Date.now();
    };

    CachePolicy.prototype.storable = function storable() {
        // The "no-store" request directive indicates that a cache MUST NOT store any part of either this request or any response to it.
        return !!(!this._reqcc['no-store'] && (
        // A cache MUST NOT store a response to any request, unless:
        // The request method is understood by the cache and defined as being cacheable, and
        'GET' === this._method || 'HEAD' === this._method || 'POST' === this._method && this._hasExplicitExpiration()) &&
        // the response status code is understood by the cache, and
        understoodStatuses.indexOf(this._status) !== -1 &&
        // the "no-store" cache directive does not appear in request or response header fields, and
        !this._rescc['no-store'] && (
        // the "private" response directive does not appear in the response, if the cache is shared, and
        !this._isShared || !this._rescc.private) && (
        // the Authorization header field does not appear in the request, if the cache is shared,
        !this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) && (
        // the response either:

        // contains an Expires header field, or
        this._resHeaders.expires ||
        // contains a max-age response directive, or
        // contains a s-maxage response directive and the cache is shared, or
        // contains a public response directive.
        this._rescc.public || this._rescc['max-age'] || this._rescc['s-maxage'] ||
        // has a status code that is defined as cacheable by default
        statusCodeCacheableByDefault.indexOf(this._status) !== -1));
    };

    CachePolicy.prototype._hasExplicitExpiration = function _hasExplicitExpiration() {
        // 4.2.1 Calculating Freshness Lifetime
        return this._isShared && this._rescc['s-maxage'] || this._rescc['max-age'] || this._resHeaders.expires;
    };

    CachePolicy.prototype._assertRequestHasHeaders = function _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
            throw Error("Request headers missing");
        }
    };

    CachePolicy.prototype.satisfiesWithoutRevalidation = function satisfiesWithoutRevalidation(req) {
        this._assertRequestHasHeaders(req);

        // When presented with a request, a cache MUST NOT reuse a stored response, unless:
        // the presented request does not contain the no-cache pragma (Section 5.4), nor the no-cache cache directive,
        // unless the stored response is successfully validated (Section 4.3), and
        var requestCC = parseCacheControl(req.headers['cache-control']);
        if (requestCC['no-cache'] || /no-cache/.test(req.headers.pragma)) {
            return false;
        }

        if (requestCC['max-age'] && this.age() > requestCC['max-age']) {
            return false;
        }

        if (requestCC['min-fresh'] && this.timeToLive() < 1000 * requestCC['min-fresh']) {
            return false;
        }

        // the stored response is either:
        // fresh, or allowed to be served stale
        if (this.stale()) {
            var allowsStale = requestCC['max-stale'] && !this._rescc['must-revalidate'] && (true === requestCC['max-stale'] || requestCC['max-stale'] > this.age() - this.maxAge());
            if (!allowsStale) {
                return false;
            }
        }

        return this._requestMatches(req, false);
    };

    CachePolicy.prototype._requestMatches = function _requestMatches(req, allowHeadMethod) {
        // The presented effective request URI and that of the stored response match, and
        return (!this._url || this._url === req.url) && this._host === req.headers.host && (
        // the request method associated with the stored response allows it to be used for the presented request, and
        !req.method || this._method === req.method || allowHeadMethod && 'HEAD' === req.method) &&
        // selecting header fields nominated by the stored response (if any) match those presented, and
        this._varyMatches(req);
    };

    CachePolicy.prototype._allowsStoringAuthenticated = function _allowsStoringAuthenticated() {
        //  following Cache-Control response directives (Section 5.2.2) have such an effect: must-revalidate, public, and s-maxage.
        return this._rescc['must-revalidate'] || this._rescc.public || this._rescc['s-maxage'];
    };

    CachePolicy.prototype._varyMatches = function _varyMatches(req) {
        if (!this._resHeaders.vary) {
            return true;
        }

        // A Vary header field-value of "*" always fails to match
        if (this._resHeaders.vary === '*') {
            return false;
        }

        var fields = this._resHeaders.vary.trim().toLowerCase().split(/\s*,\s*/);
        for (var _iterator2 = fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref3 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref3 = _i2.value;
            }

            var name = _ref3;

            if (req.headers[name] !== this._reqHeaders[name]) return false;
        }
        return true;
    };

    CachePolicy.prototype._copyWithoutHopByHopHeaders = function _copyWithoutHopByHopHeaders(inHeaders) {
        var headers = {};
        for (var name in inHeaders) {
            if (hopByHopHeaders[name]) continue;
            headers[name] = inHeaders[name];
        }
        // 9.1.  Connection
        if (inHeaders.connection) {
            var tokens = inHeaders.connection.trim().split(/\s*,\s*/);
            for (var _iterator3 = tokens, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref4 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref4 = _i3.value;
                }

                var _name = _ref4;

                delete headers[_name];
            }
        }
        if (headers.warning) {
            var warnings = headers.warning.split(/,/).filter(function (warning) {
                return !/^\s*1[0-9][0-9]/.test(warning);
            });
            if (!warnings.length) {
                delete headers.warning;
            } else {
                headers.warning = warnings.join(',').trim();
            }
        }
        return headers;
    };

    CachePolicy.prototype.responseHeaders = function responseHeaders() {
        var headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        var age = this.age();

        // A cache SHOULD generate 113 warning if it heuristically chose a freshness
        // lifetime greater than 24 hours and the response's age is greater than 24 hours.
        if (age > 3600 * 24 && !this._hasExplicitExpiration() && this.maxAge() > 3600 * 24) {
            headers.warning = (headers.warning ? `${headers.warning}, ` : '') + '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        return headers;
    };

    /**
     * Value of the Date response header or current time if Date was demed invalid
     * @return timestamp
     */


    CachePolicy.prototype.date = function date() {
        var dateValue = Date.parse(this._resHeaders.date);
        var maxClockDrift = 8 * 3600 * 1000;
        if (Number.isNaN(dateValue) || dateValue < this._responseTime - maxClockDrift || dateValue > this._responseTime + maxClockDrift) {
            return this._responseTime;
        }
        return dateValue;
    };

    /**
     * Value of the Age header, in seconds, updated for the current time.
     * May be fractional.
     *
     * @return Number
     */


    CachePolicy.prototype.age = function age() {
        var age = Math.max(0, (this._responseTime - this.date()) / 1000);
        if (this._resHeaders.age) {
            var ageValue = this._ageValue();
            if (ageValue > age) age = ageValue;
        }

        var residentTime = (this.now() - this._responseTime) / 1000;
        return age + residentTime;
    };

    CachePolicy.prototype._ageValue = function _ageValue() {
        var ageValue = parseInt(this._resHeaders.age);
        return isFinite(ageValue) ? ageValue : 0;
    };

    /**
     * Value of applicable max-age (or heuristic equivalent) in seconds. This counts since response's `Date`.
     *
     * For an up-to-date value, see `timeToLive()`.
     *
     * @return Number
     */


    CachePolicy.prototype.maxAge = function maxAge() {
        if (!this.storable() || this._rescc['no-cache']) {
            return 0;
        }

        // Shared responses with cookies are cacheable according to the RFC, but IMHO it'd be unwise to do so by default
        // so this implementation requires explicit opt-in via public header
        if (this._isShared && this._resHeaders['set-cookie'] && !this._rescc.public && !this._rescc.immutable) {
            return 0;
        }

        if (this._resHeaders.vary === '*') {
            return 0;
        }

        if (this._isShared) {
            if (this._rescc['proxy-revalidate']) {
                return 0;
            }
            // if a response includes the s-maxage directive, a shared cache recipient MUST ignore the Expires field.
            if (this._rescc['s-maxage']) {
                return parseInt(this._rescc['s-maxage'], 10);
            }
        }

        // If a response includes a Cache-Control field with the max-age directive, a recipient MUST ignore the Expires field.
        if (this._rescc['max-age']) {
            return parseInt(this._rescc['max-age'], 10);
        }

        var defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;

        var dateValue = this.date();
        if (this._resHeaders.expires) {
            var expires = Date.parse(this._resHeaders.expires);
            // A cache recipient MUST interpret invalid date formats, especially the value "0", as representing a time in the past (i.e., "already expired").
            if (Number.isNaN(expires) || expires < dateValue) {
                return 0;
            }
            return Math.max(defaultMinTtl, (expires - dateValue) / 1000);
        }

        if (this._resHeaders['last-modified']) {
            var lastModified = Date.parse(this._resHeaders['last-modified']);
            if (isFinite(lastModified) && dateValue > lastModified) {
                return Math.max(defaultMinTtl, (dateValue - lastModified) / 1000 * this._cacheHeuristic);
            }
        }

        return defaultMinTtl;
    };

    CachePolicy.prototype.timeToLive = function timeToLive() {
        return Math.max(0, this.maxAge() - this.age()) * 1000;
    };

    CachePolicy.prototype.stale = function stale() {
        return this.maxAge() <= this.age();
    };

    CachePolicy.fromObject = function fromObject(obj) {
        return new this(undefined, undefined, { _fromObject: obj });
    };

    CachePolicy.prototype._fromObject = function _fromObject(obj) {
        if (this._responseTime) throw Error("Reinitialized");
        if (!obj || obj.v !== 1) throw Error("Invalid serialization");

        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl = obj.imm !== undefined ? obj.imm : 24 * 3600 * 1000;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
    };

    CachePolicy.prototype.toObject = function toObject() {
        return {
            v: 1,
            t: this._responseTime,
            sh: this._isShared,
            ch: this._cacheHeuristic,
            imm: this._immutableMinTtl,
            st: this._status,
            resh: this._resHeaders,
            rescc: this._rescc,
            m: this._method,
            u: this._url,
            h: this._host,
            a: this._noAuthorization,
            reqh: this._reqHeaders,
            reqcc: this._reqcc
        };
    };

    /**
     * Headers for sending to the origin server to revalidate stale response.
     * Allows server to return 304 to allow reuse of the previous response.
     *
     * Hop by hop headers are always stripped.
     * Revalidation headers may be added or removed, depending on request.
     */


    CachePolicy.prototype.revalidationHeaders = function revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        var headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);

        // This implementation does not understand range requests
        delete headers['if-range'];

        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
            // revalidation allowed via HEAD
            // not for the same resource, or wasn't allowed to be cached anyway
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            return headers;
        }

        /* MUST send that entity-tag in any cache validation request (using If-Match or If-None-Match) if an entity-tag has been provided by the origin server. */
        if (this._resHeaders.etag) {
            headers['if-none-match'] = headers['if-none-match'] ? `${headers['if-none-match']}, ${this._resHeaders.etag}` : this._resHeaders.etag;
        }

        // Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.
        var forbidsWeakValidators = headers['accept-ranges'] || headers['if-match'] || headers['if-unmodified-since'] || this._method && this._method != 'GET';

        /* SHOULD send the Last-Modified value in non-subrange cache validation requests (using If-Modified-Since) if only a Last-Modified value has been provided by the origin server.
        Note: This implementation does not understand partial responses (206) */
        if (forbidsWeakValidators) {
            delete headers['if-modified-since'];

            if (headers['if-none-match']) {
                var etags = headers['if-none-match'].split(/,/).filter(function (etag) {
                    return !/^\s*W\//.test(etag);
                });
                if (!etags.length) {
                    delete headers['if-none-match'];
                } else {
                    headers['if-none-match'] = etags.join(',').trim();
                }
            }
        } else if (this._resHeaders['last-modified'] && !headers['if-modified-since']) {
            headers['if-modified-since'] = this._resHeaders['last-modified'];
        }

        return headers;
    };

    /**
     * Creates new CachePolicy with information combined from the previews response,
     * and the new revalidation response.
     *
     * Returns {policy, modified} where modified is a boolean indicating
     * whether the response body has been modified, and old cached body can't be used.
     *
     * @return {Object} {policy: CachePolicy, modified: Boolean}
     */


    CachePolicy.prototype.revalidatedPolicy = function revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if (!response || !response.headers) {
            throw Error("Response headers missing");
        }

        // These aren't going to be supported exactly, since one CachePolicy object
        // doesn't know about all the other cached objects.
        var matches = false;
        if (response.status !== undefined && response.status != 304) {
            matches = false;
        } else if (response.headers.etag && !/^\s*W\//.test(response.headers.etag)) {
            // "All of the stored responses with the same strong validator are selected.
            // If none of the stored responses contain the same strong validator,
            // then the cache MUST NOT use the new response to update any stored responses."
            matches = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, '') === response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
            // "If the new response contains a weak validator and that validator corresponds
            // to one of the cache's stored responses,
            // then the most recent of those matching stored responses is selected for update."
            matches = this._resHeaders.etag.replace(/^\s*W\//, '') === response.headers.etag.replace(/^\s*W\//, '');
        } else if (this._resHeaders['last-modified']) {
            matches = this._resHeaders['last-modified'] === response.headers['last-modified'];
        } else {
            // If the new response does not include any form of validator (such as in the case where
            // a client generates an If-Modified-Since request from a source other than the Last-Modified
            // response header field), and there is only one stored response, and that stored response also
            // lacks a validator, then that stored response is selected for update.
            if (!this._resHeaders.etag && !this._resHeaders['last-modified'] && !response.headers.etag && !response.headers['last-modified']) {
                matches = true;
            }
        }

        if (!matches) {
            return {
                policy: new this.constructor(request, response),
                modified: true
            };
        }

        // use other header fields provided in the 304 (Not Modified) response to replace all instances
        // of the corresponding header fields in the stored response.
        var headers = {};
        for (var k in this._resHeaders) {
            headers[k] = k in response.headers && !excludedFromRevalidationUpdate[k] ? response.headers[k] : this._resHeaders[k];
        }

        var newResponse = Object.assign({}, response, {
            status: this._status,
            method: this._method,
            headers
        });
        return {
            policy: new this.constructor(request, newResponse),
            modified: false
        };
    };

    return CachePolicy;
}();