/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import '../_version.mjs';

export const QUEUE_NAME = 'workbox-google-analytics';
export const MAX_RETENTION_TIME = 60 * 48; // Two days in minutes
export const GOOGLE_ANALYTICS_HOST = 'www.google-analytics.com';
export const GTM_HOST = 'www.googletagmanager.com';
export const ANALYTICS_JS_PATH = '/analytics.js';
export const GTAG_JS_PATH = '/gtag/js';
export const COLLECT_DEFAULT_PATH = '/collect';

// This RegExp matches all known Measurement Protocol single-hit collect
// endpoints. Most of the time the default path (/collect) is used, but
// occasionally an experimental endpoint is used when testing new features,
// (e.g. /r/collect or /j/collect)
export const COLLECT_PATHS_REGEX = /^\/(\w+\/)?collect/;
