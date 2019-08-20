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

const ol = require('common-tags').oneLine;

module.exports = {
  'unable-to-get-rootdir': `Unable to get the root directory of your web app.`,
  'no-extension': ol`Unable to detect a usable extension for a file in your web
    app directory.`,
  'invalid-file-manifest-name': ol`The File Manifest Name must have at least one
    character.`,
  'unable-to-get-file-manifest-name': 'Unable to get a file manifest name.',
  'invalid-sw-dest': `The 'swDest' value must be a valid path.`,
  'unable-to-get-sw-name': 'Unable to get a service worker file name.',
  'unable-to-get-save-config': ol`An error occurred when asking to save details
    in a config file.`,
  'unable-to-get-file-hash': ol`An error occurred when attempting to create a
    file hash.`,
  'unable-to-get-file-size': ol`An error occurred when attempting to get a file
    size.`,
  'unable-to-glob-files': 'An error occurred when globbing for files.',
  'unable-to-make-manifest-directory': ol`Unable to make output directory for
    file manifest.`,
  'read-manifest-template-failure': 'Unable to read template for file manifest',
  'populating-manifest-tmpl-failed': ol`An error occurred when populating the
    file manifest template.`,
  'manifest-file-write-failure': 'Unable to write the file manifest.',
  'unable-to-make-sw-directory': ol`Unable to make the directories to output
    the service worker path.`,
  'read-sw-template-failure': ol`Unable to read the service worker template
    file.`,
  'sw-write-failure': 'Unable to write the service worker file.',
  'sw-write-failure-directory': ol`Unable to write the service worker file;
    'swDest' should be a full path to the file, not a path to a directory.`,
  'unable-to-copy-workbox-libraries': ol`One or more of the Workbox libraries
    could not be copied over to the destination directory: `,
  'invalid-generate-sw-input': ol`The input to generateSW() must be an object.`,
  'invalid-glob-directory': ol`The supplied globDirectory must be a path as a
    string.`,
  'invalid-dont-cache-bust': ol`The supplied 'dontCacheBustUrlsMatching'
    parameter must be a RegExp.`,
  'invalid-exclude-files': 'The excluded files should be an array of strings.',
  'invalid-get-manifest-entries-input': ol`The input to
    'getFileManifestEntries()' must be an object.`,
  'invalid-manifest-path': ol`The supplied manifest path is not a string with
    at least one character.`,
  'invalid-manifest-entries': ol`The manifest entries must be an array of
    strings or JavaScript objects containing a url parameter.`,
  'invalid-manifest-format': ol`The value of the 'format' option passed to
    generateFileManifest() must be either 'iife' (the default) or 'es'.`,
  'invalid-static-file-globs': ol`The 'globPatterns' value must be an array
    of strings.`,
  'invalid-templated-urls': ol`The 'templatedUrls' value should be an object
    that maps URLs to either a string, or to an array of glob patterns.`,
  'templated-url-matches-glob': ol`One of the 'templatedUrls' URLs is already
    being tracked via 'globPatterns': `,
  'invalid-glob-ignores': ol`The 'globIgnores' parameter must be an array of
    glob pattern strings.`,
  'manifest-entry-bad-url': ol`The generated manifest contains an entry without
    a URL string. This is likely an error with workbox-build.`,
  'modify-url-prefix-bad-prefixes': ol`The 'modifyUrlPrefix' parameter must be
    an object with string key value pairs.`,
  'invalid-inject-manifest-arg': ol`The input to 'injectManifest()' must be an
    object.`,
  'injection-point-not-found': ol`Unable to find a place to inject the manifest.
    Please ensure that your service worker file contains the following: `,
  'multiple-injection-points': ol`Please ensure that your 'swSrc' file contains
    only one match for the RegExp:`,
  'populating-sw-tmpl-failed': ol`Unable to generate service worker from
    template.`,
  'useless-glob-pattern': ol`One of the glob patterns doesn't match any files.
    Please remove or fix the following: `,
  'bad-template-urls-asset': ol`There was an issue using one of the provided
    'templatedUrls'.`,
  'invalid-runtime-caching': ol`The 'runtimeCaching' parameter must an an
    array of objects with at least a 'urlPattern' and 'handler'.`,
  'static-file-globs-deprecated': ol`'staticFileGlobs' is deprecated.
    Please use 'globPatterns' instead.`,
  'dynamic-url-deprecated': ol`'dynamicUrlToDependencies' is deprecated.
    Please use 'templatedUrls' instead.`,
  'urlPattern-is-required': ol`The 'urlPattern' option is required when using
    'runtimeCaching'.`,
  'handler-is-required': ol`The 'handler' option is required when using
    runtimeCaching.`,
  'invalid-generate-file-manifest-arg': ol`The input to generateFileManifest()
    must be an Object.`,
  'invalid-sw-src': `The 'swSrc' file can't be read.`,
  'same-src-and-dest': ol`'swSrc' and 'swDest' should not be set to the same ` +
    `file. Please use a different file path for 'swDest'.`,
  'only-regexp-routes-supported': ol`Please use a regular expression object as
    the urlPattern parameter. (Express-style routes are not currently
    supported.)`,
  'bad-runtime-caching-config': ol`An unknown configuration option was used 
    with runtimeCaching:`,
  'invalid-network-timeout-seconds': ol`When using networkTimeoutSeconds, you
    must set the handler to 'networkFirst'.`,
  'no-module-name': ol`You must provide a moduleName parameter when calling
    getModuleUrl().`,
};
