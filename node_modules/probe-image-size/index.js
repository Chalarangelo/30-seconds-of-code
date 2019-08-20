'use strict';


var probeStream = require('./stream');
var probeHttp   = require('./http');
var nextTick    = require('next-tick');
var merge       = require('deepmerge');

/* eslint-disable consistent-return */

module.exports = function get_image_size(src, options, callback) {

  if (typeof src.on === 'function' && typeof src.emit === 'function') {
    // looks like an EventEmitter, treating it as a stream
    callback = options;

    if (!callback) return probeStream(src);

    probeStream(src)
      .then(function (size) { nextTick(callback.bind(null, null, size)); })
      .catch(function (err) { nextTick(callback.bind(null, err)); });
    return;
  }

  // HTTP (not stream)
  if (typeof src === 'string') {
    // `probe(string [, options, callback])`
    if (typeof options === 'function') {
      callback = options;
      options  = {};
    }
    options = options || {};

  } else {
    // Legacy style, `probe(object [, callback])`
    callback = options;
    options  = merge({}, src);
    src      = options.url;
    delete options.url;
  }

  if (!callback) return probeHttp(src, options);

  probeHttp(src, options)
    .then(function (size) { nextTick(callback.bind(null, null, size)); })
    .catch(function (err) { nextTick(callback.bind(null, err)); });
};


module.exports.parsers = require('./lib/parsers_stream');
module.exports.sync    = require('./sync');
module.exports.Error   = require('./lib/common').ProbeError;
