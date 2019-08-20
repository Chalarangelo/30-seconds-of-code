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

const maximumSizeTransform = require('./maximum-size-transform');
const modifyUrlPrefixTranform = require('./modify-url-prefix-transform');
const noRevisionForUrlsMatchingTransform =
  require('./no-revision-for-urls-matching-transform');

/**
 * A `ManifestTransform` function can be used to modify the modify the `url` or
 * `revision` properties of some or all of the
 * {@link module:workbox-build#ManifestEntry|ManifestEntries} in the manifest.
 *
 * Deleting the `revision` property of an entry will cause
 * the corresponding `url` to be precached without cache-busting parameters
 * applied, which is to say, it implies that the URL itself contains
 * proper versioning info. If the `revision` property is present, it must be
 * set to a string.
 *
 * @example <caption>A transformation that prepended the origin of a CDN for any
 * URL starting with '/assets/' could be implemented as:</caption>
 *
 * const cdnTransform = (manifestEntries) => {
 *   const manifest = manifestEntries.map(entry => {
 *     const cdnOrigin = 'https://example.com';
 *     if (entry.url.startsWith('/assets/')) {
 *       entry.url = cdnOrigin + entry.url;
 *     }
 *     return entry;
 *   });
 *   return {manifest, warnings: []};
 * };
 *
 * @example <caption>A transformation that removes the revision field when the
 * URL contains an 8-character hash surrounded by '.', indicating that it
 * already contains revision information:</caption>
 *
 * const removeRevisionTransform = (manifestEntries) => {
 *   const manifest = manifestEntries.map(entry => {
 *     const hashRegExp = /\.\w{8}\./;
 *     if (entry.url.match(hashRegExp)) {
 *       delete entry.revision;
 *     }
 *     return entry;
 *   });
 *   return {manifest, warnings: []};
 * };
 *
 * @callback ManifestTransform
 * @param {Array<module:workbox-build.ManifestEntry>} manifestEntries The full
 * array of entries, prior to the current transformation.
 * @return {module:workbox-build.ManifestTransformResult}
 * The array of entries with the transformation applied, and optionally, any
 * warnings that should be reported back to the build tool.
 *
 * @memberof module:workbox-build
 */

module.exports = ({
  dontCacheBustUrlsMatching,
  fileDetails,
  manifestTransforms,
  maximumFileSizeToCacheInBytes,
  modifyUrlPrefix,
}) => {
  let allWarnings = [];

  // Take the array of fileDetail objects and convert it into an array of
  // {url, revision, size} objects, with \ replaced with /.
  const normalizedManifest = fileDetails.map((fileDetails) => {
    return {
      url: fileDetails.file.replace(/\\/g, '/'),
      revision: fileDetails.hash,
      size: fileDetails.size,
    };
  });

  let transformsToApply = [];

  if (maximumFileSizeToCacheInBytes) {
    transformsToApply.push(maximumSizeTransform(maximumFileSizeToCacheInBytes));
  }

  if (modifyUrlPrefix) {
    transformsToApply.push(modifyUrlPrefixTranform(modifyUrlPrefix));
  }

  if (dontCacheBustUrlsMatching) {
    transformsToApply.push(
      noRevisionForUrlsMatchingTransform(dontCacheBustUrlsMatching));
  }

  // Any additional manifestTransforms that were passed will be applied last.
  transformsToApply = transformsToApply.concat(manifestTransforms || []);

  let transformedManifest = normalizedManifest;
  for (const transform of transformsToApply) {
    const {manifest, warnings} = transform(transformedManifest);
    transformedManifest = manifest;
    allWarnings = allWarnings.concat(warnings || []);
  }

  // Generate some metadata about the manifest before we clear out the size
  // properties from each entry.
  const count = transformedManifest.length;
  let size = 0;
  for (const manifestEntry of transformedManifest) {
    size += manifestEntry.size;
    delete manifestEntry.size;
  }

  return {
    count,
    size,
    manifestEntries: transformedManifest,
    warnings: allWarnings,
  };
};
