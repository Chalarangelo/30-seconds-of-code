'use strict';

/**
 * Creates new custom importers that use the given `resourcePath` if libsass calls the custom importer with `prev`
 * being 'stdin'.
 *
 * Why do we need this? We have to use the `data` option of node-sass in order to compile our sass because
 * the `resourcePath` might not be an actual file on disk. When using the `data` option, libsass uses the string
 * 'stdin' instead of a filename.
 *
 * We have to fix this behavior in order to provide a consistent experience to the webpack user.
 *
 * @param {Function|Array<Function>} importer
 * @param {string} resourcePath
 * @returns {Array<Function>}
 */
function proxyCustomImporters(importer, resourcePath) {
  return [].concat(importer).map(
    // eslint-disable-next-line no-shadow
    (importer) =>
      function customImporter() {
        return importer.apply(
          this,
          // eslint-disable-next-line prefer-rest-params
          Array.from(arguments).map((arg, i) =>
            i === 1 && arg === 'stdin' ? resourcePath : arg
          )
        );
      }
  );
}

module.exports = proxyCustomImporters;
