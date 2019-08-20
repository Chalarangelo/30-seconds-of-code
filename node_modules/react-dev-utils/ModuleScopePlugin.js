/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');
const path = require('path');

class ModuleScopePlugin {
  constructor(appSrc, allowedFiles = []) {
    this.appSrc = appSrc;
    this.allowedFiles = new Set(allowedFiles);
  }

  apply(resolver) {
    const { appSrc } = this;
    resolver.plugin('file', (request, callback) => {
      // Unknown issuer, probably webpack internals
      if (!request.context.issuer) {
        return callback();
      }
      if (
        // If this resolves to a node_module, we don't care what happens next
        request.descriptionFileRoot.indexOf('/node_modules/') !== -1 ||
        request.descriptionFileRoot.indexOf('\\node_modules\\') !== -1 ||
        // Make sure this request was manual
        !request.__innerRequest_request
      ) {
        return callback();
      }
      // Resolve the issuer from our appSrc and make sure it's one of our files
      // Maybe an indexOf === 0 would be better?
      const relative = path.relative(appSrc, request.context.issuer);
      // If it's not in src/ or a subdirectory, not our request!
      if (relative.startsWith('../') || relative.startsWith('..\\')) {
        return callback();
      }
      const requestFullPath = path.resolve(
        path.dirname(request.context.issuer),
        request.__innerRequest_request
      );
      if (this.allowedFiles.has(requestFullPath)) {
        return callback();
      }
      // Find path from src to the requested file
      // Error if in a parent directory of src/
      const requestRelative = path.relative(appSrc, requestFullPath);
      if (
        requestRelative.startsWith('../') ||
        requestRelative.startsWith('..\\')
      ) {
        callback(
          new Error(
            `You attempted to import ${chalk.cyan(
              request.__innerRequest_request
            )} which falls outside of the project ${chalk.cyan(
              'src/'
            )} directory. ` +
              `Relative imports outside of ${chalk.cyan(
                'src/'
              )} are not supported. ` +
              `You can either move it inside ${chalk.cyan(
                'src/'
              )}, or add a symlink to it from project's ${chalk.cyan(
                'node_modules/'
              )}.`
          ),
          request
        );
      } else {
        callback();
      }
    });
  }
}

module.exports = ModuleScopePlugin;
