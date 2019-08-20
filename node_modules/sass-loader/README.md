[![npm][npm]][npm-url]
[![node][node]][node-url]
[![npm-stats][npm-stats]][npm-url]
[![deps][deps]][deps-url]
[![travis][travis]][travis-url]
[![appveyor][appveyor]][appveyor-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <img height="100"
    src="https://worldvectorlogo.com/logos/sass-1.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Sass Loader</h1>
  <p>Loads a Sass/SCSS file and compiles it to CSS.</p>
</div>

Use the [css-loader](https://github.com/webpack-contrib/css-loader) or the [raw-loader](https://github.com/webpack-contrib/raw-loader) to turn it into a JS module and the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to extract it into a separate file.
Looking for the webpack 1 loader? Check out the [archive/webpack-1 branch](https://github.com/webpack-contrib/sass-loader/tree/archive/webpack-1).

<h2 align="center">Install</h2>

```bash
npm install sass-loader node-sass webpack --save-dev
```

The sass-loader requires [webpack](https://github.com/webpack) as a
[`peerDependency`](https://docs.npmjs.com/files/package.json#peerdependencies)
and it requires you to install either [Node Sass](https://github.com/sass/node-sass) or [Dart Sass](https://github.com/sass/dart-sass) on your
own. This allows you to control the versions of all your dependencies, and to
choose which Sass implementation to use.

[Node Sass]: https://github.com/sass/node-sass
[Dart Sass]: http://sass-lang.com/dart-sass

<h2 align="center">Examples</h2>

Chain the sass-loader with the [css-loader](https://github.com/webpack-contrib/css-loader) and the [style-loader](https://github.com/webpack-contrib/style-loader) to immediately apply all styles to the DOM.

```bash
npm install style-loader css-loader --save-dev
```

```js
// webpack.config.js
module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    }
};
```

You can also pass options directly to [Node Sass][] or [Dart Sass][]:

```js
// webpack.config.js
module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        }]
    }
};
```

See [the Node Sass documentation](https://github.com/sass/node-sass/blob/master/README.md#options) for all available Sass options.

By default the loader resolve the implementation based on your dependencies.
Just add required implementation to `package.json` 
(`node-sass` or `sass` package) and install dependencies. 

Example where the `sass-loader` loader uses the `sass` (`dart-sass`) implementation:

**package.json**

```json
{
   "devDependencies": {
      "sass-loader": "*",
      "sass": "*"
   }
}
```

Example where the `sass-loader` loader uses the `node-sass` implementation:

**package.json**

```json
{
   "devDependencies": {
      "sass-loader": "*",
      "node-sass": "*"
   }
}
```

Beware the situation 
when `node-sass` and `sass` was installed, by default the `sass-loader` 
prefers `node-sass`, to avoid this situation use the `implementation` option. 

The special `implementation` option determines which implementation of Sass to
use. It takes either a [Node Sass][] or a [Dart Sass][] module. For example, to
use Dart Sass, you'd pass:

```js
// ...
    {
        loader: "sass-loader",
        options: {
            implementation: require("sass")
        }
    }
// ...
```

Note that when using Dart Sass, **synchronous compilation is twice as fast as
asynchronous compilation** by default, due to the overhead of asynchronous
callbacks. To avoid this overhead, you can use the
[`fibers`](https://www.npmjs.com/package/fibers) package to call asynchronous
importers from the synchronous code path. To enable this, pass the `Fiber` class
to the `fiber` option:

```js
// webpack.config.js
const Fiber = require('fibers');

module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                    fiber: Fiber
                }
            }]
        }]
    }
};
```

### In production

Usually, it's recommended to extract the style sheets into a dedicated file in production using the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin). This way your styles are not dependent on JavaScript:

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                // fallback to style-loader in development
                process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
```

<h2 align="center">Usage</h2>

### Imports

webpack provides an [advanced mechanism to resolve files](https://webpack.js.org/concepts/module-resolution/). The sass-loader uses Sass's custom importer feature to pass all queries to the webpack resolving engine. Thus you can import your Sass modules from `node_modules`. Just prepend them with a `~` to tell webpack that this is not a relative import:

```css
@import "~bootstrap/dist/css/bootstrap";
```

It's important to only prepend it with `~`, because `~/` resolves to the home directory. webpack needs to distinguish between `bootstrap` and `~bootstrap` because CSS and Sass files have no special syntax for importing relative files. Writing `@import "file"` is the same as `@import "./file";`

### Problems with `url(...)`

Since Sass/[libsass](https://github.com/sass/libsass) does not provide [url rewriting](https://github.com/sass/libsass/issues/532), all linked assets must be relative to the output.

- If you're just generating CSS without passing it to the css-loader, it must be relative to your web root.
- If you pass the generated CSS on to the css-loader, all urls must be relative to the entry-file (e.g. `main.scss`).

More likely you will be disrupted by this second issue. It is natural to expect relative references to be resolved against the `.scss` file in which they are specified (like in regular `.css` files). Thankfully there are a two solutions to this problem:

- Add the missing url rewriting using the [resolve-url-loader](https://github.com/bholloway/resolve-url-loader). Place it before the sass-loader in the loader chain.
- Library authors usually provide a variable to modify the asset path. [bootstrap-sass](https://github.com/twbs/bootstrap-sass) for example has an `$icon-font-path`. Check out [this working bootstrap example](https://github.com/webpack-contrib/sass-loader/tree/master/test/bootstrapSass).

### Extracting style sheets

Bundling CSS with webpack has some nice advantages like referencing images and fonts with hashed urls or [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) in development. In production, on the other hand, it's not a good idea to apply your style sheets depending on JS execution. Rendering may be delayed or even a [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) might be visible. Thus it's often still better to have them as separate files in your final production build.

There are two possibilities to extract a style sheet from the bundle:

- [extract-loader](https://github.com/peerigon/extract-loader) (simpler, but specialized on the css-loader's output)
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) (use this, when using webpack 4 configuration. Works in all use-cases)

### Source maps

To enable CSS source maps, you'll need to pass the `sourceMap` option to the sass-loader *and* the css-loader. Your `webpack.config.js` should look like this:

```javascript
module.exports = {
    ...
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }]
    }
};
```

If you want to edit the original Sass files inside Chrome, [there's a good blog post](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0). Checkout [test/sourceMap](https://github.com/webpack-contrib/sass-loader/tree/master/test) for a running example.

### Environment variables

If you want to prepend Sass code before the actual entry file, you can set the `data` option. In this case, the sass-loader will not override the `data` option but just append the entry's content. This is especially useful when some of your Sass variables depend on the environment:

```javascript
{
    loader: "sass-loader",
    options: {
        data: "$env: " + process.env.NODE_ENV + ";"
    }
}
```

The `data` option supports `Function` notation:

```javascript
{
    loader: "sass-loader",
    options: {
        data: (loaderContext) => {
          // More information about avalaible options https://webpack.js.org/api/loaders/
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext,resourcePath);
          
          if (relativePath === "styles/foo.scss") {
             return "$value: 100px;"
          }
          
          return "$value: 200px;"
        }
    }
}
```

**Please note:** Since you're injecting code, this will break the source mappings in your entry file. Often there's a simpler solution than this, like multiple Sass entry files.

<h2 align="center">Maintainers</h2>

<table>
    <tr>
      <td align="center">
        <a href="https://github.com/jhnns"><img width="150" height="150" src="https://avatars0.githubusercontent.com/u/781746?v=3"></a><br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
      <td align="center">
        <a href="https://github.com/webpack-contrib"><img width="150" height="150" src="https://avatars1.githubusercontent.com/u/1243901?v=3&s=460"></a><br>
        <a href="https://github.com/webpack-contrib">Jorik Tangelder</a>
      </td>
      <td align="center">
        <a href="https://github.com/akiran"><img width="150" height="150" src="https://avatars1.githubusercontent.com/u/3403295?v=3"></a><br>
        <a href="https://github.com/akiran">Kiran</a>
      </td>
    <tr>
</table>


<h2 align="center">License</h2>

[MIT](http://www.opensource.org/licenses/mit-license.php)

[npm]: https://img.shields.io/npm/v/sass-loader.svg
[npm-stats]: https://img.shields.io/npm/dm/sass-loader.svg
[npm-url]: https://npmjs.com/package/sass-loader

[node]: https://img.shields.io/node/v/sass-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/sass-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/sass-loader

[travis]: http://img.shields.io/travis/webpack-contrib/sass-loader.svg
[travis-url]: https://travis-ci.org/webpack-contrib/sass-loader

[appveyor-url]: https://ci.appveyor.com/project/webpack-contrib/sass-loader/branch/master
[appveyor]: https://ci.appveyor.com/api/projects/status/rqpy1vaovh20ttxs/branch/master?svg=true

[cover]: https://codecov.io/gh/webpack-contrib/sass-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/sass-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
