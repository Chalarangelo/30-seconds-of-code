/**
 * Stats writer module.
 *
 * Stats can be a string or array (we"ll have array from using source maps):
 *
 * ```js
 * "assetsByChunkName": {
 *   "main": [
 *     "cd6371d4131fbfbefaa7.bundle.js",
 *     "../js-map/cd6371d4131fbfbefaa7.bundle.js.map"
 *   ]
 * },
 * ```
 *
 * **Note**: The stats object is **big**. It includes the entire source included
 * in a bundle. Thus, we default `opts.fields` to `["assetsByChunkName"]` to
 * only include those. However, if you want the _whole thing_ (maybe doing an
 * `opts.transform` function), then you can set `fields: null` in options to
 * get **all** of the stats object.
 *
 * See:
 * - http://webpack.github.io/docs/long-term-caching.html#get-filenames-from-stats
 * - https://github.com/webpack/docs/wiki/node.js-api#stats
 *
 * **`filename`**: The `opts.filename` option can be a file name or path relative to
 * `output.path` in webpack configuration. It should not be absolute.
 *
 * **`transform`**: By default, the retrieved stats object is `JSON.stringify`'ed
 * but by supplying an alternate transform you can target _any_ output format.
 * See [`demo/webpack.config.js`](demo/webpack.config.js) for various examples
 * including Markdown output.
 *
 * - **Warning**: The output of `transform` should be a `String`, not an object.
 *   On Node `v4.x` if you return a real object in `transform`, then webpack
 *   will break with a `TypeError` (See #8). Just adding a simple
 *   `JSON.stringify()` around your object is usually what you need to solve
 *   any problems.
 *
 * @param {Object}   opts           options
 * @param {String}   opts.filename  output file name (Default: "stat.json")
 * @param {Array}    opts.fields    fields of stats obj to keep (Default: \["assetsByChunkName"\])
 * @param {Function} opts.transform transform stats obj (Default: `JSON.stringify()`)
 *
 * @api public
 */
function StatsWriterPlugin(opts) {
  opts = opts || {};
  this.opts = {};
  this.opts.filename = opts.filename || "stats.json";
  this.opts.fields = typeof opts.fields !== "undefined" ? opts.fields : ["assetsByChunkName"];
  this.opts.transform = opts.transform || function (data) { return JSON.stringify(data, null, 2); };
}

StatsWriterPlugin.prototype = {
  constructor: StatsWriterPlugin,

  apply: function (compiler) {
    var self = this;
    compiler.plugin("emit", function (curCompiler, callback) {
      // Get stats.
      // **Note**: In future, could pass something like `{ showAssets: true }`
      // to the `getStats()` function for more limited object returned.
      var stats = curCompiler.getStats().toJson();

      // Filter to fields.
      if (self.opts.fields) {
        stats = self.opts.fields.reduce(function (memo, key) {
          memo[key] = stats[key];
          return memo;
        }, {});
      }

      // Transform to string.
      var statsStr = self.opts.transform(stats, {
        compiler: curCompiler
      });

      curCompiler.assets[self.opts.filename] = {
        source: function () {
          return statsStr;
        },
        size: function () {
          return statsStr.length;
        }
      };

      callback();
    });
  }
};

module.exports = StatsWriterPlugin;
