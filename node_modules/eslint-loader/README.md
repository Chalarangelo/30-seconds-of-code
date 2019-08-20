# eslint-loader [![Build Status](https://travis-ci.org/webpack-contrib/eslint-loader.svg?branch=master)](https://travis-ci.org/webpack-contrib/eslint-loader)

> eslint loader for webpack

## Install

```console
$ npm install eslint-loader --save-dev
```

**NOTE**: You also need to install `eslint` from npm, if you haven't already:

```console
$ npm install eslint --save-dev
```

## Usage

In your webpack configuration

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      }
    ]
  }
  // ...
};
```

When using with transpiling loaders (like `babel-loader`), make sure they are in correct order
(bottom to top). Otherwise files will be checked after being processed by `babel-loader`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  }
  // ...
};
```

To be safe, you can use `enforce: "pre"` section to check source files, not modified
by other loaders (like `babel-loader`)

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
  // ...
};
```

### Options

You can pass [eslint options](http://eslint.org/docs/developer-guide/nodejs-api#cliengine)
using standard webpack [loader options](https://webpack.js.org/configuration/module/#useentry).

Note that the config option you provide will be passed to the `CLIEngine`.
This is a different set of options than what you'd specify in `package.json` or `.eslintrc`.
See the [eslint docs](http://eslint.org/docs/developer-guide/nodejs-api#cliengine) for more detail.

#### `fix` (default: false)

This option will enable
[ESLint autofix feature](http://eslint.org/docs/user-guide/command-line-interface#fix).

**Be careful: this option will change source files.**

#### `cache` (default: false)

This option will enable caching of the linting results into a file.
This is particularly useful in reducing linting time when doing a full build.

This can either be a `boolean` value or the cache directory path(ex: `'./.eslint-loader-cache'`).

If `cache: true` is used, the cache file is written to the `./node_modules/.cache` directory.
This is the recommended usage.

#### `formatter` (default: eslint stylish formatter)

Loader accepts a function that will have one argument: an array of eslint messages (object).
The function must return the output as a string.
You can use official eslint formatters.

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // several examples !

          // default value
          formatter: require("eslint/lib/formatters/stylish"),

          // community formatter
          formatter: require("eslint-friendly-formatter"),

          // custom formatter
          formatter: function(results) {
            // `results` format is available here
            // http://eslint.org/docs/developer-guide/nodejs-api.html#executeonfiles()

            // you should return a string
            // DO NOT USE console.*() directly !
            return "OUTPUT";
          }
        }
      }
    ]
  }
};
```

#### `eslintPath` (default: "eslint")

Path to `eslint` instance that will be used for linting.  
If the `eslintPath` is a folder like a official eslint, or specify a `formatter` option. now you dont have to install `eslint` .

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          eslintPath: path.join(__dirname, "reusable-eslint")
        }
      }
    ]
  }
};
```

#### Errors and Warning

**By default the loader will auto adjust error reporting depending
on eslint errors/warnings counts.**
You can still force this behavior by using `emitError` **or** `emitWarning` options:

##### `emitError` (default: `false`)

Loader will always return errors if this option is set to `true`.

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitError: true
        }
      }
    ]
  }
};
```

##### `emitWarning` (default: `false`)

Loader will always return warnings if option is set to `true`. If you're using hot module replacement, you may wish to enable this in development, or else updates will be skipped when there's an eslint error.

#### `quiet` (default: `false`)

Loader will process and report errors only and ignore warnings if this option is set to true

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          quiet: true
        }
      }
    ]
  }
};
```

##### `failOnWarning` (default: `false`)

Loader will cause the module build to fail if there are any eslint warnings.

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnWarning: true
        }
      }
    ]
  }
};
```

##### `failOnError` (default: `false`)

Loader will cause the module build to fail if there are any eslint errors.

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        }
      }
    ]
  }
};
```

##### `outputReport` (default: `false`)

Write the output of the errors to a file, for example a checkstyle xml file for use for reporting on Jenkins CI

The `filePath` is relative to the webpack config: output.path
You can pass in a different formatter for the output file, if none is passed in the default/configured formatter will be used

```js
module.exports = {
  entry: "...",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          outputReport: {
            filePath: "checkstyle.xml",
            formatter: require("eslint/lib/formatters/checkstyle")
          }
        }
      }
    ]
  }
};
```

## Gotchas

### NoErrorsPlugin

`NoErrorsPlugin` prevents webpack from outputting anything into a bundle. So even ESLint warnings
will fail the build. No matter what error settings are used for `eslint-loader`.

So if you want to see ESLint warnings in console during development using `WebpackDevServer`
remove `NoErrorsPlugin` from webpack config.

### Defining `configFile` or using `eslint -c path/.eslintrc`

Bear in mind that when you define `configFile`, `eslint` doesn't automatically look for
`.eslintrc` files in the directory of the file to be linted.
More information is available in official eslint documentation in section [_Using Configuration Files_](http://eslint.org/docs/user-guide/configuring#using-configuration-files).
See [#129](https://github.com/webpack-contrib/eslint-loader/issues/129).

---

## Changelog
[Changelog](CHANGELOG.md)

## License
[MIT](./LICENSE)
