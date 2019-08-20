[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>File Loader</h1>
  <p>Instructs webpack to emit the required object as file and to return its public URL</p>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev file-loader
```

<h2 align="center"><a href="https://webpack.js.org/concepts/loaders">Usage</a></h2>

By default the filename of the resulting file is the MD5 hash of the file's contents with the original extension of the required resource.

```js
import img from './file.png'
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ]
  }
}
```

Emits `file.png` as file in the output directory and returns the public URL

```
"/public/path/0dcbbaa7013869e351f.png"
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`name`**|`{String\|Function}`|`[hash].[ext]`|Configure a custom filename template for your file|
|**`regExp`**|`{RegExp}`|`'undefined'`|Let you extract some parts of the file path to reuse them in the `name` property|
|**`context`**|`{String}`|`this.options.context`|Configure a custom file context, defaults to `webpack.config.js` [context](https://webpack.js.org/configuration/entry-context/#context)|
|**`publicPath`**|`{String\|Function}`|[`__webpack_public_path__ `](https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific-)|Configure a custom `public` path for your file|
|**`outputPath`**|`{String\|Function}`|`'undefined'`|Configure a custom `output` path for your file|
|**`useRelativePath`**|`{Boolean}`|`false`|Should be `true` if you wish to generate a `context` relative URL for each file|
|**`emitFile`**|`{Boolean}`|`true`|By default a file is emitted, however this can be disabled if required (e.g. for server side packages)|

### `name`

You can configure a custom filename template for your file using the query parameter `name`. For instance, to copy a file from your `context` directory into the output directory retaining the full directory structure, you might use

#### `{String}`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }  
}
```

#### `{Function}`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name (file) {
      if (env === 'development') {
        return '[path][name].[ext]'
      }

      return '[hash].[ext]'
    }
  }  
}
```

### `regExp`

Defines a `regExp` to match some parts of the file path. These capture groups can be reused in the `name` property using `[N]` placeholder. Note that `[0]` will be replaced by the entire tested string, whereas `[1]` will contain the first capturing parenthesis of your regex and so on...

```js
import img from './customer01/file.png'
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
    name: '[1]-[name].[ext]'
  }  
}
```

```
customer01-file.png
```

#### `placeholders`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`[ext]`**|`{String}`|`file.extname`|The extension of the resource|
|**`[name]`**|`{String}`|`file.basename`|The basename of the resource|
|**`[path]`**|`{String}`|`file.dirname`|The path of the resource relative to the `context`|
|**`[hash]`**|`{String}`|`md5`|The hash of the content, hashes below for more info|
|**`[N]`**|`{String}`|``|The `n-th` match obtained from matching the current file name against the `regExp`|

#### `hashes`

`[<hashType>:hash:<digestType>:<length>]` optionally you can configure

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`hashType`**|`{String}`|`md5`|`sha1`, `md5`, `sha256`, `sha512`|
|**`digestType`**|`{String}`|`hex`|`hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`|
|**`length`**|`{Number}`|`9999`|The length in chars|

By default, the path and name you specify will output the file in that same directory and will also use that same URL path to access the file.

### `context`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    context: ''
  }  
}
```

You can specify custom `output` and `public` paths by using `outputPath`, `publicPath` and `useRelativePath`

### `publicPath`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    publicPath: 'assets/'
  }  
}
```

### `outputPath`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    outputPath: 'images/'
  }  
}
```

### `useRelativePath`

`useRelativePath` should be `true` if you wish to generate a relative URL to the for each file context.

```js
{
  loader: 'file-loader',
  options: {
    useRelativePath: process.env.NODE_ENV === "production"
  }
}
```

### `emitFile`

By default a file is emitted, however this can be disabled if required (e.g. for server side packages).

```js
import img from './file.png'
```

```js
{
  loader: 'file-loader',
  options: {
    emitFile: false
  }  
}
```

> ⚠️  Returns the public URL but does **not** emit a file

```
`${publicPath}/0dcbbaa701328e351f.png`
```

<h2 align="center">Examples</h2>


```js
import png from 'image.png'
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: 'dirname/[hash].[ext]'
  }  
}
```

```
dirname/0dcbbaa701328ae351f.png
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[sha512:hash:base64:7].[ext]'
  }  
}
```

```
gdyb21L.png
```

```js
import png from 'path/to/file.png'
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]?[hash]'
  }  
}
```

```
path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/file-loader.svg
[npm-url]: https://npmjs.com/package/file-loader

[node]: https://img.shields.io/node/v/file-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/file-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/file-loader

[tests]: http://img.shields.io/travis/webpack-contrib/file-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/file-loader

[cover]: https://img.shields.io/codecov/c/github/webpack-contrib/file-loader.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/file-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
