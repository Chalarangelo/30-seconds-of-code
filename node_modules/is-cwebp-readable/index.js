'use strict';

const fileType = require('file-type');

module.exports = function isCwebpReadable(buf) {
  const type = fileType(buf);

  if (!type) {
    return false;
  }

  const ext = type.ext;

  return ext === 'png' || ext === 'jpg' || ext === 'tif' || ext === 'webp';
};
