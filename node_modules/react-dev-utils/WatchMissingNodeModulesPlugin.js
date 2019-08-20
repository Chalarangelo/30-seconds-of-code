/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This Webpack plugin ensures `npm install <library>` forces a project rebuild.
// We’re not sure why this isn't Webpack's default behavior.
// See https://github.com/facebookincubator/create-react-app/issues/186.

'use strict';

class WatchMissingNodeModulesPlugin {
  constructor(nodeModulesPath) {
    this.nodeModulesPath = nodeModulesPath;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      var missingDeps = compilation.missingDependencies;
      var nodeModulesPath = this.nodeModulesPath;

      // If any missing files are expected to appear in node_modules...
      if (missingDeps.some(file => file.indexOf(nodeModulesPath) !== -1)) {
        // ...tell webpack to watch node_modules recursively until they appear.
        compilation.contextDependencies.push(nodeModulesPath);
      }

      callback();
    });
  }
}

module.exports = WatchMissingNodeModulesPlugin;
