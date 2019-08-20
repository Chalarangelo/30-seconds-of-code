'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = undefined;
exports.default = loader;

var _loaderUtils = require('loader-utils');

var _schemaUtils = require('schema-utils');

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

var _normalizeFallback = require('./utils/normalizeFallback');

var _normalizeFallback2 = _interopRequireDefault(_normalizeFallback);

var _options = require('./options.json');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Loader Mode
const raw = exports.raw = true; /* eslint-disable
                                  global-require,
                                  no-param-reassign,
                                  prefer-destructuring,
                                  import/no-dynamic-require,
                                */
function loader(src) {
  // Loader Options
  const options = (0, _loaderUtils.getOptions)(this) || {};

  (0, _schemaUtils2.default)(_options2.default, options, 'URL Loader');

  const file = this.resourcePath;
  // Set limit for resource inlining (file size)
  let limit = options.limit;

  if (limit) {
    limit = parseInt(limit, 10);
  }
  // Get MIME type
  const mimetype = options.mimetype || _mime2.default.getType(file);

  // No limit or within the specified limit
  if (!limit || src.length < limit) {
    if (typeof src === 'string') {
      src = Buffer.from(src);
    }

    return `module.exports = ${JSON.stringify(`data:${mimetype || ''};base64,${src.toString('base64')}`)}`;
  }

  // Normalize the fallback.
  const {
    loader: fallbackLoader,
    options: fallbackOptions
  } = (0, _normalizeFallback2.default)(options.fallback, options);

  // Require the fallback.
  const fallback = require(fallbackLoader);

  // Call the fallback, passing a copy of the loader context. The copy has the query replaced. This way, the fallback
  // loader receives the query which was intended for it instead of the query which was intended for url-loader.
  const fallbackLoaderContext = Object.assign({}, this, {
    query: fallbackOptions
  });

  return fallback.call(fallbackLoaderContext, src);
}