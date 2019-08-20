# Last Call Webpack Plugin

A Webpack plugin that allows you to transform \ modify assets just before Webpack emits them.

## What does the plugin do?

It allows you to transform \ modify Webpack assets just before Webpack emits them (writes them to files or memory in case you are using something like Webpack dev server).

It can be used for example to:
* Prefix a ``` /* Author: John Doe */ ``` comment on all the .js files Webpack generates.
* Run some final optimization on all .css files Webpack generates.

## Installation:

Using npm:
```shell
$ npm install --save-dev last-call-webpack-plugin
```

> :warning: For webpack v3 or below please use `last-call-webpack-plugin@v2.1.2`. The `last-call-webpack-plugin@v3.0.0` version and above supports webpack v4.

## Configuration:

The plugin can receive the following options:
* assetProcessors: An Array of objects that describe asset processors:
  * regExp: A regular expression to match the asset name that the processor handles.
  * processor: A function with the signature of ``` function(assetName, webpackAssetObject, assets) ``` that returns a Promise. If the Promise returns a result this result will replace the assets content.
  * phase: The webpack compilation phase that at which the processor should be called. Default value is `compilation.optimize-assets`. Can be one of the following values:
    * `compilation.optimize-chunk-assets`
    * `compilation.optimize-assets`
    * `emit`
* canPrint: A boolean indicating if the plugin can print messages to the console, defaults to `true`.

Note: An environment supporting Promises or a Promise polyfill is needed for this plugin to be used.

## Example:

``` javascript
var cssnano = require('cssnano');
var LastCallWebpackPlugin = require('last-call-webpack-plugin');
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new LastCallWebpackPlugin({
      assetProcessors: [
        {
          regExp:  /\.js$/,
          processor: (assetName, asset) => Promise.resolve('// Author: John Doe \n' + asset.source())
        }, {
          regExp:  /\.css$/,
          processor: (assetName, asset) => cssnano.process(asset.source())
            .then(r => r.css)
        }
      ],
      canPrint: true
    })
	]
}
```

## Assets manipulation

The `processor` method is supplied an `assets` object that allows asset manipulation via the `setAsset(assetName, assetValue)` method. If `assetValue` is null the asset will be deleted. This object can be used to generate aditional assets (like source maps) or rename the an asset (create a new asset and delete the current one).

Example:

``` javascript
var cssnano = require('cssnano');
var LastCallWebpackPlugin = require('last-call-webpack-plugin');
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new LastCallWebpackPlugin({
      assetProcessors: [{
        regExp:  /\.css$/,
        processor: (assetName, asset, assets) => {
          assets.setAsset(assetName + '.map', null); // Delete the <assetName>.map asset.
          assets.setAsset(assetName + '.log', 'All OK'); // Add the <assetName>.log asset with the content 'All OK'.
          return cssnano
            .process(asset.source())
            .then(r => r.css)
        }
      }],
      canPrint: true
    })
	]
}
```

The `assets` object also has a `getAsset(assetName)` method to get the content of an asset (returns undefined in case the asset does not exist).

## License

MIT (http://www.opensource.org/licenses/mit-license.php)