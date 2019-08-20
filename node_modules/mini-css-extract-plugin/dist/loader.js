'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pitch = pitch;

exports.default = function () {};

var _module = require('module');

var _module2 = _interopRequireDefault(_module);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');

var _NodeTemplatePlugin2 = _interopRequireDefault(_NodeTemplatePlugin);

var _NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');

var _NodeTargetPlugin2 = _interopRequireDefault(_NodeTargetPlugin);

var _LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');

var _LibraryTemplatePlugin2 = _interopRequireDefault(_LibraryTemplatePlugin);

var _SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

var _SingleEntryPlugin2 = _interopRequireDefault(_SingleEntryPlugin);

var _LimitChunkCountPlugin = require('webpack/lib/optimize/LimitChunkCountPlugin');

var _LimitChunkCountPlugin2 = _interopRequireDefault(_LimitChunkCountPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODULE_TYPE = 'css/mini-extract';
const pluginName = 'mini-css-extract-plugin';

const exec = (loaderContext, code, filename) => {
  const module = new _module2.default(filename, loaderContext);
  module.paths = _module2.default._nodeModulePaths(loaderContext.context); // eslint-disable-line no-underscore-dangle
  module.filename = filename;
  module._compile(code, filename); // eslint-disable-line no-underscore-dangle
  return module.exports;
};

const findModuleById = (modules, id) => {
  for (const module of modules) {
    if (module.id === id) {
      return module;
    }
  }
  return null;
};

function pitch(request) {
  const query = _loaderUtils2.default.getOptions(this) || {};
  const loaders = this.loaders.slice(this.loaderIndex + 1);
  this.addDependency(this.resourcePath);
  const childFilename = '*'; // eslint-disable-line no-path-concat
  const publicPath = typeof query.publicPath === 'string' ? query.publicPath : this._compilation.outputOptions.publicPath;
  const outputOptions = {
    filename: childFilename,
    publicPath
  };
  const childCompiler = this._compilation.createChildCompiler(`${pluginName} ${request}`, outputOptions);
  new _NodeTemplatePlugin2.default(outputOptions).apply(childCompiler);
  new _LibraryTemplatePlugin2.default(null, 'commonjs2').apply(childCompiler);
  new _NodeTargetPlugin2.default().apply(childCompiler);
  new _SingleEntryPlugin2.default(this.context, `!!${request}`, pluginName).apply(childCompiler);
  new _LimitChunkCountPlugin2.default({ maxChunks: 1 }).apply(childCompiler);
  // We set loaderContext[MODULE_TYPE] = false to indicate we already in
  // a child compiler so we don't spawn another child compilers from there.
  childCompiler.hooks.thisCompilation.tap(`${pluginName} loader`, compilation => {
    compilation.hooks.normalModuleLoader.tap(`${pluginName} loader`, (loaderContext, module) => {
      loaderContext.emitFile = this.emitFile;
      loaderContext[MODULE_TYPE] = false; // eslint-disable-line no-param-reassign
      if (module.request === request) {
        // eslint-disable-next-line no-param-reassign
        module.loaders = loaders.map(loader => {
          return {
            loader: loader.path,
            options: loader.options,
            ident: loader.ident
          };
        });
      }
    });
  });

  let source;
  childCompiler.hooks.afterCompile.tap(pluginName, compilation => {
    source = compilation.assets[childFilename] && compilation.assets[childFilename].source();

    // Remove all chunk assets
    compilation.chunks.forEach(chunk => {
      chunk.files.forEach(file => {
        delete compilation.assets[file]; // eslint-disable-line no-param-reassign
      });
    });
  });

  const callback = this.async();
  childCompiler.runAsChild((err, entries, compilation) => {
    if (err) return callback(err);

    if (compilation.errors.length > 0) {
      return callback(compilation.errors[0]);
    }
    compilation.fileDependencies.forEach(dep => {
      this.addDependency(dep);
    }, this);
    compilation.contextDependencies.forEach(dep => {
      this.addContextDependency(dep);
    }, this);
    if (!source) {
      return callback(new Error("Didn't get a result from child compiler"));
    }
    let text;
    let locals;
    try {
      text = exec(this, source, request);
      locals = text && text.locals;
      if (!Array.isArray(text)) {
        text = [[null, text]];
      } else {
        text = text.map(line => {
          const module = findModuleById(compilation.modules, line[0]);
          return {
            identifier: module.identifier(),
            content: line[1],
            media: line[2],
            sourceMap: line[3]
          };
        });
      }
      this[MODULE_TYPE](text);
    } catch (e) {
      return callback(e);
    }
    let resultSource = `// extracted by ${pluginName}`;
    if (locals && typeof resultSource !== 'undefined') {
      resultSource += `\nmodule.exports = ${JSON.stringify(locals)};`;
    }

    return callback(null, resultSource);
  });
}