'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The MIT License (MIT)
 * Copyright (c) 2015-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

var Table = require('cli-table3');

/**
 * Wrapper class over `cli-table3` with default options preset.
 */

var TablePrinter = function TablePrinter(options) {
  _classCallCheck(this, TablePrinter);

  return new Table(Object.assign({}, options, {
    style: {
      head: ['blue'],
      border: ['gray']
    }
  }));
};

module.exports = TablePrinter;