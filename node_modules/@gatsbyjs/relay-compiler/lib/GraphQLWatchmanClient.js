/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */
'use strict';

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var watchman = require("fb-watchman");

var MAX_ATTEMPT_LIMIT = 5;

function delay(delayMs) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, delayMs);
  });
}

var GraphQLWatchmanClient =
/*#__PURE__*/
function () {
  GraphQLWatchmanClient.isAvailable = function isAvailable() {
    return new Promise(function (resolve) {
      var client = new GraphQLWatchmanClient(MAX_ATTEMPT_LIMIT);
      client.on('error', function () {
        resolve(false);
        client.end();
      });
      client.hasCapability('relative_root').then(function (hasRelativeRoot) {
        resolve(hasRelativeRoot);
        client.end();
      }, function () {
        resolve(false);
        client.end();
      });
    });
  };

  function GraphQLWatchmanClient() {
    var attemptLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    this._client = new watchman.Client();
    this._attemptLimit = Math.max(Math.min(MAX_ATTEMPT_LIMIT, attemptLimit), 0);
  }

  var _proto = GraphQLWatchmanClient.prototype;

  _proto._command = function _command() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      _this._client.command(args, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };

  _proto.command =
  /*#__PURE__*/
  function () {
    var _command2 = _asyncToGenerator(function* () {
      var attempt = 0;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      while (true) {
        try {
          attempt++;
          return yield this._command.apply(this, args);
        } catch (error) {
          if (attempt > this._attemptLimit) {
            throw error;
          }

          yield delay(Math.pow(2, attempt) * 500);

          this._client.end();

          this._client = new watchman.Client();
        }
      }
    });

    return function command() {
      return _command2.apply(this, arguments);
    };
  }();

  _proto.hasCapability =
  /*#__PURE__*/
  function () {
    var _hasCapability = _asyncToGenerator(function* (capability) {
      var resp = yield this.command('list-capabilities');
      return resp.capabilities.includes(capability);
    });

    return function hasCapability(_x) {
      return _hasCapability.apply(this, arguments);
    };
  }();

  _proto.watchProject =
  /*#__PURE__*/
  function () {
    var _watchProject = _asyncToGenerator(function* (baseDir) {
      var resp = yield this.command('watch-project', baseDir);

      if ('warning' in resp) {
        console.error('Warning:', resp.warning);
      }

      return {
        root: resp.watch,
        relativePath: resp.relative_path
      };
    });

    return function watchProject(_x2) {
      return _watchProject.apply(this, arguments);
    };
  }();

  _proto.on = function on(event, callback) {
    this._client.on(event, callback);
  };

  _proto.end = function end() {
    this._client.end();
  };

  return GraphQLWatchmanClient;
}();

module.exports = GraphQLWatchmanClient;