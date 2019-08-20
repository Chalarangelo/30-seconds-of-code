/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = require('./Deferred');

var invariant = require('./invariant');

/**
 * A map of asynchronous values that can be get or set in any order. Unlike a
 * normal map, setting the value for a particular key more than once throws.
 * Also unlike a normal map, a key can either be resolved or rejected.
 */

var PromiseMap = function () {
  function PromiseMap() {
    _classCallCheck(this, PromiseMap);

    this._deferred = {};
  }

  PromiseMap.prototype.get = function get(key) {
    return getDeferred(this._deferred, key).getPromise();
  };

  PromiseMap.prototype.resolveKey = function resolveKey(key, value) {
    var entry = getDeferred(this._deferred, key);
    !!entry.isSettled() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'PromiseMap: Already settled `%s`.', key) : invariant(false) : void 0;
    entry.resolve(value);
  };

  PromiseMap.prototype.rejectKey = function rejectKey(key, reason) {
    var entry = getDeferred(this._deferred, key);
    !!entry.isSettled() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'PromiseMap: Already settled `%s`.', key) : invariant(false) : void 0;
    entry.reject(reason);
  };

  return PromiseMap;
}();

function getDeferred(entries, key) {
  if (!entries.hasOwnProperty(key)) {
    entries[key] = new Deferred();
  }
  return entries[key];
}

module.exports = PromiseMap;