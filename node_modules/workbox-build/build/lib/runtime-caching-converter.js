'use strict';

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var ol = require('common-tags').oneLine;

var errors = require('./errors');
var stringifyWithoutComments = require('./stringify-without-comments');

/**
 * Given a set of options that configures `sw-toolbox`'s behavior, convert it
 * into a string that would configure equivalent `workbox-sw` behavior.
 *
 * @param {Object} options See
 *        https://googlechrome.github.io/sw-toolbox/api.html#options
 * @return {string} A JSON string representing the equivalent options.
 *
 * @private
 */
function getOptionsString() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var plugins = [];
  if (options.plugins) {
    // Using libs because JSON.stringify won't handle functions.
    plugins = options.plugins.map(stringifyWithoutComments);
    delete options.plugins;
  }

  // Pull handler-specific config from the options object, since they are
  // not directly used to construct a Plugin instance. If set, need to be
  // passed as options to the handler constructor instead.
  var handlerOptionKeys = ['cacheName', 'networkTimeoutSeconds', 'fetchOptions', 'matchOptions'];
  var handlerOptions = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(handlerOptionKeys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (key in options) {
        handlerOptions[key] = options[key];
        delete options[key];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var pluginsMapping = {
    backgroundSync: 'workbox.backgroundSync.Plugin',
    broadcastUpdate: 'workbox.broadcastUpdate.Plugin',
    expiration: 'workbox.expiration.Plugin',
    cacheableResponse: 'workbox.cacheableResponse.Plugin'
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(options)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref = _step2.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var pluginName = _ref2[0];
      var pluginConfig = _ref2[1];

      // Ensure that we have some valid configuration to pass to Plugin().
      if ((0, _keys2.default)(pluginConfig).length === 0) {
        continue;
      }

      var pluginString = pluginsMapping[pluginName];
      if (!pluginString) {
        throw new Error(`${errors['bad-runtime-caching-config']} ${pluginName}`);
      }

      var pluginCode = void 0;
      switch (pluginName) {
        // Special case logic for plugins that have a required parameter, and then
        // an additional optional config parameter.
        case 'backgroundSync':
          {
            var name = pluginConfig.name;
            pluginCode = `new ${pluginString}(${(0, _stringify2.default)(name)}`;
            if ('options' in pluginConfig) {
              pluginCode += `, ${(0, _stringify2.default)(pluginConfig.options)}`;
            }
            pluginCode += `)`;

            break;
          }

        case 'broadcastUpdate':
          {
            var channelName = pluginConfig.channelName;
            pluginCode = `new ${pluginString}(${(0, _stringify2.default)(channelName)}`;
            if ('options' in pluginConfig) {
              pluginCode += `, ${(0, _stringify2.default)(pluginConfig.options)}`;
            }
            pluginCode += `)`;

            break;
          }

        // For plugins that just pass in an Object to the constructor, like
        // expiration and cacheableResponse
        default:
          {
            pluginCode = `new ${pluginString}(${(0, _stringify2.default)(pluginConfig)})`;
          }
      }

      plugins.push(pluginCode);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if ((0, _keys2.default)(handlerOptions).length > 0 || plugins.length > 0) {
    var optionsString = (0, _stringify2.default)(handlerOptions).slice(1, -1);
    return ol`{
      ${optionsString ? optionsString + ',' : ''}
      plugins: [${plugins.join(', ')}]
    }`;
  } else {
    return '';
  }
}

module.exports = function () {
  var runtimeCaching = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return runtimeCaching.map(function (entry) {
    var method = entry.method || 'GET';

    if (!entry.urlPattern) {
      throw new Error(errors['urlPattern-is-required']);
    }

    if (!entry.handler) {
      throw new Error(errors['handler-is-required']);
    }

    // This validation logic is a bit too gnarly for joi, so it's manually
    // implemented here.
    if (entry.options && entry.options.networkTimeoutSeconds && entry.handler !== 'networkFirst') {
      throw new Error(errors['invalid-network-timeout-seconds']);
    }

    // urlPattern might be either a string or a RegExp object.
    // If it's a string, it needs to be quoted. If it's a RegExp, it should
    // be used as-is.
    var matcher = typeof entry.urlPattern === 'string' ? (0, _stringify2.default)(entry.urlPattern) : entry.urlPattern;

    if (typeof entry.handler === 'string') {
      var optionsString = getOptionsString(entry.options || {});

      var strategyString = `workbox.strategies.${entry.handler}(${optionsString})`;

      return `workbox.routing.registerRoute(` + `${matcher}, ${strategyString}, '${method}');\n`;
    } else if (typeof entry.handler === 'function') {
      return `workbox.routing.registerRoute(` + `${matcher}, ${entry.handler}, '${method}');\n`;
    }
  }).filter(function (entry) {
    return Boolean(entry);
  }); // Remove undefined map() return values.
};