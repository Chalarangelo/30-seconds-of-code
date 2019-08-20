'use strict';

/**
 * @name PromisedResolve
 * @type {Function}
 * @param {string} dir
 * @param {string} request
 * @returns Promise
 */

/**
 * @name Importer
 * @type {Function}
 * @param {string} url
 * @param {string} prev
 * @param {Function<Error, string>} done
 */

const path = require('path');

const importsToResolve = require('./importsToResolve');

const matchCss = /\.css$/;

/**
 * Returns an importer that uses webpack's resolving algorithm.
 *
 * It's important that the returned function has the correct number of arguments
 * (based on whether the call is sync or async) because otherwise node-sass doesn't exit.
 *
 * @param {string} resourcePath
 * @param {PromisedResolve} resolve
 * @param {Function<string>} addNormalizedDependency
 * @returns {Importer}
 */
function webpackImporter(resourcePath, resolve, addNormalizedDependency) {
  function dirContextFrom(fileContext) {
    return path.dirname(
      // The first file is 'stdin' when we're using the data option
      fileContext === 'stdin' ? resourcePath : fileContext
    );
  }

  // eslint-disable-next-line no-shadow
  function startResolving(dir, importsToResolve) {
    return importsToResolve.length === 0
      ? Promise.reject()
      : resolve(dir, importsToResolve[0]).then(
          (resolvedFile) => {
            // Add the resolvedFilename as dependency. Although we're also using stats.includedFiles, this might come
            // in handy when an error occurs. In this case, we don't get stats.includedFiles from node-sass.
            addNormalizedDependency(resolvedFile);
            return {
              // By removing the CSS file extension, we trigger node-sass to include the CSS file instead of just linking it.
              file: resolvedFile.replace(matchCss, ''),
            };
          },
          () => {
            const [, ...tailResult] = importsToResolve;

            return startResolving(dir, tailResult);
          }
        );
  }

  return (url, prev, done) => {
    startResolving(dirContextFrom(prev), importsToResolve(url))
      // Catch all resolving errors, return the original file and pass responsibility back to other custom importers
      .catch(() => {
        return {
          file: url,
        };
      })
      .then(done);
  };
}

module.exports = webpackImporter;
