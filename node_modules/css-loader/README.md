[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <img width="180" height="180" vspace="20"
    src="https://cdn.worldvectorlogo.com/logos/css-3.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>CSS Loader</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev css-loader
```

<h2 align="center">Usage</h2>

The `css-loader` interprets `@import` and `url()` like `import/require()`
and will resolve them.

Good loaders for requiring your assets are the [file-loader](https://github.com/webpack/file-loader)
and the [url-loader](https://github.com/webpack/url-loader) which you should specify in your config (see [below](https://github.com/webpack-contrib/css-loader#assets)).

**file.js**
```js
import css from 'file.css';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

### `toString`

You can also use the css-loader results directly as a string, such as in Angular's component style.

**webpack.config.js**
```js
{
   test: /\.css$/,
   use: [
     'to-string-loader',
     'css-loader'
   ]
}
```

or

```js
const css = require('./test.css').toString();

console.log(css); // {String}
```

If there are SourceMaps, they will also be included in the result string.

If, for one reason or another, you need to extract CSS as a
plain string resource (i.e. not wrapped in a JS module) you
might want to check out the [extract-loader](https://github.com/peerigon/extract-loader).
It's useful when you, for instance, need to post process the CSS as a string.

**webpack.config.js**
```js
{
   test: /\.css$/,
   use: [
     'handlebars-loader', // handlebars loader expects raw resource string
     'extract-loader',
     'css-loader'
   ]
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`url`](#url)**|`{Boolean}`|`true`| Enable/Disable `url()` handling|
|**[`import`](#import)** |`{Boolean}`|`true`| Enable/Disable @import handling|
|**[`modules`](#modules)**|`{Boolean}`|`false`|Enable/Disable CSS Modules|
|**[`localIdentName`](#localidentname)**|`{String}`|`[hash:base64]`|Configure the generated ident|
|**[`sourceMap`](#sourcemap)**|`{Boolean}`|`false`|Enable/Disable Sourcemaps|
|**[`camelCase`](#camelcase)**|`{Boolean\|String}`|`false`|Export Classnames in CamelCase|
|**[`importLoaders`](#importloaders)**|`{Number}`|`0`|Number of loaders applied before CSS loader|

### `url`

To disable `url()` resolving by `css-loader` set the option to `false`.

To be compatible with existing css files (if not in CSS Module mode).

```
url(image.png) => require('./image.png')
url(~module/image.png) => require('module/image.png')
```

### `import`

To disable `@import` resolving by `css-loader` set the option to `false`

```css
@import url('https://fonts.googleapis.com/css?family=Roboto');
```

> _⚠️ Use with caution, since this disables resolving for **all** `@import`s, including css modules `composes: xxx from 'path/to/file.css'` feature._

### [`modules`](https://github.com/css-modules/css-modules)

The query parameter `modules` enables the **CSS Modules** spec.

This enables local scoped CSS by default. (You can switch it off with `:global(...)` or `:global` for selectors and/or rules.).

#### `Scope`

By default CSS exports all classnames into a global selector scope. Styles can be locally scoped to avoid globally scoping styles.

The syntax `:local(.className)` can be used to declare `className` in the local scope. The local identifiers are exported by the module.

With `:local` (without brackets) local mode can be switched on for this selector. `:global(.className)` can be used to declare an explicit global selector. With `:global` (without brackets) global mode can be switched on for this selector.

The loader replaces local selectors with unique identifiers. The chosen unique identifiers are exported by the module.

```css
:local(.className) { background: red; }
:local .className { color: green; }
:local(.className .subClass) { color: green; }
:local .className .subClass :global(.global-class-name) { color: blue; }
```

```css
._23_aKvs-b8bW2Vg3fwHozO { background: red; }
._23_aKvs-b8bW2Vg3fwHozO { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name { color: blue; }
```

> ℹ️ Identifiers are exported

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1'
}
```

CamelCase is recommended for local selectors. They are easier to use within the imported JS module.

`url()` URLs in block scoped (`:local .abc`) rules behave like requests in modules.

```
file.png => ./file.png
~module/file.png => module/file.png
```

You can use `:local(#someId)`, but this is not recommended. Use classes instead of ids.

#### `Composing`

When declaring a local classname you can compose a local class from another local classname.

```css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: className;
  background: blue;
}
```

This doesn't result in any change to the CSS itself but exports multiple classnames.

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO'
}
```

``` css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
  color: yellow;
}

._13LGdX8RMStbBE9w-t0gZ1 {
  background: blue;
}
```

#### `Importing`

To import a local classname from another module.

```css
:local(.continueButton) {
  composes: button from 'library/button.css';
  background: red;
}
```

```css
:local(.nameEdit) {
  composes: edit highlight from './edit.css';
  background: red;
}
```

To import from multiple modules use multiple `composes:` rules.

```css
:local(.className) {
  composes: edit hightlight from './edit.css';
  composes: button from 'module/button.css';
  composes: classFromThisModule;
  background: red;
}
```

### `localIdentName`

You can configure the generated ident with the `localIdentName` query parameter. See [loader-utils's documentation](https://github.com/webpack/loader-utils#interpolatename) for more information on options.

 **webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
}
```

You can also specify the absolute path to your custom `getLocalIdent` function to generate classname based on a different schema. This requires `webpack >= 2.2.1` (it supports functions in the `options` object).

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    getLocalIdent: (context, localIdentName, localName, options) => {
      return 'whatever_random_class_name'
    }
  }
}
```

> ℹ️ For prerendering with extract-text-webpack-plugin you should use `css-loader/locals` instead of `style-loader!css-loader` **in the prerendering bundle**. It doesn't embed CSS but only exports the identifier mappings.

### `sourceMap`

To include source maps set the `sourceMap` option.

I.e. the extract-text-webpack-plugin can handle them.

They are not enabled by default because they expose a runtime overhead and increase in bundle size (JS source maps do not). In addition to that relative paths are buggy and you need to use an absolute public path which includes the server URL.

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}
```

### `camelCase`

By default, the exported JSON keys mirror the class names. If you want to camelize class names (useful in JS), pass the query parameter `camelCase` to css-loader.

|Name|Type|Description|
|:--:|:--:|:----------|
|**`true`**|`{Boolean}`|Class names will be camelized|
|**`'dashes'`**|`{String}`|Only dashes in class names will be camelized|
|**`'only'`** |`{String}`|Introduced in `0.27.1`. Class names will be camelized, the original class name will be removed from the locals|
|**`'dashesOnly'`**|`{String}`|Introduced in `0.27.1`. Dashes in class names will be camelized, the original class name will be removed from the locals|

**file.css**
```css
.class-name {}
```

**file.js**
```js
import { className } from 'file.css';
```

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    camelCase: true
  }
}
```

### `importLoaders`

The query parameter `importLoaders` allows you to configure how many loaders before `css-loader` should be applied to `@import`ed resources.

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
}
```

This may change in the future when the module system (i. e. webpack) supports loader matching by origin.

<h2 align="center">Examples</h2>

### Assets

The following `webpack.config.js` can load CSS files, embed small PNG/JPG/GIF/SVG images as well as fonts as [Data URLs](https://tools.ietf.org/html/rfc2397) and copy larger files to the output directory.

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
}
```

### Extract

For production builds it's recommended to extract the CSS from your bundle being able to use parallel loading of CSS/JS resources later on.
This can be achieved by using the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to extract the CSS when running in production mode.

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/bebraw.png?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/d3viant0ne.png?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/SpaceK33z.png?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/TheLarkInn.png?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/michael-ciniawsky.png?v=3&s=150">
        </br>
        <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/evilebottnawi.png?v=3&s=150">
        </br>
        <a href="https://github.com/evilebottnawi">Evilebot Tnawi</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/joscha.png?v=3&s=150">
        </br>
        <a href="https://github.com/joscha">Joscha Feth</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/css-loader.svg
[npm-url]: https://npmjs.com/package/css-loader

[node]: https://img.shields.io/node/v/css-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/css-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/css-loader

[tests]: http://img.shields.io/travis/webpack-contrib/css-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/css-loader

[cover]: https://codecov.io/gh/webpack-contrib/css-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/css-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
