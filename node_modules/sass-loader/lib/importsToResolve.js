'use strict';

const path = require('path');

const utils = require('loader-utils');

const matchModuleImport = /^~([^/]+|@[^/]+[/][^/]+)$/;

/**
 * When libsass tries to resolve an import, it uses a special algorithm.
 * Since the sass-loader uses webpack to resolve the modules, we need to simulate that algorithm. This function
 * returns an array of import paths to try. The last entry in the array is always the original url
 * to enable straight-forward webpack.config aliases.
 *
 * @param {string} url
 * @returns {Array<string>}
 */
function importsToResolve(url) {
  const request = utils.urlToRequest(url);
  // Keep in mind: ext can also be something like '.datepicker' when the true extension is omitted and the filename contains a dot.
  // @see https://github.com/webpack-contrib/sass-loader/issues/167
  const ext = path.extname(request);

  if (matchModuleImport.test(url)) {
    return [request, url];
  }

  // libsass' import algorithm works like this:

  // In case there is a file extension...
  //   - If the file is a CSS-file, do not include it all, but just link it via @import url().
  //   - The exact file name must match (no auto-resolving of '_'-modules).
  if (ext === '.css') {
    return [];
  }
  if (ext === '.scss' || ext === '.sass') {
    return [request, url];
  }

  // In case there is no file extension...
  //   - Prefer modules starting with '_'.
  //   - File extension precedence: .scss, .sass, .css.
  const basename = path.basename(request);

  if (basename.charAt(0) === '_') {
    return [`${request}.scss`, `${request}.sass`, `${request}.css`, url];
  }

  const dirname = path.dirname(request);

  return [
    `${dirname}/_${basename}.scss`,
    `${dirname}/_${basename}.sass`,
    `${dirname}/_${basename}.css`,
    `${request}.scss`,
    `${request}.sass`,
    `${request}.css`,
    url,
  ];
}

module.exports = importsToResolve;
