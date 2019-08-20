# react-dev-utils

This package includes some utilities used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

## Usage in Create React App Projects

These utilities come by default with [Create React App](https://github.com/facebookincubator/create-react-app), which includes it by default. **You don’t need to install it separately in Create React App projects.**

## Usage Outside of Create React App

If you don’t use Create React App, or if you [ejected](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject), you may keep using these utilities. Their development will be aligned with Create React App, so major versions of these utilities may come out relatively often. Feel free to fork or copy and paste them into your projects if you’d like to have more control over them, or feel free to use the old versions. Not all of them are React-specific, but we might make some of them more React-specific in the future.

### Entry Points

There is no single entry point. You can only import individual top-level modules.

#### `new InterpolateHtmlPlugin(replacements: {[key:string]: string})`

This Webpack plugin lets us interpolate custom variables into `index.html`.<br>
It works in tandem with [HtmlWebpackPlugin](https://github.com/ampedandwired/html-webpack-plugin) 2.x via its [events](https://github.com/ampedandwired/html-webpack-plugin#events).

```js
var path = require('path');
var HtmlWebpackPlugin = require('html-dev-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// Webpack config
var publicUrl = '/my-custom-url';

module.exports = {
  output: {
    // ...
    publicPath: publicUrl + '/'
  },
  // ...
  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
      // You can pass any key-value pairs, this was just an example.
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
    }),
    // ...
  ],
  // ...
}
```


#### `new ModuleScopePlugin(appSrc: string, allowedFiles?: string[])`

This Webpack plugin ensures that relative imports from app's source directory don't reach outside of it.

```js
var path = require('path');
var ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');


module.exports = {
  // ...
  resolve: {
    // ...
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      // ...
    ],
    // ...
  },
  // ...
}
```

#### `new WatchMissingNodeModulesPlugin(nodeModulesPath: string)`

This Webpack plugin ensures `npm install <library>` forces a project rebuild.<br>
We’re not sure why this isn't Webpack's default behavior.<br>
See [#186](https://github.com/facebookincubator/create-react-app/issues/186) for details.

```js
var path = require('path');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

// Webpack config
module.exports = {
  // ...
  plugins: [
    // ...
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules'))
  ],
  // ...
}
```

#### `checkRequiredFiles(files: Array<string>): boolean`

Makes sure that all passed files exist.<br>
Filenames are expected to be absolute.<br>
If a file is not found, prints a warning message and returns `false`.

```js
var path = require('path');
var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

if (!checkRequiredFiles([
  path.resolve('public/index.html'),
  path.resolve('src/index.js')
])) {
  process.exit(1);
}
```

#### `clearConsole(): void`

Clears the console, hopefully in a cross-platform way.

```js
var clearConsole = require('react-dev-utils/clearConsole');

clearConsole();
console.log('Just cleared the screen!');
```

#### `eslintFormatter(results: Object): string`

This is our custom ESLint formatter that integrates well with Create React App console output.<br>
You can use the default one instead if you prefer so.

```js
const eslintFormatter = require('react-dev-utils/eslintFormatter');

// In your webpack config:
// ...
module: {
   rules: [
     {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              // Pass the formatter:
              formatter: eslintFormatter,
            },
          },
        ],
      }
   ]
}
```

#### `FileSizeReporter`

##### `measureFileSizesBeforeBuild(buildFolder: string): Promise<OpaqueFileSizes>`

Captures JS and CSS asset sizes inside the passed `buildFolder`. Save the result value to compare it after the build.

##### `printFileSizesAfterBuild(webpackStats: WebpackStats, previousFileSizes: OpaqueFileSizes, buildFolder: string, maxBundleGzipSize?: number, maxChunkGzipSize?: number)`

Prints the JS and CSS asset sizes after the build, and includes a size comparison with `previousFileSizes` that were captured earlier using `measureFileSizesBeforeBuild()`. `maxBundleGzipSize` and `maxChunkGzipSizemay` may optionally be specified to display a warning when the main bundle or a chunk exceeds the specified size (in bytes).

```js
var {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} = require('react-dev-utils/FileSizeReporter');

measureFileSizesBeforeBuild(buildFolder).then(previousFileSizes => {
  return cleanAndRebuild().then(webpackStats => {
    printFileSizesAfterBuild(webpackStats, previousFileSizes, buildFolder);
  });
});
```

#### `formatWebpackMessages({errors: Array<string>, warnings: Array<string>}): {errors: Array<string>, warnings: Array<string>}`

Extracts and prettifies warning and error messages from webpack [stats](https://github.com/webpack/docs/wiki/node.js-api#stats) object.

```js
var webpack = require('webpack');
var config = require('../config/webpack.config.dev');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

var compiler = webpack(config);

compiler.plugin('invalid', function() {
  console.log('Compiling...');
});

compiler.plugin('done', function(stats) {
  var rawMessages = stats.toJson({}, true);
  var messages = formatWebpackMessages(rawMessages);
  if (!messages.errors.length && !messages.warnings.length) {
    console.log('Compiled successfully!');
  }
  if (messages.errors.length) {
    console.log('Failed to compile.');
    messages.errors.forEach(e => console.log(e));
    return;
  }
  if (messages.warnings.length) {
    console.log('Compiled with warnings.');
    messages.warnings.forEach(w => console.log(w));
  }
});
```

#### `printBuildError(error: Object): void`

Prettify some known build errors.
Pass an Error object to log a prettified error message in the console.

```
  const printBuildError = require('react-dev-utils/printBuildError')
  try {
    build()
  } catch(e) {
    printBuildError(e) // logs prettified message
  }
```

#### `getProcessForPort(port: number): string`

Finds the currently running process on `port`.
Returns a string containing the name and directory, e.g.,

```
create-react-app
in /Users/developer/create-react-app
```

```js
var getProcessForPort = require('react-dev-utils/getProcessForPort');

getProcessForPort(3000);
```

#### `launchEditor(fileName: string, lineNumber: number): void`

On macOS, tries to find a known running editor process and opens the file in it. It can also be explicitly configured by `REACT_EDITOR`, `VISUAL`, or `EDITOR` environment variables. For example, you can put `REACT_EDITOR=atom` in your `.env.local` file, and Create React App will respect that.

#### `noopServiceWorkerMiddleware(): ExpressMiddleware`

Returns Express middleware that serves a `/service-worker.js` that resets any previously set service worker configuration. Useful for development.

#### `openBrowser(url: string): boolean`

Attempts to open the browser with a given URL.<br>
On Mac OS X, attempts to reuse an existing Chrome tab via AppleScript.<br>
Otherwise, falls back to [opn](https://github.com/sindresorhus/opn) behavior.


```js
var path = require('path');
var openBrowser = require('react-dev-utils/openBrowser');

if (openBrowser('http://localhost:3000')) {
  console.log('The browser tab has been opened!');
}
```

#### `printHostingInstructions(appPackage: Object, publicUrl: string, publicPath: string, buildFolder: string, useYarn: boolean): void`

Prints hosting instructions after the project is built.

Pass your parsed `package.json` object as `appPackage`, your the URL where you plan to host the app as `publicUrl`, `output.publicPath` from your Webpack configuration as `publicPath`, the `buildFolder` name, and whether to `useYarn` in instructions.

```js
const appPackage = require(paths.appPackageJson);
const publicUrl = paths.publicUrl;
const publicPath = config.output.publicPath;
printHostingInstructions(appPackage, publicUrl, publicPath, 'build', true);
```

#### `WebpackDevServerUtils`

##### `choosePort(host: string, defaultPort: number): Promise<number | null>`

Returns a Promise resolving to either `defaultPort` or next available port if the user confirms it is okay to do. If the port is taken and the user has refused to use another port, or if the terminal is not interactive and can’t present user with the choice, resolves to `null`.

##### `createCompiler(webpack: Function, config: Object, appName: string, urls: Object, useYarn: boolean): WebpackCompiler`

Creates a Webpack compiler instance for WebpackDevServer with built-in helpful messages. Takes the `require('webpack')` entry point as the first argument. To provide the `urls` argument, use `prepareUrls()` described below.

##### `prepareProxy(proxySetting: string, appPublicFolder: string): Object`

Creates a WebpackDevServer `proxy` configuration object from the `proxy` setting in `package.json`.

##### `prepareUrls(protocol: string, host: string, port: number): Object`

Returns an object with local and remote URLs for the development server. Pass this object to `createCompiler()` described above.

#### `webpackHotDevClient`

This is an alternative client for [WebpackDevServer](https://github.com/webpack/webpack-dev-server) that shows a syntax error overlay.

It currently supports only Webpack 3.x.

```js
// Webpack development config
module.exports = {
  // ...
  entry: [
    // You can replace the line below with these two lines if you prefer the
    // stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    'react-dev-utils/webpackHotDevClient',
    'src/index'
  ],
  // ...
}
```
