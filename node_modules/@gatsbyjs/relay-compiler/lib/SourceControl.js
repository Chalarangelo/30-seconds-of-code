/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var childProcess = require("child_process");

function execFile(cmd, args) {
  return new Promise(function (resolve, reject) {
    childProcess.execFile(cmd, args, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
/**
 * An abstraction over the source control system to make it injectable.
 */


var SourceControlMercurial = {
  addRemove: function () {
    var _addRemove = _asyncToGenerator(function* (added, removed) {
      // NOTE: Not using `hg addremove` as that has a bug when deleting a file
      // that was just added, but not yet committed: T10711513
      if (added.length > 0) {
        yield execFile('hg', ['add'].concat((0, _toConsumableArray2["default"])(added)));
      }

      if (removed.length > 0) {
        yield execFile('hg', ['forget'].concat((0, _toConsumableArray2["default"])(removed)));
      }
    });

    return function addRemove(_x, _x2) {
      return _addRemove.apply(this, arguments);
    };
  }()
};
module.exports = {
  SourceControlMercurial: SourceControlMercurial
};