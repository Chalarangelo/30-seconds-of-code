'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var template = require('lodash.template');
var swTemplate = require('../templates/sw-template');

var errors = require('./errors');
var runtimeCachingConverter = require('./runtime-caching-converter');
var stringifyWithoutComments = require('./stringify-without-comments');

module.exports = function (_ref) {
  var cacheId = _ref.cacheId,
      clientsClaim = _ref.clientsClaim,
      directoryIndex = _ref.directoryIndex,
      ignoreUrlParametersMatching = _ref.ignoreUrlParametersMatching,
      importScripts = _ref.importScripts,
      manifestEntries = _ref.manifestEntries,
      modulePathPrefix = _ref.modulePathPrefix,
      navigateFallback = _ref.navigateFallback,
      navigateFallbackBlacklist = _ref.navigateFallbackBlacklist,
      navigateFallbackWhitelist = _ref.navigateFallbackWhitelist,
      offlineGoogleAnalytics = _ref.offlineGoogleAnalytics,
      runtimeCaching = _ref.runtimeCaching,
      skipWaiting = _ref.skipWaiting,
      workboxSWImport = _ref.workboxSWImport;

  // These are all options that can be passed to the precacheAndRoute() method.
  var precacheOptions = {
    directoryIndex,
    // An array of RegExp objects can't be serialized by JSON.stringify()'s
    // default behavior, so if it's given, convert it manually.
    ignoreUrlParametersMatching: ignoreUrlParametersMatching ? [] : undefined
  };

  var precacheOptionsString = (0, _stringify2.default)(precacheOptions, null, 2);
  if (ignoreUrlParametersMatching) {
    precacheOptionsString = precacheOptionsString.replace(`"ignoreUrlParametersMatching": []`, `"ignoreUrlParametersMatching": [` + `${ignoreUrlParametersMatching.join(', ')}]`);
  }

  var offlineAnalyticsConfigString = void 0;
  if (offlineGoogleAnalytics) {
    // If offlineGoogleAnalytics is a truthy value, we need to convert it to the
    // format expected by the template.
    offlineAnalyticsConfigString = offlineGoogleAnalytics === true ?
    // If it's the literal value true, then use an empty config string.
    '{}' :
    // Otherwise, convert the config object into a more complex string, taking
    // into account the fact that functions might need to be stringified.
    stringifyWithoutComments(offlineGoogleAnalytics);
  }

  try {
    var populatedTemplate = template(swTemplate)({
      cacheId,
      clientsClaim,
      importScripts,
      manifestEntries,
      modulePathPrefix,
      navigateFallback,
      navigateFallbackBlacklist,
      navigateFallbackWhitelist,
      offlineAnalyticsConfigString,
      precacheOptionsString,
      skipWaiting,
      runtimeCaching: runtimeCachingConverter(runtimeCaching),
      workboxSWImport
    });

    // Clean up multiple blank lines.
    return populatedTemplate.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  } catch (error) {
    throw new Error(`${errors['populating-sw-tmpl-failed']} '${error.message}'`);
  }
};