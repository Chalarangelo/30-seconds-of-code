var mimeTypes = {};

var findType = function findType(extension) {
  return Object.entries(mimeTypes).find(function (type) {
    return type[1].includes(extension);
  }) || [];
};

export var addType = function addType(mime, extensions) {
  mimeTypes[mime] = extensions;
};
/**
 * Lookup a mime type based on extension
 * @param {string} path path to find extension for
 * @returns {string} mime found mime type
 */

export var getType = function getType(path) {
  var pathParts = path.split('/').slice(-1);
  var extension = pathParts[pathParts.length - 1].split('.')[1];
  var type = findType(extension);
  return type[0];
};
/**
 * Return file extension associated with a mime type
 * @param {string} type mime type to look up
 * @returns {string} extension file extension
 */

export var getExtension = function getExtension(type) {
  return (mimeTypes[type.toLowerCase()] || [])[0];
};
//# sourceMappingURL=mime.js.map