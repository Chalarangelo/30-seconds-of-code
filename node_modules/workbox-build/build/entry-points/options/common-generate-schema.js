'use strict';

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

var joi = require('joi');

var baseSchema = require('./base-schema');
var defaults = require('./defaults');
var regExpObject = require('./reg-exp-object');

// Add some constraints that apply to both generateSW and generateSWString.
module.exports = baseSchema.keys({
  cacheId: joi.string(),
  clientsClaim: joi.boolean().default(defaults.clientsClaim),
  directoryIndex: joi.string(),
  ignoreUrlParametersMatching: joi.array().items(regExpObject),
  navigateFallback: joi.string().default(defaults.navigateFallback),
  navigateFallbackBlacklist: joi.array().items(regExpObject),
  navigateFallbackWhitelist: joi.array().items(regExpObject),
  offlineGoogleAnalytics: joi.alternatives().try(joi.boolean(), joi.object()).default(defaults.offlineGoogleAnalytics),
  runtimeCaching: joi.array().items(joi.object().keys({
    method: joi.string().valid('DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'),
    urlPattern: [regExpObject, joi.string()],
    handler: [joi.func(), joi.string().valid('cacheFirst', 'cacheOnly', 'networkFirst', 'networkOnly', 'staleWhileRevalidate')],
    options: joi.object().keys({
      backgroundSync: joi.object().keys({
        name: joi.string().required(),
        options: joi.object()
      }),
      broadcastUpdate: joi.object().keys({
        channelName: joi.string().required(),
        options: joi.object()
      }),
      cacheableResponse: joi.object().keys({
        statuses: joi.array().items(joi.number().min(0).max(599)),
        headers: joi.object()
      }).or('statuses', 'headers'),
      cacheName: joi.string(),
      expiration: joi.object().keys({
        maxEntries: joi.number().min(1),
        maxAgeSeconds: joi.number().min(1),
        purgeOnQuotaError: joi.boolean().default(defaults.purgeOnQuotaError)
      }).or('maxEntries', 'maxAgeSeconds'),
      networkTimeoutSeconds: joi.number().min(1),
      plugins: joi.array().items(joi.object()),
      fetchOptions: joi.object(),
      matchOptions: joi.object()
    }).with('expiration', 'cacheName')
  }).requiredKeys('urlPattern', 'handler')),
  skipWaiting: joi.boolean().default(defaults.skipWaiting)
});