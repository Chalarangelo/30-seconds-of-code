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

const assert = require('assert');

const cdn = require('../cdn-details.json');
const errors = require('./errors');

const getCDNOrigin = () => {
  return `${cdn.origin}/${cdn.bucketName}/${cdn.releasesDir}`;
};

const getVersionedCDNUrl = () => {
  return `${getCDNOrigin()}/${cdn.latestVersion}`;
};

const getModuleUrl = (moduleName, buildType) => {
  assert(moduleName, errors['no-module-name']);

  if (buildType) {
    const pkgJson = require(`${moduleName}/package.json`);
    if (buildType === 'dev' && pkgJson.workbox.prodOnly) {
      // This is not due to a public-facing exception, so just throw an Error(),
      // without creating an entry in errors.js.
      throw Error(`The 'dev' build of ${moduleName} is not available.`);
    }
    return `${getVersionedCDNUrl()}/${moduleName}.${buildType.slice(0, 4)}.js`;
  }
  return `${getVersionedCDNUrl()}/${moduleName}.js`;
};

module.exports = {
  getCDNOrigin,
  getModuleUrl,
};
