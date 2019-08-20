'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {
  return name ? '"' + name + '" ' : '';
};

module.exports = exports['default'];