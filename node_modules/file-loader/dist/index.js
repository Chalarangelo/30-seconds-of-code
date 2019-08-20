'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = undefined;
exports.default = loader;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _schemaUtils = require('schema-utils');

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

var _options = require('./options.json');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable
  multiline-ternary,
*/
function loader(content) {
  if (!this.emitFile) throw new Error('File Loader\n\nemitFile is required from module system');

  var options = _loaderUtils2.default.getOptions(this) || {};

  (0, _schemaUtils2.default)(_options2.default, options, 'File Loader');

  var context = options.context || this.rootContext || this.options && this.options.context;

  var url = _loaderUtils2.default.interpolateName(this, options.name, {
    context,
    content,
    regExp: options.regExp
  });

  var outputPath = url;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url);
    } else {
      outputPath = _path2.default.posix.join(options.outputPath, url);
    }
  }

  if (options.useRelativePath) {
    var filePath = this.resourcePath;

    var issuer = options.context ? context : this._module && this._module.issuer && this._module.issuer.context;

    var relativeUrl = issuer && _path2.default.relative(issuer, filePath).split(_path2.default.sep).join('/');

    var relativePath = relativeUrl && `${_path2.default.dirname(relativeUrl)}/`;
    // eslint-disable-next-line no-bitwise
    if (~relativePath.indexOf('../')) {
      outputPath = _path2.default.posix.join(outputPath, relativePath, url);
    } else {
      outputPath = _path2.default.posix.join(relativePath, url);
    }
  }

  var publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url);
    } else if (options.publicPath.endsWith('/')) {
      publicPath = options.publicPath + url;
    } else {
      publicPath = `${options.publicPath}/${url}`;
    }

    publicPath = JSON.stringify(publicPath);
  }

  if (options.emitFile === undefined || options.emitFile) {
    this.emitFile(outputPath, content);
  }
  // TODO revert to ES2015 Module export, when new CSS Pipeline is in place
  return `module.exports = ${publicPath};`;
}

var raw = exports.raw = true;