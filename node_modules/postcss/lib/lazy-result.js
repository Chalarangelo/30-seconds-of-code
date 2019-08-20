"use strict";

exports.__esModule = true;
exports.default = void 0;

var _mapGenerator = _interopRequireDefault(require("./map-generator"));

var _stringify2 = _interopRequireDefault(require("./stringify"));

var _warnOnce = _interopRequireDefault(require("./warn-once"));

var _result = _interopRequireDefault(require("./result"));

var _parse = _interopRequireDefault(require("./parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function';
}
/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([autoprefixer]).process(css)
 */


var LazyResult =
/*#__PURE__*/
function () {
  function LazyResult(processor, css, opts) {
    this.stringified = false;
    this.processed = false;
    var root;

    if (typeof css === 'object' && css !== null && css.type === 'root') {
      root = css;
    } else if (css instanceof LazyResult || css instanceof _result.default) {
      root = css.root;

      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      var parser = _parse.default;
      if (opts.syntax) parser = opts.syntax.parse;
      if (opts.parser) parser = opts.parser;
      if (parser.parse) parser = parser.parse;

      try {
        root = parser(css, opts);
      } catch (error) {
        this.error = error;
      }
    }

    this.result = new _result.default(processor, root, opts);
  }
  /**
   * Returns a {@link Processor} instance, which will be used
   * for CSS transformations.
   *
   * @type {Processor}
   */


  var _proto = LazyResult.prototype;

  /**
   * Processes input CSS through synchronous plugins
   * and calls {@link Result#warnings()}.
   *
   * @return {Warning[]} Warnings from plugins.
   */
  _proto.warnings = function warnings() {
    return this.sync().warnings();
  }
  /**
   * Alias for the {@link LazyResult#css} property.
   *
   * @example
   * lazy + '' === lazy.css
   *
   * @return {string} Output CSS.
   */
  ;

  _proto.toString = function toString() {
    return this.css;
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls `onFulfilled` with a Result instance. If a plugin throws
   * an error, the `onRejected` callback will be executed.
   *
   * It implements standard Promise API.
   *
   * @param {onFulfilled} onFulfilled Callback will be executed
   *                                  when all plugins will finish work.
   * @param {onRejected}  onRejected  Callback will be executed on any error.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css, { from: cssPath }).then(result => {
   *   console.log(result.css)
   * })
   */
  ;

  _proto.then = function then(onFulfilled, onRejected) {
    if (process.env.NODE_ENV !== 'production') {
      if (!('from' in this.opts)) {
        (0, _warnOnce.default)('Without `from` option PostCSS could generate wrong source map ' + 'and will not find Browserslist config. Set it to CSS file path ' + 'or to `undefined` to prevent this warning.');
      }
    }

    return this.async().then(onFulfilled, onRejected);
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls onRejected for each error thrown in any plugin.
   *
   * It implements standard Promise API.
   *
   * @param {onRejected} onRejected Callback will be executed on any error.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css).then(result => {
   *   console.log(result.css)
   * }).catch(error => {
   *   console.error(error)
   * })
   */
  ;

  _proto.catch = function _catch(onRejected) {
    return this.async().catch(onRejected);
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls onFinally on any error or when all plugins will finish work.
   *
   * It implements standard Promise API.
   *
   * @param {onFinally} onFinally Callback will be executed on any error or
   *                              when all plugins will finish work.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css).finally(() => {
   *   console.log('processing ended')
   * })
   */
  ;

  _proto.finally = function _finally(onFinally) {
    return this.async().then(onFinally, onFinally);
  };

  _proto.handleError = function handleError(error, plugin) {
    try {
      this.error = error;

      if (error.name === 'CssSyntaxError' && !error.plugin) {
        error.plugin = plugin.postcssPlugin;
        error.setMessage();
      } else if (plugin.postcssVersion) {
        if (process.env.NODE_ENV !== 'production') {
          var pluginName = plugin.postcssPlugin;
          var pluginVer = plugin.postcssVersion;
          var runtimeVer = this.result.processor.version;
          var a = pluginVer.split('.');
          var b = runtimeVer.split('.');

          if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
            console.error('Unknown error from PostCSS plugin. Your current PostCSS ' + 'version is ' + runtimeVer + ', but ' + pluginName + ' uses ' + pluginVer + '. Perhaps this is the source of the error below.');
          }
        }
      }
    } catch (err) {
      if (console && console.error) console.error(err);
    }
  };

  _proto.asyncTick = function asyncTick(resolve, reject) {
    var _this = this;

    if (this.plugin >= this.processor.plugins.length) {
      this.processed = true;
      return resolve();
    }

    try {
      var plugin = this.processor.plugins[this.plugin];
      var promise = this.run(plugin);
      this.plugin += 1;

      if (isPromise(promise)) {
        promise.then(function () {
          _this.asyncTick(resolve, reject);
        }).catch(function (error) {
          _this.handleError(error, plugin);

          _this.processed = true;
          reject(error);
        });
      } else {
        this.asyncTick(resolve, reject);
      }
    } catch (error) {
      this.processed = true;
      reject(error);
    }
  };

  _proto.async = function async() {
    var _this2 = this;

    if (this.processed) {
      return new Promise(function (resolve, reject) {
        if (_this2.error) {
          reject(_this2.error);
        } else {
          resolve(_this2.stringify());
        }
      });
    }

    if (this.processing) {
      return this.processing;
    }

    this.processing = new Promise(function (resolve, reject) {
      if (_this2.error) return reject(_this2.error);
      _this2.plugin = 0;

      _this2.asyncTick(resolve, reject);
    }).then(function () {
      _this2.processed = true;
      return _this2.stringify();
    });
    return this.processing;
  };

  _proto.sync = function sync() {
    if (this.processed) return this.result;
    this.processed = true;

    if (this.processing) {
      throw new Error('Use process(css).then(cb) to work with async plugins');
    }

    if (this.error) throw this.error;

    for (var _iterator = this.result.processor.plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var plugin = _ref;
      var promise = this.run(plugin);

      if (isPromise(promise)) {
        throw new Error('Use process(css).then(cb) to work with async plugins');
      }
    }

    return this.result;
  };

  _proto.run = function run(plugin) {
    this.result.lastPlugin = plugin;

    try {
      return plugin(this.result.root, this.result);
    } catch (error) {
      this.handleError(error, plugin);
      throw error;
    }
  };

  _proto.stringify = function stringify() {
    if (this.stringified) return this.result;
    this.stringified = true;
    this.sync();
    var opts = this.result.opts;
    var str = _stringify2.default;
    if (opts.syntax) str = opts.syntax.stringify;
    if (opts.stringifier) str = opts.stringifier;
    if (str.stringify) str = str.stringify;
    var map = new _mapGenerator.default(str, this.result.root, this.result.opts);
    var data = map.generate();
    this.result.css = data[0];
    this.result.map = data[1];
    return this.result;
  };

  _createClass(LazyResult, [{
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
    /**
     * Options from the {@link Processor#process} call.
     *
     * @type {processOptions}
     */

  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
    /**
     * Processes input CSS through synchronous plugins, converts `Root`
     * to a CSS string and returns {@link Result#css}.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {string}
     * @see Result#css
     */

  }, {
    key: "css",
    get: function get() {
      return this.stringify().css;
    }
    /**
     * An alias for the `css` property. Use it with syntaxes
     * that generate non-CSS output.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {string}
     * @see Result#content
     */

  }, {
    key: "content",
    get: function get() {
      return this.stringify().content;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#map}.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {SourceMapGenerator}
     * @see Result#map
     */

  }, {
    key: "map",
    get: function get() {
      return this.stringify().map;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#root}.
     *
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error.
     *
     * This is why this method is only for debug purpose,
     * you should always use {@link LazyResult#then}.
     *
     * @type {Root}
     * @see Result#root
     */

  }, {
    key: "root",
    get: function get() {
      return this.sync().root;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#messages}.
     *
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error.
     *
     * This is why this method is only for debug purpose,
     * you should always use {@link LazyResult#then}.
     *
     * @type {Message[]}
     * @see Result#messages
     */

  }, {
    key: "messages",
    get: function get() {
      return this.sync().messages;
    }
  }]);

  return LazyResult;
}();

var _default = LazyResult;
/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhenktcmVzdWx0LmVzNiJdLCJuYW1lcyI6WyJpc1Byb21pc2UiLCJvYmoiLCJ0aGVuIiwiTGF6eVJlc3VsdCIsInByb2Nlc3NvciIsImNzcyIsIm9wdHMiLCJzdHJpbmdpZmllZCIsInByb2Nlc3NlZCIsInJvb3QiLCJ0eXBlIiwiUmVzdWx0IiwibWFwIiwiaW5saW5lIiwicHJldiIsInBhcnNlciIsInBhcnNlIiwic3ludGF4IiwiZXJyb3IiLCJyZXN1bHQiLCJ3YXJuaW5ncyIsInN5bmMiLCJ0b1N0cmluZyIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImFzeW5jIiwiY2F0Y2giLCJmaW5hbGx5Iiwib25GaW5hbGx5IiwiaGFuZGxlRXJyb3IiLCJwbHVnaW4iLCJuYW1lIiwicG9zdGNzc1BsdWdpbiIsInNldE1lc3NhZ2UiLCJwb3N0Y3NzVmVyc2lvbiIsInBsdWdpbk5hbWUiLCJwbHVnaW5WZXIiLCJydW50aW1lVmVyIiwidmVyc2lvbiIsImEiLCJzcGxpdCIsImIiLCJwYXJzZUludCIsImNvbnNvbGUiLCJlcnIiLCJhc3luY1RpY2siLCJyZXNvbHZlIiwicmVqZWN0IiwicGx1Z2lucyIsImxlbmd0aCIsInByb21pc2UiLCJydW4iLCJQcm9taXNlIiwic3RyaW5naWZ5IiwicHJvY2Vzc2luZyIsIkVycm9yIiwibGFzdFBsdWdpbiIsInN0ciIsInN0cmluZ2lmaWVyIiwiTWFwR2VuZXJhdG9yIiwiZGF0YSIsImdlbmVyYXRlIiwiY29udGVudCIsIm1lc3NhZ2VzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3ZCLFNBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkIsT0FBT0EsR0FBRyxDQUFDQyxJQUFYLEtBQW9CLFVBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztJQVFNQyxVOzs7QUFDSixzQkFBYUMsU0FBYixFQUF3QkMsR0FBeEIsRUFBNkJDLElBQTdCLEVBQW1DO0FBQ2pDLFNBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsUUFBSUMsSUFBSjs7QUFDQSxRQUFJLE9BQU9KLEdBQVAsS0FBZSxRQUFmLElBQTJCQSxHQUFHLEtBQUssSUFBbkMsSUFBMkNBLEdBQUcsQ0FBQ0ssSUFBSixLQUFhLE1BQTVELEVBQW9FO0FBQ2xFRCxNQUFBQSxJQUFJLEdBQUdKLEdBQVA7QUFDRCxLQUZELE1BRU8sSUFBSUEsR0FBRyxZQUFZRixVQUFmLElBQTZCRSxHQUFHLFlBQVlNLGVBQWhELEVBQXdEO0FBQzdERixNQUFBQSxJQUFJLEdBQUdKLEdBQUcsQ0FBQ0ksSUFBWDs7QUFDQSxVQUFJSixHQUFHLENBQUNPLEdBQVIsRUFBYTtBQUNYLFlBQUksT0FBT04sSUFBSSxDQUFDTSxHQUFaLEtBQW9CLFdBQXhCLEVBQXFDTixJQUFJLENBQUNNLEdBQUwsR0FBVyxFQUFYO0FBQ3JDLFlBQUksQ0FBQ04sSUFBSSxDQUFDTSxHQUFMLENBQVNDLE1BQWQsRUFBc0JQLElBQUksQ0FBQ00sR0FBTCxDQUFTQyxNQUFULEdBQWtCLEtBQWxCO0FBQ3RCUCxRQUFBQSxJQUFJLENBQUNNLEdBQUwsQ0FBU0UsSUFBVCxHQUFnQlQsR0FBRyxDQUFDTyxHQUFwQjtBQUNEO0FBQ0YsS0FQTSxNQU9BO0FBQ0wsVUFBSUcsTUFBTSxHQUFHQyxjQUFiO0FBQ0EsVUFBSVYsSUFBSSxDQUFDVyxNQUFULEVBQWlCRixNQUFNLEdBQUdULElBQUksQ0FBQ1csTUFBTCxDQUFZRCxLQUFyQjtBQUNqQixVQUFJVixJQUFJLENBQUNTLE1BQVQsRUFBaUJBLE1BQU0sR0FBR1QsSUFBSSxDQUFDUyxNQUFkO0FBQ2pCLFVBQUlBLE1BQU0sQ0FBQ0MsS0FBWCxFQUFrQkQsTUFBTSxHQUFHQSxNQUFNLENBQUNDLEtBQWhCOztBQUVsQixVQUFJO0FBQ0ZQLFFBQUFBLElBQUksR0FBR00sTUFBTSxDQUFDVixHQUFELEVBQU1DLElBQU4sQ0FBYjtBQUNELE9BRkQsQ0FFRSxPQUFPWSxLQUFQLEVBQWM7QUFDZCxhQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDtBQUNGOztBQUVELFNBQUtDLE1BQUwsR0FBYyxJQUFJUixlQUFKLENBQVdQLFNBQVgsRUFBc0JLLElBQXRCLEVBQTRCSCxJQUE1QixDQUFkO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQXFHQTs7Ozs7O1NBTUFjLFEsR0FBQSxvQkFBWTtBQUNWLFdBQU8sS0FBS0MsSUFBTCxHQUFZRCxRQUFaLEVBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O1NBUUFFLFEsR0FBQSxvQkFBWTtBQUNWLFdBQU8sS0FBS2pCLEdBQVo7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtCQUgsSSxHQUFBLGNBQU1xQixXQUFOLEVBQW1CQyxVQUFuQixFQUErQjtBQUM3QixRQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxVQUFJLEVBQUUsVUFBVSxLQUFLckIsSUFBakIsQ0FBSixFQUE0QjtBQUMxQiwrQkFDRSxtRUFDQSxpRUFEQSxHQUVBLDRDQUhGO0FBS0Q7QUFDRjs7QUFDRCxXQUFPLEtBQUtzQixLQUFMLEdBQWExQixJQUFiLENBQWtCcUIsV0FBbEIsRUFBK0JDLFVBQS9CLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBaUJBSyxLLEdBQUEsZ0JBQU9MLFVBQVAsRUFBbUI7QUFDakIsV0FBTyxLQUFLSSxLQUFMLEdBQWFDLEtBQWIsQ0FBbUJMLFVBQW5CLENBQVA7QUFDRDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkFNLE8sR0FBQSxrQkFBU0MsU0FBVCxFQUFvQjtBQUNsQixXQUFPLEtBQUtILEtBQUwsR0FBYTFCLElBQWIsQ0FBa0I2QixTQUFsQixFQUE2QkEsU0FBN0IsQ0FBUDtBQUNELEc7O1NBRURDLFcsR0FBQSxxQkFBYWQsS0FBYixFQUFvQmUsTUFBcEIsRUFBNEI7QUFDMUIsUUFBSTtBQUNGLFdBQUtmLEtBQUwsR0FBYUEsS0FBYjs7QUFDQSxVQUFJQSxLQUFLLENBQUNnQixJQUFOLEtBQWUsZ0JBQWYsSUFBbUMsQ0FBQ2hCLEtBQUssQ0FBQ2UsTUFBOUMsRUFBc0Q7QUFDcERmLFFBQUFBLEtBQUssQ0FBQ2UsTUFBTixHQUFlQSxNQUFNLENBQUNFLGFBQXRCO0FBQ0FqQixRQUFBQSxLQUFLLENBQUNrQixVQUFOO0FBQ0QsT0FIRCxNQUdPLElBQUlILE1BQU0sQ0FBQ0ksY0FBWCxFQUEyQjtBQUNoQyxZQUFJWixPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxjQUFJVyxVQUFVLEdBQUdMLE1BQU0sQ0FBQ0UsYUFBeEI7QUFDQSxjQUFJSSxTQUFTLEdBQUdOLE1BQU0sQ0FBQ0ksY0FBdkI7QUFDQSxjQUFJRyxVQUFVLEdBQUcsS0FBS3JCLE1BQUwsQ0FBWWYsU0FBWixDQUFzQnFDLE9BQXZDO0FBQ0EsY0FBSUMsQ0FBQyxHQUFHSCxTQUFTLENBQUNJLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBUjtBQUNBLGNBQUlDLENBQUMsR0FBR0osVUFBVSxDQUFDRyxLQUFYLENBQWlCLEdBQWpCLENBQVI7O0FBRUEsY0FBSUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxLQUFTRSxDQUFDLENBQUMsQ0FBRCxDQUFWLElBQWlCQyxRQUFRLENBQUNILENBQUMsQ0FBQyxDQUFELENBQUYsQ0FBUixHQUFpQkcsUUFBUSxDQUFDRCxDQUFDLENBQUMsQ0FBRCxDQUFGLENBQTlDLEVBQXNEO0FBQ3BERSxZQUFBQSxPQUFPLENBQUM1QixLQUFSLENBQ0UsNkRBQ0EsYUFEQSxHQUNnQnNCLFVBRGhCLEdBQzZCLFFBRDdCLEdBQ3dDRixVQUR4QyxHQUNxRCxRQURyRCxHQUVBQyxTQUZBLEdBRVksa0RBSGQ7QUFLRDtBQUNGO0FBQ0Y7QUFDRixLQXRCRCxDQXNCRSxPQUFPUSxHQUFQLEVBQVk7QUFDWixVQUFJRCxPQUFPLElBQUlBLE9BQU8sQ0FBQzVCLEtBQXZCLEVBQThCNEIsT0FBTyxDQUFDNUIsS0FBUixDQUFjNkIsR0FBZDtBQUMvQjtBQUNGLEc7O1NBRURDLFMsR0FBQSxtQkFBV0MsT0FBWCxFQUFvQkMsTUFBcEIsRUFBNEI7QUFBQTs7QUFDMUIsUUFBSSxLQUFLakIsTUFBTCxJQUFlLEtBQUs3QixTQUFMLENBQWUrQyxPQUFmLENBQXVCQyxNQUExQyxFQUFrRDtBQUNoRCxXQUFLNUMsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGFBQU95QyxPQUFPLEVBQWQ7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsVUFBSWhCLE1BQU0sR0FBRyxLQUFLN0IsU0FBTCxDQUFlK0MsT0FBZixDQUF1QixLQUFLbEIsTUFBNUIsQ0FBYjtBQUNBLFVBQUlvQixPQUFPLEdBQUcsS0FBS0MsR0FBTCxDQUFTckIsTUFBVCxDQUFkO0FBQ0EsV0FBS0EsTUFBTCxJQUFlLENBQWY7O0FBRUEsVUFBSWpDLFNBQVMsQ0FBQ3FELE9BQUQsQ0FBYixFQUF3QjtBQUN0QkEsUUFBQUEsT0FBTyxDQUFDbkQsSUFBUixDQUFhLFlBQU07QUFDakIsVUFBQSxLQUFJLENBQUM4QyxTQUFMLENBQWVDLE9BQWYsRUFBd0JDLE1BQXhCO0FBQ0QsU0FGRCxFQUVHckIsS0FGSCxDQUVTLFVBQUFYLEtBQUssRUFBSTtBQUNoQixVQUFBLEtBQUksQ0FBQ2MsV0FBTCxDQUFpQmQsS0FBakIsRUFBd0JlLE1BQXhCOztBQUNBLFVBQUEsS0FBSSxDQUFDekIsU0FBTCxHQUFpQixJQUFqQjtBQUNBMEMsVUFBQUEsTUFBTSxDQUFDaEMsS0FBRCxDQUFOO0FBQ0QsU0FORDtBQU9ELE9BUkQsTUFRTztBQUNMLGFBQUs4QixTQUFMLENBQWVDLE9BQWYsRUFBd0JDLE1BQXhCO0FBQ0Q7QUFDRixLQWhCRCxDQWdCRSxPQUFPaEMsS0FBUCxFQUFjO0FBQ2QsV0FBS1YsU0FBTCxHQUFpQixJQUFqQjtBQUNBMEMsTUFBQUEsTUFBTSxDQUFDaEMsS0FBRCxDQUFOO0FBQ0Q7QUFDRixHOztTQUVEVSxLLEdBQUEsaUJBQVM7QUFBQTs7QUFDUCxRQUFJLEtBQUtwQixTQUFULEVBQW9CO0FBQ2xCLGFBQU8sSUFBSStDLE9BQUosQ0FBWSxVQUFDTixPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxNQUFJLENBQUNoQyxLQUFULEVBQWdCO0FBQ2RnQyxVQUFBQSxNQUFNLENBQUMsTUFBSSxDQUFDaEMsS0FBTixDQUFOO0FBQ0QsU0FGRCxNQUVPO0FBQ0wrQixVQUFBQSxPQUFPLENBQUMsTUFBSSxDQUFDTyxTQUFMLEVBQUQsQ0FBUDtBQUNEO0FBQ0YsT0FOTSxDQUFQO0FBT0Q7O0FBQ0QsUUFBSSxLQUFLQyxVQUFULEVBQXFCO0FBQ25CLGFBQU8sS0FBS0EsVUFBWjtBQUNEOztBQUVELFNBQUtBLFVBQUwsR0FBa0IsSUFBSUYsT0FBSixDQUFZLFVBQUNOLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNqRCxVQUFJLE1BQUksQ0FBQ2hDLEtBQVQsRUFBZ0IsT0FBT2dDLE1BQU0sQ0FBQyxNQUFJLENBQUNoQyxLQUFOLENBQWI7QUFDaEIsTUFBQSxNQUFJLENBQUNlLE1BQUwsR0FBYyxDQUFkOztBQUNBLE1BQUEsTUFBSSxDQUFDZSxTQUFMLENBQWVDLE9BQWYsRUFBd0JDLE1BQXhCO0FBQ0QsS0FKaUIsRUFJZmhELElBSmUsQ0FJVixZQUFNO0FBQ1osTUFBQSxNQUFJLENBQUNNLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxhQUFPLE1BQUksQ0FBQ2dELFNBQUwsRUFBUDtBQUNELEtBUGlCLENBQWxCO0FBU0EsV0FBTyxLQUFLQyxVQUFaO0FBQ0QsRzs7U0FFRHBDLEksR0FBQSxnQkFBUTtBQUNOLFFBQUksS0FBS2IsU0FBVCxFQUFvQixPQUFPLEtBQUtXLE1BQVo7QUFDcEIsU0FBS1gsU0FBTCxHQUFpQixJQUFqQjs7QUFFQSxRQUFJLEtBQUtpRCxVQUFULEVBQXFCO0FBQ25CLFlBQU0sSUFBSUMsS0FBSixDQUNKLHNEQURJLENBQU47QUFFRDs7QUFFRCxRQUFJLEtBQUt4QyxLQUFULEVBQWdCLE1BQU0sS0FBS0EsS0FBWDs7QUFFaEIseUJBQW1CLEtBQUtDLE1BQUwsQ0FBWWYsU0FBWixDQUFzQitDLE9BQXpDLGtIQUFrRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsVUFBekNsQixNQUF5QztBQUNoRCxVQUFJb0IsT0FBTyxHQUFHLEtBQUtDLEdBQUwsQ0FBU3JCLE1BQVQsQ0FBZDs7QUFDQSxVQUFJakMsU0FBUyxDQUFDcUQsT0FBRCxDQUFiLEVBQXdCO0FBQ3RCLGNBQU0sSUFBSUssS0FBSixDQUNKLHNEQURJLENBQU47QUFFRDtBQUNGOztBQUVELFdBQU8sS0FBS3ZDLE1BQVo7QUFDRCxHOztTQUVEbUMsRyxHQUFBLGFBQUtyQixNQUFMLEVBQWE7QUFDWCxTQUFLZCxNQUFMLENBQVl3QyxVQUFaLEdBQXlCMUIsTUFBekI7O0FBRUEsUUFBSTtBQUNGLGFBQU9BLE1BQU0sQ0FBQyxLQUFLZCxNQUFMLENBQVlWLElBQWIsRUFBbUIsS0FBS1UsTUFBeEIsQ0FBYjtBQUNELEtBRkQsQ0FFRSxPQUFPRCxLQUFQLEVBQWM7QUFDZCxXQUFLYyxXQUFMLENBQWlCZCxLQUFqQixFQUF3QmUsTUFBeEI7QUFDQSxZQUFNZixLQUFOO0FBQ0Q7QUFDRixHOztTQUVEc0MsUyxHQUFBLHFCQUFhO0FBQ1gsUUFBSSxLQUFLakQsV0FBVCxFQUFzQixPQUFPLEtBQUtZLE1BQVo7QUFDdEIsU0FBS1osV0FBTCxHQUFtQixJQUFuQjtBQUVBLFNBQUtjLElBQUw7QUFFQSxRQUFJZixJQUFJLEdBQUcsS0FBS2EsTUFBTCxDQUFZYixJQUF2QjtBQUNBLFFBQUlzRCxHQUFHLEdBQUdKLG1CQUFWO0FBQ0EsUUFBSWxELElBQUksQ0FBQ1csTUFBVCxFQUFpQjJDLEdBQUcsR0FBR3RELElBQUksQ0FBQ1csTUFBTCxDQUFZdUMsU0FBbEI7QUFDakIsUUFBSWxELElBQUksQ0FBQ3VELFdBQVQsRUFBc0JELEdBQUcsR0FBR3RELElBQUksQ0FBQ3VELFdBQVg7QUFDdEIsUUFBSUQsR0FBRyxDQUFDSixTQUFSLEVBQW1CSSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0osU0FBVjtBQUVuQixRQUFJNUMsR0FBRyxHQUFHLElBQUlrRCxxQkFBSixDQUFpQkYsR0FBakIsRUFBc0IsS0FBS3pDLE1BQUwsQ0FBWVYsSUFBbEMsRUFBd0MsS0FBS1UsTUFBTCxDQUFZYixJQUFwRCxDQUFWO0FBQ0EsUUFBSXlELElBQUksR0FBR25ELEdBQUcsQ0FBQ29ELFFBQUosRUFBWDtBQUNBLFNBQUs3QyxNQUFMLENBQVlkLEdBQVosR0FBa0IwRCxJQUFJLENBQUMsQ0FBRCxDQUF0QjtBQUNBLFNBQUs1QyxNQUFMLENBQVlQLEdBQVosR0FBa0JtRCxJQUFJLENBQUMsQ0FBRCxDQUF0QjtBQUVBLFdBQU8sS0FBSzVDLE1BQVo7QUFDRCxHOzs7O3dCQWpVZ0I7QUFDZixhQUFPLEtBQUtBLE1BQUwsQ0FBWWYsU0FBbkI7QUFDRDtBQUVEOzs7Ozs7Ozt3QkFLWTtBQUNWLGFBQU8sS0FBS2UsTUFBTCxDQUFZYixJQUFuQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozt3QkFZVztBQUNULGFBQU8sS0FBS2tELFNBQUwsR0FBaUJuRCxHQUF4QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozt3QkFZZTtBQUNiLGFBQU8sS0FBS21ELFNBQUwsR0FBaUJTLE9BQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O3dCQVlXO0FBQ1QsYUFBTyxLQUFLVCxTQUFMLEdBQWlCNUMsR0FBeEI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O3dCQWFZO0FBQ1YsYUFBTyxLQUFLUyxJQUFMLEdBQVlaLElBQW5CO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFhZ0I7QUFDZCxhQUFPLEtBQUtZLElBQUwsR0FBWTZDLFFBQW5CO0FBQ0Q7Ozs7OztlQXVPWS9ELFU7QUFFZjs7Ozs7QUFLQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBHZW5lcmF0b3IgZnJvbSAnLi9tYXAtZ2VuZXJhdG9yJ1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeSdcbmltcG9ydCB3YXJuT25jZSBmcm9tICcuL3dhcm4tb25jZSdcbmltcG9ydCBSZXN1bHQgZnJvbSAnLi9yZXN1bHQnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZSdcblxuZnVuY3Rpb24gaXNQcm9taXNlIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG4vKipcbiAqIEEgUHJvbWlzZSBwcm94eSBmb3IgdGhlIHJlc3VsdCBvZiBQb3N0Q1NTIHRyYW5zZm9ybWF0aW9ucy5cbiAqXG4gKiBBIGBMYXp5UmVzdWx0YCBpbnN0YW5jZSBpcyByZXR1cm5lZCBieSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9LlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBsYXp5ID0gcG9zdGNzcyhbYXV0b3ByZWZpeGVyXSkucHJvY2Vzcyhjc3MpXG4gKi9cbmNsYXNzIExhenlSZXN1bHQge1xuICBjb25zdHJ1Y3RvciAocHJvY2Vzc29yLCBjc3MsIG9wdHMpIHtcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gZmFsc2VcbiAgICB0aGlzLnByb2Nlc3NlZCA9IGZhbHNlXG5cbiAgICBsZXQgcm9vdFxuICAgIGlmICh0eXBlb2YgY3NzID09PSAnb2JqZWN0JyAmJiBjc3MgIT09IG51bGwgJiYgY3NzLnR5cGUgPT09ICdyb290Jykge1xuICAgICAgcm9vdCA9IGNzc1xuICAgIH0gZWxzZSBpZiAoY3NzIGluc3RhbmNlb2YgTGF6eVJlc3VsdCB8fCBjc3MgaW5zdGFuY2VvZiBSZXN1bHQpIHtcbiAgICAgIHJvb3QgPSBjc3Mucm9vdFxuICAgICAgaWYgKGNzcy5tYXApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLm1hcCA9PT0gJ3VuZGVmaW5lZCcpIG9wdHMubWFwID0geyB9XG4gICAgICAgIGlmICghb3B0cy5tYXAuaW5saW5lKSBvcHRzLm1hcC5pbmxpbmUgPSBmYWxzZVxuICAgICAgICBvcHRzLm1hcC5wcmV2ID0gY3NzLm1hcFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGFyc2VyID0gcGFyc2VcbiAgICAgIGlmIChvcHRzLnN5bnRheCkgcGFyc2VyID0gb3B0cy5zeW50YXgucGFyc2VcbiAgICAgIGlmIChvcHRzLnBhcnNlcikgcGFyc2VyID0gb3B0cy5wYXJzZXJcbiAgICAgIGlmIChwYXJzZXIucGFyc2UpIHBhcnNlciA9IHBhcnNlci5wYXJzZVxuXG4gICAgICB0cnkge1xuICAgICAgICByb290ID0gcGFyc2VyKGNzcywgb3B0cylcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFJlc3VsdChwcm9jZXNzb3IsIHJvb3QsIG9wdHMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHtAbGluayBQcm9jZXNzb3J9IGluc3RhbmNlLCB3aGljaCB3aWxsIGJlIHVzZWRcbiAgICogZm9yIENTUyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtQcm9jZXNzb3J9XG4gICAqL1xuICBnZXQgcHJvY2Vzc29yICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQucHJvY2Vzc29yXG4gIH1cblxuICAvKipcbiAgICogT3B0aW9ucyBmcm9tIHRoZSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9IGNhbGwuXG4gICAqXG4gICAqIEB0eXBlIHtwcm9jZXNzT3B0aW9uc31cbiAgICovXG4gIGdldCBvcHRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQub3B0c1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zLCBjb252ZXJ0cyBgUm9vdGBcbiAgICogdG8gYSBDU1Mgc3RyaW5nIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjY3NzfS5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgd29yayB3aXRoIHN5bmNocm9ub3VzIHBsdWdpbnMuXG4gICAqIElmIHRoZSBwcm9jZXNzb3IgY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgaXMgd2h5IHRoaXMgbWV0aG9kIGlzIG9ubHlcbiAgICogZm9yIGRlYnVnIHB1cnBvc2UsIHlvdSBzaG91bGQgYWx3YXlzIHVzZSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufS5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHNlZSBSZXN1bHQjY3NzXG4gICAqL1xuICBnZXQgY3NzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5jc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyBmb3IgdGhlIGBjc3NgIHByb3BlcnR5LiBVc2UgaXQgd2l0aCBzeW50YXhlc1xuICAgKiB0aGF0IGdlbmVyYXRlIG5vbi1DU1Mgb3V0cHV0LlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy5cbiAgICogSWYgdGhlIHByb2Nlc3NvciBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvci4gVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seVxuICAgKiBmb3IgZGVidWcgcHVycG9zZSwgeW91IHNob3VsZCBhbHdheXMgdXNlIHtAbGluayBMYXp5UmVzdWx0I3RoZW59LlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAc2VlIFJlc3VsdCNjb250ZW50XG4gICAqL1xuICBnZXQgY29udGVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY29udGVudFxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjbWFwfS5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgd29yayB3aXRoIHN5bmNocm9ub3VzIHBsdWdpbnMuXG4gICAqIElmIHRoZSBwcm9jZXNzb3IgY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgaXMgd2h5IHRoaXMgbWV0aG9kIGlzIG9ubHlcbiAgICogZm9yIGRlYnVnIHB1cnBvc2UsIHlvdSBzaG91bGQgYWx3YXlzIHVzZSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufS5cbiAgICpcbiAgICogQHR5cGUge1NvdXJjZU1hcEdlbmVyYXRvcn1cbiAgICogQHNlZSBSZXN1bHQjbWFwXG4gICAqL1xuICBnZXQgbWFwICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5tYXBcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBhbmQgcmV0dXJucyB7QGxpbmsgUmVzdWx0I3Jvb3R9LlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy4gSWYgdGhlIHByb2Nlc3NvclxuICAgKiBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnMgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICpcbiAgICogVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seSBmb3IgZGVidWcgcHVycG9zZSxcbiAgICogeW91IHNob3VsZCBhbHdheXMgdXNlIHtAbGluayBMYXp5UmVzdWx0I3RoZW59LlxuICAgKlxuICAgKiBAdHlwZSB7Um9vdH1cbiAgICogQHNlZSBSZXN1bHQjcm9vdFxuICAgKi9cbiAgZ2V0IHJvb3QgKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS5yb290XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIHJldHVybnMge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IHdvcmsgd2l0aCBzeW5jaHJvbm91cyBwbHVnaW5zLiBJZiB0aGUgcHJvY2Vzc29yXG4gICAqIGNvbnRhaW5zIGFueSBhc3luY2hyb25vdXMgcGx1Z2lucyBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgKlxuICAgKiBUaGlzIGlzIHdoeSB0aGlzIG1ldGhvZCBpcyBvbmx5IGZvciBkZWJ1ZyBwdXJwb3NlLFxuICAgKiB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAqXG4gICAqIEB0eXBlIHtNZXNzYWdlW119XG4gICAqIEBzZWUgUmVzdWx0I21lc3NhZ2VzXG4gICAqL1xuICBnZXQgbWVzc2FnZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS5tZXNzYWdlc1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCBjYWxscyB7QGxpbmsgUmVzdWx0I3dhcm5pbmdzKCl9LlxuICAgKlxuICAgKiBAcmV0dXJuIHtXYXJuaW5nW119IFdhcm5pbmdzIGZyb20gcGx1Z2lucy5cbiAgICovXG4gIHdhcm5pbmdzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zeW5jKCkud2FybmluZ3MoKVxuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB0aGUge0BsaW5rIExhenlSZXN1bHQjY3NzfSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGF6eSArICcnID09PSBsYXp5LmNzc1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IE91dHB1dCBDU1MuXG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIGFuZCBhc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBhbmQgY2FsbHMgYG9uRnVsZmlsbGVkYCB3aXRoIGEgUmVzdWx0IGluc3RhbmNlLiBJZiBhIHBsdWdpbiB0aHJvd3NcbiAgICogYW4gZXJyb3IsIHRoZSBgb25SZWplY3RlZGAgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZC5cbiAgICpcbiAgICogSXQgaW1wbGVtZW50cyBzdGFuZGFyZCBQcm9taXNlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHtvbkZ1bGZpbGxlZH0gb25GdWxmaWxsZWQgQ2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuIGFsbCBwbHVnaW5zIHdpbGwgZmluaXNoIHdvcmsuXG4gICAqIEBwYXJhbSB7b25SZWplY3RlZH0gIG9uUmVqZWN0ZWQgIENhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQgb24gYW55IGVycm9yLlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIEFQSSB0byBtYWtlIHF1ZXVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzKFthdXRvcHJlZml4ZXJdKS5wcm9jZXNzKGNzcywgeyBmcm9tOiBjc3NQYXRoIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICAgKiB9KVxuICAgKi9cbiAgdGhlbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCEoJ2Zyb20nIGluIHRoaXMub3B0cykpIHtcbiAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgJ1dpdGhvdXQgYGZyb21gIG9wdGlvbiBQb3N0Q1NTIGNvdWxkIGdlbmVyYXRlIHdyb25nIHNvdXJjZSBtYXAgJyArXG4gICAgICAgICAgJ2FuZCB3aWxsIG5vdCBmaW5kIEJyb3dzZXJzbGlzdCBjb25maWcuIFNldCBpdCB0byBDU1MgZmlsZSBwYXRoICcgK1xuICAgICAgICAgICdvciB0byBgdW5kZWZpbmVkYCB0byBwcmV2ZW50IHRoaXMgd2FybmluZy4nXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIGNhbGxzIG9uUmVqZWN0ZWQgZm9yIGVhY2ggZXJyb3IgdGhyb3duIGluIGFueSBwbHVnaW4uXG4gICAqXG4gICAqIEl0IGltcGxlbWVudHMgc3RhbmRhcmQgUHJvbWlzZSBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSB7b25SZWplY3RlZH0gb25SZWplY3RlZCBDYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkIG9uIGFueSBlcnJvci5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSBBUEkgdG8gbWFrZSBxdWV1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcyhbYXV0b3ByZWZpeGVyXSkucHJvY2Vzcyhjc3MpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICAgKiB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAqICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICogfSlcbiAgICovXG4gIGNhdGNoIChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS5jYXRjaChvblJlamVjdGVkKVxuICB9XG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgYW5kIGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCBjYWxscyBvbkZpbmFsbHkgb24gYW55IGVycm9yIG9yIHdoZW4gYWxsIHBsdWdpbnMgd2lsbCBmaW5pc2ggd29yay5cbiAgICpcbiAgICogSXQgaW1wbGVtZW50cyBzdGFuZGFyZCBQcm9taXNlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHtvbkZpbmFsbHl9IG9uRmluYWxseSBDYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkIG9uIGFueSBlcnJvciBvclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gYWxsIHBsdWdpbnMgd2lsbCBmaW5pc2ggd29yay5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSBBUEkgdG8gbWFrZSBxdWV1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcyhbYXV0b3ByZWZpeGVyXSkucHJvY2Vzcyhjc3MpLmZpbmFsbHkoKCkgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKCdwcm9jZXNzaW5nIGVuZGVkJylcbiAgICogfSlcbiAgICovXG4gIGZpbmFsbHkgKG9uRmluYWxseSkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZpbmFsbHksIG9uRmluYWxseSlcbiAgfVxuXG4gIGhhbmRsZUVycm9yIChlcnJvciwgcGx1Z2luKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicgJiYgIWVycm9yLnBsdWdpbikge1xuICAgICAgICBlcnJvci5wbHVnaW4gPSBwbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgICBlcnJvci5zZXRNZXNzYWdlKClcbiAgICAgIH0gZWxzZSBpZiAocGx1Z2luLnBvc3Rjc3NWZXJzaW9uKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbGV0IHBsdWdpbk5hbWUgPSBwbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgICAgIGxldCBwbHVnaW5WZXIgPSBwbHVnaW4ucG9zdGNzc1ZlcnNpb25cbiAgICAgICAgICBsZXQgcnVudGltZVZlciA9IHRoaXMucmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uXG4gICAgICAgICAgbGV0IGEgPSBwbHVnaW5WZXIuc3BsaXQoJy4nKVxuICAgICAgICAgIGxldCBiID0gcnVudGltZVZlci5zcGxpdCgnLicpXG5cbiAgICAgICAgICBpZiAoYVswXSAhPT0gYlswXSB8fCBwYXJzZUludChhWzFdKSA+IHBhcnNlSW50KGJbMV0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAnVW5rbm93biBlcnJvciBmcm9tIFBvc3RDU1MgcGx1Z2luLiBZb3VyIGN1cnJlbnQgUG9zdENTUyAnICtcbiAgICAgICAgICAgICAgJ3ZlcnNpb24gaXMgJyArIHJ1bnRpbWVWZXIgKyAnLCBidXQgJyArIHBsdWdpbk5hbWUgKyAnIHVzZXMgJyArXG4gICAgICAgICAgICAgIHBsdWdpblZlciArICcuIFBlcmhhcHMgdGhpcyBpcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvciBiZWxvdy4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSBjb25zb2xlLmVycm9yKGVycilcbiAgICB9XG4gIH1cblxuICBhc3luY1RpY2sgKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICh0aGlzLnBsdWdpbiA+PSB0aGlzLnByb2Nlc3Nvci5wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBwbHVnaW4gPSB0aGlzLnByb2Nlc3Nvci5wbHVnaW5zW3RoaXMucGx1Z2luXVxuICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnJ1bihwbHVnaW4pXG4gICAgICB0aGlzLnBsdWdpbiArPSAxXG5cbiAgICAgIGlmIChpc1Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFzeW5jVGljayhyZXNvbHZlLCByZWplY3QpXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBwbHVnaW4pXG4gICAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc3luY1RpY2socmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcbiAgICAgIHJlamVjdChlcnJvcilcbiAgICB9XG4gIH1cblxuICBhc3luYyAoKSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzc2VkKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5lcnJvcikge1xuICAgICAgICAgIHJlamVjdCh0aGlzLmVycm9yKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5zdHJpbmdpZnkoKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvY2Vzc2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZ1xuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc2luZyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmVycm9yKSByZXR1cm4gcmVqZWN0KHRoaXMuZXJyb3IpXG4gICAgICB0aGlzLnBsdWdpbiA9IDBcbiAgICAgIHRoaXMuYXN5bmNUaWNrKHJlc29sdmUsIHJlamVjdClcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZ1xuICB9XG5cbiAgc3luYyAoKSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzc2VkKSByZXR1cm4gdGhpcy5yZXN1bHRcbiAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcblxuICAgIGlmICh0aGlzLnByb2Nlc3NpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VzZSBwcm9jZXNzKGNzcykudGhlbihjYikgdG8gd29yayB3aXRoIGFzeW5jIHBsdWdpbnMnKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVycm9yKSB0aHJvdyB0aGlzLmVycm9yXG5cbiAgICBmb3IgKGxldCBwbHVnaW4gb2YgdGhpcy5yZXN1bHQucHJvY2Vzc29yLnBsdWdpbnMpIHtcbiAgICAgIGxldCBwcm9taXNlID0gdGhpcy5ydW4ocGx1Z2luKVxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1VzZSBwcm9jZXNzKGNzcykudGhlbihjYikgdG8gd29yayB3aXRoIGFzeW5jIHBsdWdpbnMnKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgcnVuIChwbHVnaW4pIHtcbiAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luXG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHBsdWdpbih0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgcGx1Z2luKVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICBzdHJpbmdpZnkgKCkge1xuICAgIGlmICh0aGlzLnN0cmluZ2lmaWVkKSByZXR1cm4gdGhpcy5yZXN1bHRcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gdHJ1ZVxuXG4gICAgdGhpcy5zeW5jKClcblxuICAgIGxldCBvcHRzID0gdGhpcy5yZXN1bHQub3B0c1xuICAgIGxldCBzdHIgPSBzdHJpbmdpZnlcbiAgICBpZiAob3B0cy5zeW50YXgpIHN0ciA9IG9wdHMuc3ludGF4LnN0cmluZ2lmeVxuICAgIGlmIChvcHRzLnN0cmluZ2lmaWVyKSBzdHIgPSBvcHRzLnN0cmluZ2lmaWVyXG4gICAgaWYgKHN0ci5zdHJpbmdpZnkpIHN0ciA9IHN0ci5zdHJpbmdpZnlcblxuICAgIGxldCBtYXAgPSBuZXcgTWFwR2VuZXJhdG9yKHN0ciwgdGhpcy5yZXN1bHQucm9vdCwgdGhpcy5yZXN1bHQub3B0cylcbiAgICBsZXQgZGF0YSA9IG1hcC5nZW5lcmF0ZSgpXG4gICAgdGhpcy5yZXN1bHQuY3NzID0gZGF0YVswXVxuICAgIHRoaXMucmVzdWx0Lm1hcCA9IGRhdGFbMV1cblxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlSZXN1bHRcblxuLyoqXG4gKiBAY2FsbGJhY2sgb25GdWxmaWxsZWRcbiAqIEBwYXJhbSB7UmVzdWx0fSByZXN1bHRcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBvblJlamVjdGVkXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG4iXSwiZmlsZSI6ImxhenktcmVzdWx0LmpzIn0=
