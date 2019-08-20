'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var glob = require('glob');
var path = require('path');

var errors = require('./errors');
var getFileSize = require('./get-file-size');
var getFileHash = require('./get-file-hash');

module.exports = function (globOptions) {
  var globDirectory = globOptions.globDirectory,
      globFollow = globOptions.globFollow,
      globIgnores = globOptions.globIgnores,
      globPattern = globOptions.globPattern,
      globStrict = globOptions.globStrict;

  var globbedFiles = void 0;
  try {
    globbedFiles = glob.sync(globPattern, {
      cwd: globDirectory,
      follow: globFollow,
      ignore: globIgnores,
      strict: globStrict
    });
  } catch (err) {
    throw new Error(errors['unable-to-glob-files'] + ` '${err.message}'`);
  }

  if (globbedFiles.length === 0) {
    throw new Error(errors['useless-glob-pattern'] + ' ' + (0, _stringify2.default)({ globDirectory, globPattern, globIgnores }, null, 2));
  }

  var fileDetails = globbedFiles.map(function (file) {
    var fullPath = path.join(globDirectory, file);
    var fileSize = getFileSize(fullPath);
    if (fileSize === null) {
      return null;
    }

    var fileHash = getFileHash(fullPath);
    return {
      file: `${path.relative(globDirectory, fullPath)}`,
      hash: fileHash,
      size: fileSize
    };
  });

  // If !== null, means it's a valid file.
  return fileDetails.filter(function (details) {
    return details !== null;
  });
};