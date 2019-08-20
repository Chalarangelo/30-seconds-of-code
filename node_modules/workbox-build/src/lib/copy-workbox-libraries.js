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

const fse = require('fs-extra');
const path = require('path');

const errors = require('./errors');
const useBuildType = require('./use-build-type');

// Used to filter the libraries to copy based on our package.json dependencies.
const WORKBOX_PREFIX = 'workbox-';
const BUILD_TYPES = [
  'dev',
  'prod',
];

/**
 * This copies over a set of runtime libraries used by Workbox into a
 * local directory, which should be deployed alongside your service worker file.
 *
 * As an alternative to deploying these local copies, you could instead use
 * Workbox from its official CDN URL.
 *
 * This method is exposed for the benefit of developers using
 * [injectManifest()]{@link module:workbox-build.injectManifest} who would
 * prefer not to use the CDN copies of Workbox. Developers using
 * [generateSW()]{@link module:workbox-build.generateSW} don't need to
 * explicitly call this method, as it's called automatically when
 * `importWorkboxFrom` is set to `local`.
 *
 * @param {string} destDirectory The path to the parent directory under which
 * the new directory of libraries will be created.
 * @return {Promise<string>} The name of the newly created directory.
 *
 * @alias module:workbox-build.copyWorkboxLibraries
 */
module.exports = async (destDirectory) => {
  const thisPkg = require('../../package.json');
  // Use the version string from workbox-build in the name of the parent
  // directory. This should be safe, because lerna will bump workbox-build's
  // pkg.version whenever one of the dependent libraries gets bumped, and we
  // care about versioning the dependent libraries.
  const workboxDirectoryName = `workbox-v${thisPkg.version}`;
  const workboxDirectoryPath = path.join(destDirectory, workboxDirectoryName);
  await fse.ensureDir(workboxDirectoryPath);

  const copyPromises = [];
  const librariesToCopy = Object.keys(thisPkg.dependencies).filter(
    (dependency) => dependency.startsWith(WORKBOX_PREFIX));
  for (const library of librariesToCopy) {
    const pkg = require(`${library}/package.json`);
    const defaultPathToLibrary = require.resolve(`${library}/${pkg.main}`);

    for (const buildType of BUILD_TYPES) {
      // Special-case logic for workbox-sw, which only has a single build type.
      // This prevents a race condition with two identical copy promises;
      // see https://github.com/GoogleChrome/workbox/issues/1180
      if (library === 'workbox-sw' && buildType === BUILD_TYPES[0]) {
        continue;
      }

      const srcPath = useBuildType(defaultPathToLibrary, buildType);
      const destPath = path.join(workboxDirectoryPath,
        path.basename(srcPath));
      copyPromises.push(fse.copy(srcPath, destPath));
      copyPromises.push(fse.copy(`${srcPath}.map`, `${destPath}.map`));
    }
  }

  try {
    await Promise.all(copyPromises);
    return workboxDirectoryName;
  } catch (error) {
    throw Error(`${errors['unable-to-copy-workbox-libraries']} ${error}`);
  }
};
