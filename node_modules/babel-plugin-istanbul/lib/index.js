"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _istanbulLibInstrument = require("istanbul-lib-instrument");

const testExclude = require('test-exclude');

const findUp = require('find-up');

function getRealpath(n) {
  try {
    return (0, _fs.realpathSync)(n) || n;
  } catch (e) {
    return n;
  }
}

function makeShouldSkip() {
  let exclude;
  return function shouldSkip(file, opts) {
    if (!exclude || exclude.cwd !== opts.cwd) {
      const cwd = getRealpath(process.env.NYC_CWD || process.cwd());
      const nycConfig = process.env.NYC_CONFIG ? JSON.parse(process.env.NYC_CONFIG) : {};
      let config = {};

      if (Object.keys(opts).length > 0) {
        // explicitly configuring options in babel
        // takes precedence.
        config = opts;
      } else if (nycConfig.include || nycConfig.exclude) {
        // nyc was configured in a parent process (keep these settings).
        config = {
          include: nycConfig.include,
          exclude: nycConfig.exclude,
          // Make sure this is true unless explicitly set to `false`. `undefined` is still `true`.
          excludeNodeModules: nycConfig.excludeNodeModules !== false
        };
      } else {
        // fallback to loading config from key in package.json.
        config = {
          configKey: 'nyc',
          configPath: (0, _path.dirname)(findUp.sync('package.json', {
            cwd
          }))
        };
      }

      exclude = testExclude(Object.assign({
        cwd
      }, config));
    }

    return !exclude.shouldInstrument(file);
  };
}

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  const t = api.types;
  const shouldSkip = makeShouldSkip();
  return {
    visitor: {
      Program: {
        enter(path) {
          this.__dv__ = null;
          const realPath = getRealpath(this.file.opts.filename);

          if (shouldSkip(realPath, this.opts)) {
            return;
          }

          let {
            inputSourceMap
          } = this.opts;

          if (this.opts.useInlineSourceMaps !== false) {
            if (!inputSourceMap && this.file.inputMap) {
              inputSourceMap = this.file.inputMap.sourcemap;
            }
          }

          this.__dv__ = (0, _istanbulLibInstrument.programVisitor)(t, realPath, {
            coverageVariable: '__coverage__',
            inputSourceMap
          });

          this.__dv__.enter(path);
        },

        exit(path) {
          if (!this.__dv__) {
            return;
          }

          const result = this.__dv__.exit(path);

          if (this.opts.onCover) {
            this.opts.onCover(getRealpath(this.file.opts.filename), result.fileCoverage);
          }
        }

      }
    }
  };
});

exports.default = _default;