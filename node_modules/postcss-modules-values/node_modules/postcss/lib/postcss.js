'use strict';

exports.__esModule = true;

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _stringify = require('./stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('./at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _vendor = require('./vendor');

var _vendor2 = _interopRequireDefault(_vendor);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new {@link Processor} instance that will apply `plugins`
 * as CSS processors.
 *
 * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
 *        plugins. See {@link Processor#use} for plugin format.
 *
 * @return {Processor} Processor to process multiple CSS
 *
 * @example
 * import postcss from 'postcss';
 *
 * postcss(plugins).process(css, { from, to }).then(result => {
 *   console.log(result.css);
 * });
 *
 * @namespace postcss
 */
function postcss() {
  for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new _processor2.default(plugins);
}

/**
 * Creates a PostCSS plugin with a standard API.
 *
 * The newly-wrapped function will provide both the name and PostCSS
 * version of the plugin.
 *
 * ```js
 *  const processor = postcss([replace]);
 *  processor.plugins[0].postcssPlugin  //=> 'postcss-replace'
 *  processor.plugins[0].postcssVersion //=> '5.1.0'
 * ```
 *
 * The plugin function receives 2 arguments: {@link Root}
 * and {@link Result} instance. The function should mutate the provided
 * `Root` node. Alternatively, you can create a new `Root` node
 * and override the `result.root` property.
 *
 * ```js
 * const cleaner = postcss.plugin('postcss-cleaner', () => {
 *   return (root, result) => {
 *     result.root = postcss.root();
 *   };
 * });
 * ```
 *
 * As a convenience, plugins also expose a `process` method so that you can use
 * them as standalone tools.
 *
 * ```js
 * cleaner.process(css, processOpts, pluginOpts);
 * // This is equivalent to:
 * postcss([ cleaner(pluginOpts) ]).process(css, processOpts);
 * ```
 *
 * Asynchronous plugins should return a `Promise` instance.
 *
 * ```js
 * postcss.plugin('postcss-import', () => {
 *   return (root, result) => {
 *     return new Promise( (resolve, reject) => {
 *       fs.readFile('base.css', (base) => {
 *         root.prepend(base);
 *         resolve();
 *       });
 *     });
 *   };
 * });
 * ```
 *
 * Add warnings using the {@link Node#warn} method.
 * Send data to other plugins using the {@link Result#messages} array.
 *
 * ```js
 * postcss.plugin('postcss-caniuse-test', () => {
 *   return (root, result) => {
 *     root.walkDecls(decl => {
 *       if ( !caniuse.support(decl.prop) ) {
 *         decl.warn(result, 'Some browsers do not support ' + decl.prop);
 *       }
 *     });
 *   };
 * });
 * ```
 *
 * @param {string} name          - PostCSS plugin name. Same as in `name`
 *                                 property in `package.json`. It will be saved
 *                                 in `plugin.postcssPlugin` property.
 * @param {function} initializer - will receive plugin options
 *                                 and should return {@link pluginFunction}
 *
 * @return {Plugin} PostCSS plugin
 */
postcss.plugin = function plugin(name, initializer) {
  var creator = function creator() {
    var transformer = initializer.apply(undefined, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new _processor2.default().version;
    return transformer;
  };

  var cache = void 0;
  Object.defineProperty(creator, 'postcss', {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };

  return creator;
};

/**
 * Default function to convert a node tree into a CSS string.
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 *
 * @function
 */
postcss.stringify = _stringify2.default;

/**
 * Parses source css and returns a new {@link Root} node,
 * which contains the source CSS nodes.
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 *
 * @example
 * // Simple CSS concatenation with source map support
 * const root1 = postcss.parse(css1, { from: file1 });
 * const root2 = postcss.parse(css2, { from: file2 });
 * root1.append(root2).toResult().css;
 *
 * @function
 */
postcss.parse = _parse2.default;

/**
 * @member {vendor} - Contains the {@link vendor} module.
 *
 * @example
 * postcss.vendor.unprefixed('-moz-tab') //=> ['tab']
 */
postcss.vendor = _vendor2.default;

/**
 * @member {list} - Contains the {@link list} module.
 *
 * @example
 * postcss.list.space('5px calc(10% + 5px)') //=> ['5px', 'calc(10% + 5px)']
 */
postcss.list = _list2.default;

/**
 * Creates a new {@link Comment} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Comment} new Comment node
 *
 * @example
 * postcss.comment({ text: 'test' })
 */
postcss.comment = function (defaults) {
  return new _comment2.default(defaults);
};

/**
 * Creates a new {@link AtRule} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {AtRule} new AtRule node
 *
 * @example
 * postcss.atRule({ name: 'charset' }).toString() //=> "@charset"
 */
postcss.atRule = function (defaults) {
  return new _atRule2.default(defaults);
};

/**
 * Creates a new {@link Declaration} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Declaration} new Declaration node
 *
 * @example
 * postcss.decl({ prop: 'color', value: 'red' }).toString() //=> "color: red"
 */
postcss.decl = function (defaults) {
  return new _declaration2.default(defaults);
};

/**
 * Creates a new {@link Rule} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Rule} new Rule node
 *
 * @example
 * postcss.rule({ selector: 'a' }).toString() //=> "a {\n}"
 */
postcss.rule = function (defaults) {
  return new _rule2.default(defaults);
};

/**
 * Creates a new {@link Root} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Root} new Root node
 *
 * @example
 * postcss.root({ after: '\n' }).toString() //=> "\n"
 */
postcss.root = function (defaults) {
  return new _root2.default(defaults);
};

exports.default = postcss;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3Rjc3MuZXM2Il0sIm5hbWVzIjpbInBvc3Rjc3MiLCJwbHVnaW5zIiwibGVuZ3RoIiwiQXJyYXkiLCJpc0FycmF5IiwiUHJvY2Vzc29yIiwicGx1Z2luIiwibmFtZSIsImluaXRpYWxpemVyIiwiY3JlYXRvciIsInRyYW5zZm9ybWVyIiwicG9zdGNzc1BsdWdpbiIsInBvc3Rjc3NWZXJzaW9uIiwidmVyc2lvbiIsImNhY2hlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJwcm9jZXNzIiwiY3NzIiwicHJvY2Vzc09wdHMiLCJwbHVnaW5PcHRzIiwic3RyaW5naWZ5IiwicGFyc2UiLCJ2ZW5kb3IiLCJsaXN0IiwiY29tbWVudCIsIkNvbW1lbnQiLCJkZWZhdWx0cyIsImF0UnVsZSIsIkF0UnVsZSIsImRlY2wiLCJEZWNsYXJhdGlvbiIsInJ1bGUiLCJSdWxlIiwicm9vdCIsIlJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFTQSxPQUFULEdBQTZCO0FBQUEsb0NBQVRDLE9BQVM7QUFBVEEsV0FBUztBQUFBOztBQUN6QixNQUFLQSxRQUFRQyxNQUFSLEtBQW1CLENBQW5CLElBQXdCQyxNQUFNQyxPQUFOLENBQWNILFFBQVEsQ0FBUixDQUFkLENBQTdCLEVBQXlEO0FBQ3JEQSxjQUFVQSxRQUFRLENBQVIsQ0FBVjtBQUNIO0FBQ0QsU0FBTyxJQUFJSSxtQkFBSixDQUFjSixPQUFkLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0VBRCxRQUFRTSxNQUFSLEdBQWlCLFNBQVNBLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCQyxXQUF0QixFQUFtQztBQUNoRCxNQUFJQyxVQUFVLFNBQVZBLE9BQVUsR0FBbUI7QUFDN0IsUUFBSUMsY0FBY0YsdUNBQWxCO0FBQ0FFLGdCQUFZQyxhQUFaLEdBQTZCSixJQUE3QjtBQUNBRyxnQkFBWUUsY0FBWixHQUE4QixJQUFJUCxtQkFBSixFQUFELENBQWtCUSxPQUEvQztBQUNBLFdBQU9ILFdBQVA7QUFDSCxHQUxEOztBQU9BLE1BQUlJLGNBQUo7QUFDQUMsU0FBT0MsY0FBUCxDQUFzQlAsT0FBdEIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDdENRLE9BRHNDLGlCQUNoQztBQUNGLFVBQUssQ0FBQ0gsS0FBTixFQUFjQSxRQUFRTCxTQUFSO0FBQ2QsYUFBT0ssS0FBUDtBQUNIO0FBSnFDLEdBQTFDOztBQU9BTCxVQUFRUyxPQUFSLEdBQWtCLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QkMsVUFBNUIsRUFBd0M7QUFDdEQsV0FBT3JCLFFBQVEsQ0FBRVMsUUFBUVksVUFBUixDQUFGLENBQVIsRUFBaUNILE9BQWpDLENBQXlDQyxHQUF6QyxFQUE4Q0MsV0FBOUMsQ0FBUDtBQUNILEdBRkQ7O0FBSUEsU0FBT1gsT0FBUDtBQUNILENBckJEOztBQXVCQTs7Ozs7Ozs7Ozs7QUFXQVQsUUFBUXNCLFNBQVIsR0FBb0JBLG1CQUFwQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBdEIsUUFBUXVCLEtBQVIsR0FBZ0JBLGVBQWhCOztBQUVBOzs7Ozs7QUFNQXZCLFFBQVF3QixNQUFSLEdBQWlCQSxnQkFBakI7O0FBRUE7Ozs7OztBQU1BeEIsUUFBUXlCLElBQVIsR0FBZUEsY0FBZjs7QUFFQTs7Ozs7Ozs7OztBQVVBekIsUUFBUTBCLE9BQVIsR0FBa0I7QUFBQSxTQUFZLElBQUlDLGlCQUFKLENBQVlDLFFBQVosQ0FBWjtBQUFBLENBQWxCOztBQUVBOzs7Ozs7Ozs7O0FBVUE1QixRQUFRNkIsTUFBUixHQUFpQjtBQUFBLFNBQVksSUFBSUMsZ0JBQUosQ0FBV0YsUUFBWCxDQUFaO0FBQUEsQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7QUFVQTVCLFFBQVErQixJQUFSLEdBQWU7QUFBQSxTQUFZLElBQUlDLHFCQUFKLENBQWdCSixRQUFoQixDQUFaO0FBQUEsQ0FBZjs7QUFFQTs7Ozs7Ozs7OztBQVVBNUIsUUFBUWlDLElBQVIsR0FBZTtBQUFBLFNBQVksSUFBSUMsY0FBSixDQUFTTixRQUFULENBQVo7QUFBQSxDQUFmOztBQUVBOzs7Ozs7Ozs7O0FBVUE1QixRQUFRbUMsSUFBUixHQUFlO0FBQUEsU0FBWSxJQUFJQyxjQUFKLENBQVNSLFFBQVQsQ0FBWjtBQUFBLENBQWY7O2tCQUVlNUIsTyIsImZpbGUiOiJwb3N0Y3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlY2xhcmF0aW9uIGZyb20gJy4vZGVjbGFyYXRpb24nO1xuaW1wb3J0IFByb2Nlc3NvciAgIGZyb20gJy4vcHJvY2Vzc29yJztcbmltcG9ydCBzdHJpbmdpZnkgICBmcm9tICcuL3N0cmluZ2lmeSc7XG5pbXBvcnQgQ29tbWVudCAgICAgZnJvbSAnLi9jb21tZW50JztcbmltcG9ydCBBdFJ1bGUgICAgICBmcm9tICcuL2F0LXJ1bGUnO1xuaW1wb3J0IHZlbmRvciAgICAgIGZyb20gJy4vdmVuZG9yJztcbmltcG9ydCBwYXJzZSAgICAgICBmcm9tICcuL3BhcnNlJztcbmltcG9ydCBsaXN0ICAgICAgICBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IFJ1bGUgICAgICAgIGZyb20gJy4vcnVsZSc7XG5pbXBvcnQgUm9vdCAgICAgICAgZnJvbSAnLi9yb290JztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcge0BsaW5rIFByb2Nlc3Nvcn0gaW5zdGFuY2UgdGhhdCB3aWxsIGFwcGx5IGBwbHVnaW5zYFxuICogYXMgQ1NTIHByb2Nlc3NvcnMuXG4gKlxuICogQHBhcmFtIHtBcnJheS48UGx1Z2lufHBsdWdpbkZ1bmN0aW9uPnxQcm9jZXNzb3J9IHBsdWdpbnMgLSBQb3N0Q1NTXG4gKiAgICAgICAgcGx1Z2lucy4gU2VlIHtAbGluayBQcm9jZXNzb3IjdXNlfSBmb3IgcGx1Z2luIGZvcm1hdC5cbiAqXG4gKiBAcmV0dXJuIHtQcm9jZXNzb3J9IFByb2Nlc3NvciB0byBwcm9jZXNzIG11bHRpcGxlIENTU1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgcG9zdGNzcyBmcm9tICdwb3N0Y3NzJztcbiAqXG4gKiBwb3N0Y3NzKHBsdWdpbnMpLnByb2Nlc3MoY3NzLCB7IGZyb20sIHRvIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAqICAgY29uc29sZS5sb2cocmVzdWx0LmNzcyk7XG4gKiB9KTtcbiAqXG4gKiBAbmFtZXNwYWNlIHBvc3Rjc3NcbiAqL1xuZnVuY3Rpb24gcG9zdGNzcyguLi5wbHVnaW5zKSB7XG4gICAgaWYgKCBwbHVnaW5zLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHBsdWdpbnNbMF0pICkge1xuICAgICAgICBwbHVnaW5zID0gcGx1Z2luc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9jZXNzb3IocGx1Z2lucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFBvc3RDU1MgcGx1Z2luIHdpdGggYSBzdGFuZGFyZCBBUEkuXG4gKlxuICogVGhlIG5ld2x5LXdyYXBwZWQgZnVuY3Rpb24gd2lsbCBwcm92aWRlIGJvdGggdGhlIG5hbWUgYW5kIFBvc3RDU1NcbiAqIHZlcnNpb24gb2YgdGhlIHBsdWdpbi5cbiAqXG4gKiBgYGBqc1xuICogIGNvbnN0IHByb2Nlc3NvciA9IHBvc3Rjc3MoW3JlcGxhY2VdKTtcbiAqICBwcm9jZXNzb3IucGx1Z2luc1swXS5wb3N0Y3NzUGx1Z2luICAvLz0+ICdwb3N0Y3NzLXJlcGxhY2UnXG4gKiAgcHJvY2Vzc29yLnBsdWdpbnNbMF0ucG9zdGNzc1ZlcnNpb24gLy89PiAnNS4xLjAnXG4gKiBgYGBcbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHJlY2VpdmVzIDIgYXJndW1lbnRzOiB7QGxpbmsgUm9vdH1cbiAqIGFuZCB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZS4gVGhlIGZ1bmN0aW9uIHNob3VsZCBtdXRhdGUgdGhlIHByb3ZpZGVkXG4gKiBgUm9vdGAgbm9kZS4gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBjcmVhdGUgYSBuZXcgYFJvb3RgIG5vZGVcbiAqIGFuZCBvdmVycmlkZSB0aGUgYHJlc3VsdC5yb290YCBwcm9wZXJ0eS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgY2xlYW5lciA9IHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWNsZWFuZXInLCAoKSA9PiB7XG4gKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gKiAgICAgcmVzdWx0LnJvb3QgPSBwb3N0Y3NzLnJvb3QoKTtcbiAqICAgfTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQXMgYSBjb252ZW5pZW5jZSwgcGx1Z2lucyBhbHNvIGV4cG9zZSBhIGBwcm9jZXNzYCBtZXRob2Qgc28gdGhhdCB5b3UgY2FuIHVzZVxuICogdGhlbSBhcyBzdGFuZGFsb25lIHRvb2xzLlxuICpcbiAqIGBgYGpzXG4gKiBjbGVhbmVyLnByb2Nlc3MoY3NzLCBwcm9jZXNzT3B0cywgcGx1Z2luT3B0cyk7XG4gKiAvLyBUaGlzIGlzIGVxdWl2YWxlbnQgdG86XG4gKiBwb3N0Y3NzKFsgY2xlYW5lcihwbHVnaW5PcHRzKSBdKS5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMpO1xuICogYGBgXG4gKlxuICogQXN5bmNocm9ub3VzIHBsdWdpbnMgc2hvdWxkIHJldHVybiBhIGBQcm9taXNlYCBpbnN0YW5jZS5cbiAqXG4gKiBgYGBqc1xuICogcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtaW1wb3J0JywgKCkgPT4ge1xuICogICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICogICAgIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICogICAgICAgZnMucmVhZEZpbGUoJ2Jhc2UuY3NzJywgKGJhc2UpID0+IHtcbiAqICAgICAgICAgcm9vdC5wcmVwZW5kKGJhc2UpO1xuICogICAgICAgICByZXNvbHZlKCk7XG4gKiAgICAgICB9KTtcbiAqICAgICB9KTtcbiAqICAgfTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQWRkIHdhcm5pbmdzIHVzaW5nIHRoZSB7QGxpbmsgTm9kZSN3YXJufSBtZXRob2QuXG4gKiBTZW5kIGRhdGEgdG8gb3RoZXIgcGx1Z2lucyB1c2luZyB0aGUge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30gYXJyYXkuXG4gKlxuICogYGBganNcbiAqIHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWNhbml1c2UtdGVzdCcsICgpID0+IHtcbiAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAqICAgICByb290LndhbGtEZWNscyhkZWNsID0+IHtcbiAqICAgICAgIGlmICggIWNhbml1c2Uuc3VwcG9ydChkZWNsLnByb3ApICkge1xuICogICAgICAgICBkZWNsLndhcm4ocmVzdWx0LCAnU29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCAnICsgZGVjbC5wcm9wKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqICAgfTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgICAgICAgICAgLSBQb3N0Q1NTIHBsdWdpbiBuYW1lLiBTYW1lIGFzIGluIGBuYW1lYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBpbiBgcGFja2FnZS5qc29uYC4gSXQgd2lsbCBiZSBzYXZlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBgcGx1Z2luLnBvc3Rjc3NQbHVnaW5gIHByb3BlcnR5LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gaW5pdGlhbGl6ZXIgLSB3aWxsIHJlY2VpdmUgcGx1Z2luIG9wdGlvbnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHNob3VsZCByZXR1cm4ge0BsaW5rIHBsdWdpbkZ1bmN0aW9ufVxuICpcbiAqIEByZXR1cm4ge1BsdWdpbn0gUG9zdENTUyBwbHVnaW5cbiAqL1xucG9zdGNzcy5wbHVnaW4gPSBmdW5jdGlvbiBwbHVnaW4obmFtZSwgaW5pdGlhbGl6ZXIpIHtcbiAgICBsZXQgY3JlYXRvciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lciA9IGluaXRpYWxpemVyKC4uLmFyZ3MpO1xuICAgICAgICB0cmFuc2Zvcm1lci5wb3N0Y3NzUGx1Z2luICA9IG5hbWU7XG4gICAgICAgIHRyYW5zZm9ybWVyLnBvc3Rjc3NWZXJzaW9uID0gKG5ldyBQcm9jZXNzb3IoKSkudmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyO1xuICAgIH07XG5cbiAgICBsZXQgY2FjaGU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsICdwb3N0Y3NzJywge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICBpZiAoICFjYWNoZSApIGNhY2hlID0gY3JlYXRvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjcmVhdG9yLnByb2Nlc3MgPSBmdW5jdGlvbiAoY3NzLCBwcm9jZXNzT3B0cywgcGx1Z2luT3B0cykge1xuICAgICAgICByZXR1cm4gcG9zdGNzcyhbIGNyZWF0b3IocGx1Z2luT3B0cykgXSkucHJvY2Vzcyhjc3MsIHByb2Nlc3NPcHRzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNyZWF0b3I7XG59O1xuXG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhIG5vZGUgdHJlZSBpbnRvIGEgQ1NTIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgICAgICAgLSBzdGFydCBub2RlIGZvciBzdHJpbmdpZmluZy4gVXN1YWxseSB7QGxpbmsgUm9vdH0uXG4gKiBAcGFyYW0ge2J1aWxkZXJ9IGJ1aWxkZXIgLSBmdW5jdGlvbiB0byBjb25jYXRlbmF0ZSBDU1MgZnJvbSBub2Rl4oCZcyBwYXJ0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgZ2VuZXJhdGUgc3RyaW5nIGFuZCBzb3VyY2UgbWFwXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xucG9zdGNzcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG5cbi8qKlxuICogUGFyc2VzIHNvdXJjZSBjc3MgYW5kIHJldHVybnMgYSBuZXcge0BsaW5rIFJvb3R9IG5vZGUsXG4gKiB3aGljaCBjb250YWlucyB0aGUgc291cmNlIENTUyBub2Rlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3x0b1N0cmluZ30gY3NzICAgLSBzdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0b1N0cmluZygpIG1ldGhvZCwgbGlrZSBhIEJ1ZmZlclxuICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gW29wdHNdIC0gb3B0aW9ucyB3aXRoIG9ubHkgYGZyb21gIGFuZCBgbWFwYCBrZXlzXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1RcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2ltcGxlIENTUyBjb25jYXRlbmF0aW9uIHdpdGggc291cmNlIG1hcCBzdXBwb3J0XG4gKiBjb25zdCByb290MSA9IHBvc3Rjc3MucGFyc2UoY3NzMSwgeyBmcm9tOiBmaWxlMSB9KTtcbiAqIGNvbnN0IHJvb3QyID0gcG9zdGNzcy5wYXJzZShjc3MyLCB7IGZyb206IGZpbGUyIH0pO1xuICogcm9vdDEuYXBwZW5kKHJvb3QyKS50b1Jlc3VsdCgpLmNzcztcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xucG9zdGNzcy5wYXJzZSA9IHBhcnNlO1xuXG4vKipcbiAqIEBtZW1iZXIge3ZlbmRvcn0gLSBDb250YWlucyB0aGUge0BsaW5rIHZlbmRvcn0gbW9kdWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLnZlbmRvci51bnByZWZpeGVkKCctbW96LXRhYicpIC8vPT4gWyd0YWInXVxuICovXG5wb3N0Y3NzLnZlbmRvciA9IHZlbmRvcjtcblxuLyoqXG4gKiBAbWVtYmVyIHtsaXN0fSAtIENvbnRhaW5zIHRoZSB7QGxpbmsgbGlzdH0gbW9kdWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLmxpc3Quc3BhY2UoJzVweCBjYWxjKDEwJSArIDVweCknKSAvLz0+IFsnNXB4JywgJ2NhbGMoMTAlICsgNXB4KSddXG4gKi9cbnBvc3Rjc3MubGlzdCA9IGxpc3Q7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgQ29tbWVudH0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtDb21tZW50fSBuZXcgQ29tbWVudCBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuY29tbWVudCh7IHRleHQ6ICd0ZXN0JyB9KVxuICovXG5wb3N0Y3NzLmNvbW1lbnQgPSBkZWZhdWx0cyA9PiBuZXcgQ29tbWVudChkZWZhdWx0cyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgQXRSdWxlfSBub2RlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVmYXVsdHNdIC0gcHJvcGVydGllcyBmb3IgdGhlIG5ldyBub2RlLlxuICpcbiAqIEByZXR1cm4ge0F0UnVsZX0gbmV3IEF0UnVsZSBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuYXRSdWxlKHsgbmFtZTogJ2NoYXJzZXQnIH0pLnRvU3RyaW5nKCkgLy89PiBcIkBjaGFyc2V0XCJcbiAqL1xucG9zdGNzcy5hdFJ1bGUgPSBkZWZhdWx0cyA9PiBuZXcgQXRSdWxlKGRlZmF1bHRzKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBEZWNsYXJhdGlvbn0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtEZWNsYXJhdGlvbn0gbmV3IERlY2xhcmF0aW9uIG5vZGVcbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdyZWQnIH0pLnRvU3RyaW5nKCkgLy89PiBcImNvbG9yOiByZWRcIlxuICovXG5wb3N0Y3NzLmRlY2wgPSBkZWZhdWx0cyA9PiBuZXcgRGVjbGFyYXRpb24oZGVmYXVsdHMpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIFJ1bGV9IG5vZGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gLSBwcm9wZXJ0aWVzIGZvciB0aGUgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7UnVsZX0gbmV3IFJ1bGUgbm9kZVxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnIH0pLnRvU3RyaW5nKCkgLy89PiBcImEge1xcbn1cIlxuICovXG5wb3N0Y3NzLnJ1bGUgPSBkZWZhdWx0cyA9PiBuZXcgUnVsZShkZWZhdWx0cyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgUm9vdH0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtSb290fSBuZXcgUm9vdCBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3Mucm9vdCh7IGFmdGVyOiAnXFxuJyB9KS50b1N0cmluZygpIC8vPT4gXCJcXG5cIlxuICovXG5wb3N0Y3NzLnJvb3QgPSBkZWZhdWx0cyA9PiBuZXcgUm9vdChkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IHBvc3Rjc3M7XG4iXX0=
