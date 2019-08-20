# Webpack Assets Manifest

[![Build Status](https://travis-ci.org/webdeveric/webpack-assets-manifest.svg?branch=master)](https://travis-ci.org/webdeveric/webpack-assets-manifest)
[![codecov](https://codecov.io/gh/webdeveric/webpack-assets-manifest/branch/master/graph/badge.svg)](https://codecov.io/gh/webdeveric/webpack-assets-manifest)
[![dependencies Status](https://david-dm.org/webdeveric/webpack-assets-manifest/status.svg)](https://david-dm.org/webdeveric/webpack-assets-manifest)
[![devDependencies Status](https://david-dm.org/webdeveric/webpack-assets-manifest/dev-status.svg)](https://david-dm.org/webdeveric/webpack-assets-manifest?type=dev)

This Webpack plugin will generate a JSON file that matches the original filename with the hashed version.

## Installation

:warning: Starting with version 2, this plugin works with Webpack 4+. Version 3.1 requires Webpack 4.4+.

```shell
npm install webpack-assets-manifest --save-dev
```

If you're using Webpack 3 or below, you'll need to install version 1.

```shell
npm install webpack-assets-manifest@1 --save-dev
```

## New in version 3

* Added [hooks](#hooks).
* Added [examples](examples/).
* Added options:
  * [`integrity`](#integrity)
  * [`integrityHashes`](#integrityhashes)
  * [`entrypoints`](#entrypoints)
  * [`entrypointsKey`](#entrypointskey)
* Updated `customize` callback arguments. See [customized](examples/customized.js) example.
* Removed `contextRelativeKeys` option.

## Usage

In your webpack config, require the plugin then add an instance to the `plugins` array.

```js
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  entry: {
    // Your entry points
  },
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].js',
  },
  module: {
    // Your loader rules go here.
  },
  plugins: [
    new WebpackAssetsManifest({
      // Options go here
    }),
 ],
};
```

## Sample output

```json
{
  "main.js": "main-9c68d5e8de1b810a80e4.js",
  "main.css": "main-9c68d5e8de1b810a80e4.css",
  "images/logo.svg": "images/logo-b111da4f34cefce092b965ebc1078ee3.svg"
}
```

---

## Options ([read the schema](src/options-schema.json))

### `output`

Type: `string`

Default: `manifest.json`

This is where to save the manifest file relative to your webpack `output.path`.

### `assets`

Type: `object`

Default: `{}`

Data is stored in this object.

#### Sharing data

You can share data between instances by passing in your own object in the `assets` option.

This is useful in [multi-compiler mode](https://github.com/webpack/webpack/tree/master/examples/multi-compiler).

```js
const data = Object.create(null);

const manifest1 = new WebpackAssetsManifest({
  assets: data,
});

const manifest2 = new WebpackAssetsManifest({
  assets: data,
});
```

### `space`

Type: `int`

Default: `2`

Number of spaces to use for pretty printing.

### `replacer`

Type: `null`, `function`, or `array`

Default: `null`

[Replacer reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)

You'll probably want to use the `transform` hook instead.

### `fileExtRegex`

Type: `regex`

Default: `/\.\w{2,4}\.(?:map|gz)$|\.\w+$/i`

This is the regular expression used to find file extensions. You'll probably never need to change this.

### `writeToDisk`

Type: `boolean`

Default: `false`

Write the manifest to disk using `fs` during `afterEmit`.

:warning: If you're using another language for your site and you're using `webpack-dev-server` to process your assets during development,
you should set `writeToDisk: true` and provide an absolute path in `output` so the manifest file is actually written to disk and not kept only in memory.

### `sortManifest`

Type: `boolean`, `function`

Default: `true`

The manifest is sorted alphabetically by default. You can turn off sorting by setting `sortManifest: false`.

If you want more control over how the manifest is sorted, you can provide your own
[comparison function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
See the [sorted](examples/sorted.js) example.

```js
new WebpackAssetsManifest({
  sortManifest(a, b) {
    // Return -1, 0, or 1
  }
});
```

### `merge`

Type: `boolean`, `string`

Default: `false`

If the `output` file already exists and you'd like to add to it, use `merge: true`.
The default behavior is to use the existing keys/values without modification.

```js
new WebpackAssetsManifest({
  output: '/path/to/manifest.json',
  merge: true
});
```

If you need to customize during merge, use `merge: 'customize'`. 

If you want to know if `customize` was called when merging with an existing manifest, you can check `manifest.isMerging`.

```js
new WebpackAssetsManifest({
  merge: 'customize',
  customize(entry, original, manifest, asset) {
    if ( manifest.isMerging ) {
      // Do something
    }
  },
}),
```

### `publicPath`

Type: `string`, `function`, `boolean`,

Default: `null`

When using `publicPath: true`, your webpack config `output.publicPath` will be used as the value prefix.

```js
const manifest = new WebpackAssetsManifest({
  publicPath: true,
});
```

When using a string, it will be the value prefix. One common use is to prefix your CDN URL.

```js
const manifest = new WebpackAssetsManifest({
  publicPath: '//cdn.example.com',
});
```

If you'd like to have more control, use a function. See the [custom CDN](examples/custom-cdn.js) example.

```js
const manifest = new WebpackAssetsManifest({
  publicPath(filename, manifest)
  {
    // customize filename here
    return filename;
  }
});
```

### `entrypoints`

Type: `boolean`

Default: `false`

Include `compilation.entrypoints` in the manifest file.

### `entrypointsKey`

Type: `string`, `boolean`

Default: `entrypoints`

If this is set to `false`, the `entrypoints` will be added to the root of the manifest.

### `integrity`

Type: `boolean`

Default: `false`

Include the [subresource integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).

### `integrityHashes`

Type: `array`

Default: `[ 'sha256', 'sha384', 'sha512' ]`

Hash algorithms to use when generating SRI. For browsers, the currently the allowed integrity hashes are `sha256`, `sha384`, and `sha512`.

Other hash algorithms can be used if your target environment is not a browser.
If you were to create a tool to audit your S3 buckets for
[data integrity](https://aws.amazon.com/premiumsupport/knowledge-center/data-integrity-s3/),
you could use something like this [example](examples/aws-s3-data-integrity.js) to record the `md5` hashes.

### `integrityPropertyName`

Type: `string`

Default: `integrity`

This is the property that will be set on each entry in `compilation.assets`, which will then be available during `customize`.
It is customizable so that you can have multiple instances of this plugin and not have them overwrite the `currentAsset.integrity` property.

You'll probably only need to change this if you're using multiple instances of this plugin to create different manifests.

### `apply`

Type: `function`

Default: `null`

Callback to run after setup is complete.

### `customize`

Type: `function`

Default: `null`

Callback to customize each entry in the manifest.

### `transform`

Type: `function`

Default: `null`

Callback to transform the entire manifest.

### `done`

Type: `function`

Default: `null`

Callback to run after the compilation is done and the manifest has been written.

---

### Hooks

This plugin is using hooks from [Tapable](https://github.com/webpack/tapable/).

The `apply`, `customize`, `transform`, and `done` options are automatically tapped into the appropriate hook.

| Name | Type | Callback signature |
| ---- | ---- | --------- |
| `apply` | `SyncHook` | `function(manifest){}` |
| `customize` | `SyncWaterfallHook` | `function(entry, original, manifest, asset){}` |
| `transform` | `SyncWaterfallHook` | `function(assets, manifest){}` |
| `done` | `SyncHook` | `function(manifest, stats){}` |
| `options` | `SyncWaterfallHook` | `function(options){}` |
| `afterOptions` | `SyncHook` | `function(options){}` |

#### Tapping into hooks

Tap into a hook by calling the `tap` method on the hook as shown below.

If you want more control over exactly what gets added to your manifest, then use the `customize` and `transform` hooks.
See the [customized](examples/customized.js) and [transformed](examples/transformed.js) examples.

```js
const manifest = new WebpackAssetsManifest();

manifest.hooks.apply.tap('YourPluginName', function(manifest) {
  // Do something here
  manifest.set('some-key', 'some-value');
});

manifest.hooks.customize.tap('YourPluginName', function(entry, original, manifest, asset) {
  // customize entry here
  return entry;
});

manifest.hooks.transform.tap('YourPluginName', function(assets, manifest) {
  // customize assets here
  return assets;
});

manifest.hooks.options.tap('YourPluginName', function(options) {
  // customize options here
  return options;
});

manifest.hooks.done.tap('YourPluginName', function(manifest, stats) {
  console.log(`The manifest has been written to ${manifest.getOutputPath()}`);
  console.log(`${manifest}`);
});
```

These hooks can also be set by passing them in the constructor options.

```js
new WebpackAssetsManifest({
  done(manifest, stats) {
    console.log(`The manifest has been written to ${manifest.getOutputPath()}`);
    console.log(`${manifest}`);
  }
});
```

If the manifest instance is passed to a hook, you can use `has(key)`, `get(key)`, `set(key, value)`, `setRaw(key, value)`,and `delete(key)` methods to manage what goes into the manifest.
