'use strict';

module.exports = function hslaRegex(options) {
  options = options || {};

  return options.exact ?
    /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/ :
    /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)/ig;
}
