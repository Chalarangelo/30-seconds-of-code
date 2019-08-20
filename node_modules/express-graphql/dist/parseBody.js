'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               *  Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                               *  All rights reserved.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                               *  LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                               *  of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               *   strict
                                                                                                                                                                                                                                                                               */

exports.parseBody = parseBody;

var _contentType = require('content-type');

var _contentType2 = _interopRequireDefault(_contentType);

var _rawBody = require('raw-body');

var _rawBody2 = _interopRequireDefault(_rawBody);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provided a "Request" provided by express or connect (typically a node style
 * HTTPClientRequest), Promise the body data contained.
 */
function parseBody(req) {
  return new Promise(function (resolve, reject) {
    var body = req.body;

    // If express has already parsed a body as a keyed object, use it.
    if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' && !(body instanceof Buffer)) {
      return resolve(body);
    }

    // Skip requests without content types.
    if (req.headers['content-type'] === undefined) {
      return resolve({});
    }

    var typeInfo = _contentType2.default.parse(req);

    // If express has already parsed a body as a string, and the content-type
    // was application/graphql, parse the string body.
    if (typeof body === 'string' && typeInfo.type === 'application/graphql') {
      return resolve(graphqlParser(body));
    }

    // Already parsed body we didn't recognise? Parse nothing.
    if (body) {
      return resolve({});
    }

    // Use the correct body parser based on Content-Type header.
    switch (typeInfo.type) {
      case 'application/graphql':
        return read(req, typeInfo, graphqlParser, resolve, reject);
      case 'application/json':
        return read(req, typeInfo, jsonEncodedParser, resolve, reject);
      case 'application/x-www-form-urlencoded':
        return read(req, typeInfo, urlEncodedParser, resolve, reject);
    }

    // If no Content-Type header matches, parse nothing.
    return resolve({});
  });
}

function jsonEncodedParser(body) {
  if (jsonObjRegex.test(body)) {
    /* eslint-disable no-empty */
    try {
      return JSON.parse(body);
    } catch (error) {}
    // Do nothing

    /* eslint-enable no-empty */
  }
  throw (0, _httpErrors2.default)(400, 'POST body sent invalid JSON.');
}

function urlEncodedParser(body) {
  return _querystring2.default.parse(body);
}

function graphqlParser(body) {
  return { query: body };
}

/**
 * RegExp to match an Object-opening brace "{" as the first non-space
 * in a string. Allowed whitespace is defined in RFC 7159:
 *
 *     x20  Space
 *     x09  Horizontal tab
 *     x0A  Line feed or New line
 *     x0D  Carriage return
 */
var jsonObjRegex = /^[\x20\x09\x0a\x0d]*\{/;

// Read and parse a request body.
function read(req, typeInfo, parseFn, resolve, reject) {
  var charset = (typeInfo.parameters.charset || 'utf-8').toLowerCase();

  // Assert charset encoding per JSON RFC 7159 sec 8.1
  if (charset.slice(0, 4) !== 'utf-') {
    throw (0, _httpErrors2.default)(415, 'Unsupported charset "' + charset.toUpperCase() + '".');
  }

  // Get content-encoding (e.g. gzip)
  var contentEncoding = req.headers['content-encoding'];
  var encoding = typeof contentEncoding === 'string' ? contentEncoding.toLowerCase() : 'identity';
  var length = encoding === 'identity' ? req.headers['content-length'] : null;
  var limit = 100 * 1024; // 100kb
  var stream = decompressed(req, encoding);

  // Read body from stream.
  (0, _rawBody2.default)(stream, { encoding: charset, length: length, limit: limit }, function (err, body) {
    if (err) {
      return reject(err.type === 'encoding.unsupported' ? (0, _httpErrors2.default)(415, 'Unsupported charset "' + charset.toUpperCase() + '".') : (0, _httpErrors2.default)(400, 'Invalid body: ' + err.message + '.'));
    }

    try {
      // Decode and parse body.
      return resolve(parseFn(body));
    } catch (error) {
      return reject(error);
    }
  });
}

// Return a decompressed stream, given an encoding.
function decompressed(req, encoding) {
  switch (encoding) {
    case 'identity':
      return req;
    case 'deflate':
      return req.pipe(_zlib2.default.createInflate());
    case 'gzip':
      return req.pipe(_zlib2.default.createGunzip());
  }
  throw (0, _httpErrors2.default)(415, 'Unsupported content-encoding "' + encoding + '".');
}