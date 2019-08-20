# Optimize CSS Assets Webpack Plugin

A Webpack plugin to optimize \ minimize CSS assets.

## What does the plugin do?

It will search for CSS assets during the Webpack build and will optimize \ minimize the CSS (by default it uses [cssnano](http://github.com/ben-eb/cssnano) but a custom CSS processor can be specified).

### Solves [extract-text-webpack-plugin](http://github.com/webpack/extract-text-webpack-plugin) CSS duplication problem:

Since [extract-text-webpack-plugin](http://github.com/webpack/extract-text-webpack-plugin) only bundles (merges) text chunks, if it's used to bundle CSS, the bundle might have duplicate entries (chunks can be duplicate free but when merged, duplicate CSS can be created).

## Installation:

Using npm:
```shell
$ npm install --save-dev optimize-css-assets-webpack-plugin
```

> :warning: For webpack v3 or below please use `optimize-css-assets-webpack-plugin@3.2.0`. The `optimize-css-assets-webpack-plugin@4.0.0` version and above supports webpack v4.

## Configuration:

The plugin can receive the following options (all of them are optional):
* `assetNameRegExp`: A regular expression that indicates the names of the assets that should be optimized \ minimized. The regular expression provided is run against the filenames of the files exported by the `ExtractTextPlugin` instances in your configuration, not the filenames of your source CSS files. Defaults to `/\.css$/g`
* `cssProcessor`: The CSS processor used to optimize \ minimize the CSS, defaults to [`cssnano`](http://github.com/ben-eb/cssnano). This should be a function that follows `cssnano.process` interface (receives a CSS and options parameters and returns a Promise).
* `cssProcessorOptions`: The options passed to the `cssProcessor`, defaults to `{}`
* `cssProcessorPluginOptions`: The plugin options passed to the `cssProcessor`, defaults to `{}`
* `canPrint`: A boolean indicating if the plugin can print messages to the console, defaults to `true`

## Example:

``` javascript
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]
};
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

