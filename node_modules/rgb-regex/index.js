'use strict';

module.exports = function rgbRegex(options) {
  options = options || {};

  return options.exact ?
    /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/ :
    /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/ig;
}
