/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var chalk = require("chalk");

var GraphQLConsoleReporter =
/*#__PURE__*/
function () {
  function GraphQLConsoleReporter(options) {
    this._verbose = options.verbose;
    this._quiet = options.quiet;
  }

  var _proto = GraphQLConsoleReporter.prototype;

  _proto.reportMessage = function reportMessage(message) {
    if (!this._quiet) {
      process.stdout.write(message + '\n');
    }
  };

  _proto.reportTime = function reportTime(name, ms) {
    /* $FlowFixMe(>=0.68.0 site=react_native_fb,react_native_oss) This comment
     * suppresses an error found when Flow v0.68 was deployed. To see the error
     * delete this comment and run Flow. */
    if (this._verbose && !this.quiet) {
      var time = ms === 0 ? chalk.gray(' <1ms') : ms < 1000 ? chalk.blue(leftPad(5, ms + 'ms')) : chalk.red(Math.floor(ms / 10) / 100 + 's');
      process.stdout.write('  ' + time + ' ' + chalk.gray(name) + '\n');
    }
  };

  _proto.reportError = function reportError(caughtLocation, error) {
    if (!this._quiet) {
      process.stdout.write(chalk.red('ERROR:\n' + error.message + '\n'));

      if (this._verbose) {
        var frames = error.stack.match(/^ {4}at .*$/gm);

        if (frames) {
          process.stdout.write(chalk.gray('From: ' + caughtLocation + '\n' + frames.join('\n') + '\n'));
        }
      }
    }
  };

  return GraphQLConsoleReporter;
}();

function leftPad(len, str) {
  return new Array(len - str.length + 1).join(' ') + str;
}

module.exports = GraphQLConsoleReporter;