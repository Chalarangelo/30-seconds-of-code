<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <br>
  <br>

[![npm][npm]][npm-url]

[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![builds][builds]][builds-url]
[![builds2][builds2]][builds2-url]
[![coverage][cover]][cover-url]
[![licenses][licenses]][licenses-url]

  <br>
  <a href="https://dependabot.com/compatibility-score.html?dependency-name=webpack&package-manager=npm_and_yarn&new-version=latest">
    <img src="https://api.dependabot.com/badges/compatibility_score?dependency-name=webpack&package-manager=npm_and_yarn&version-scheme=semver&target-version=latest">
  </a>
	<a href="https://npmcharts.com/compare/webpack?minimal=true">
		<img src="https://img.shields.io/npm/dm/webpack.svg">
	</a>
	<a href="https://packagephobia.now.sh/result?p=webpack">
		<img src="https://packagephobia.now.sh/badge?p=webpack" alt="install size">
	</a>
	<a href="https://opencollective.com/webpack#backer">
		<img src="https://opencollective.com/webpack/backers/badge.svg">
	</a>
	<a href="https://opencollective.com/webpack#sponsors">
		<img src="https://opencollective.com/webpack/sponsors/badge.svg">
	</a>
	<a href="https://github.com/webpack/webpack/graphs/contributors">
		<img src="https://img.shields.io/github/contributors/webpack/webpack.svg">
	</a>
	<a href="https://gitter.im/webpack/webpack">
		<img src="https://badges.gitter.im/webpack/webpack.svg">
	</a>
  <h1>webpack</h1>
  <p>
    webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  </p>
</div>

<h2 align="center">Install</h2>

Install with npm:

```bash
npm install --save-dev webpack
```

Install with yarn:

```bash
yarn add webpack --dev
```

<h2 align="center">Introduction</h2>

webpack is a bundler for modules. The main purpose is to bundle JavaScript
files for usage in a browser, yet it is also capable of transforming, bundling,
or packaging just about any resource or asset.

**TL;DR**

* Bundles [ES Modules](http://www.2ality.com/2014/09/es6-modules-final.html), [CommonJS](http://wiki.commonjs.org/), and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules (even combined).
* Can create a single bundle or multiple chunks that are asynchronously loaded at runtime (to reduce initial loading time).
* Dependencies are resolved during compilation, reducing the runtime size.
* Loaders can preprocess files while compiling, e.g. TypeScript to JavaScript, Handlebars strings to compiled functions, images to Base64, etc.
* Highly modular plugin system to do whatever else your application requires.

### Get Started

Check out webpack's quick [**Get Started**](https://webpack.js.org/get-started/) guide and the [other guides](https://webpack.js.org/guides/).

### Browser Compatibility

webpack supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).
webpack also needs `Promise` for `import()` and `require.ensure()`. If you want to support older browsers, you will need to [load a polyfill](https://webpack.js.org/guides/shimming/) before using these expressions.

<h2 align="center">Concepts</h2>

### [Plugins](https://webpack.js.org/plugins/)

webpack has a [rich plugin
interface](https://webpack.js.org/plugins/). Most of the features
within webpack itself use this plugin interface. This makes webpack very
**flexible**.

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|[mini-css-extract-plugin][mini-css]|![mini-css-npm]|![mini-css-size]|Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.|
|[compression-webpack-plugin][compression]|![compression-npm]|![compression-size]|Prepares compressed versions of assets to serve them with Content-Encoding|
|[i18n-webpack-plugin][i18n]|![i18n-npm]|![i18n-size]|Adds i18n support to your bundles|
|[html-webpack-plugin][html-plugin]|![html-plugin-npm]|![html-plugin-size]| Simplifies creation of HTML files (`index.html`) to serve your bundles|
|[extract-text-webpack-plugin][extract]|![extract-npm]|![extract-size]|Extract text from a bundle, or bundles, into a separate file|

[common-npm]: https://img.shields.io/npm/v/webpack.svg
[extract]: https://github.com/webpack/extract-text-webpack-plugin
[extract-npm]: https://img.shields.io/npm/v/extract-text-webpack-plugin.svg
[extract-size]: https://packagephobia.now.sh/badge?p=extract-text-webpack-plugin
[mini-css]: https://github.com/webpack-contrib/mini-css-extract-plugin
[mini-css-npm]: https://img.shields.io/npm/v/mini-css-extract-plugin.svg
[mini-css-size]: https://packagephobia.now.sh/badge?p=mini-css-extract-plugin
[component]: https://github.com/webpack/component-webpack-plugin
[component-npm]: https://img.shields.io/npm/v/component-webpack-plugin.svg
[component-size]: https://packagephobia.now.sh/badge?p=component-webpack-plugin
[compression]: https://github.com/webpack/compression-webpack-plugin
[compression-npm]: https://img.shields.io/npm/v/compression-webpack-plugin.svg
[compression-size]: https://packagephobia.now.sh/badge?p=compression-webpack-plugin
[i18n]: https://github.com/webpack/i18n-webpack-plugin
[i18n-npm]: https://img.shields.io/npm/v/i18n-webpack-plugin.svg
[i18n-size]: https://packagephobia.now.sh/badge?p=i18n-webpack-plugin
[html-plugin]: https://github.com/ampedandwired/html-webpack-plugin
[html-plugin-npm]: https://img.shields.io/npm/v/html-webpack-plugin.svg
[html-plugin-size]: https://packagephobia.now.sh/badge?p=html-webpack-plugin

### [Loaders](https://webpack.js.org/loaders/)

webpack enables use of loaders to preprocess files. This allows you to bundle
**any static resource** way beyond JavaScript. You can easily [write your own
loaders](https://webpack.js.org/api/loaders/) using Node.js.

Loaders are activated by using `loadername!` prefixes in `require()` statements,
or are automatically applied via regex from your webpack configuration.

#### Files

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|[raw-loader][raw]|![raw-npm]|![raw-size]|Loads raw content of a file (utf-8)|
|[val-loader][val]|![val-npm]|![val-size]|Executes code as module and considers exports as JS code|
|[url-loader][url]|![url-npm]|![url-size]|Works like the file loader, but can return a Data Url if the file is smaller than a limit|
|[file-loader][file]|![file-npm]|![file-size]|Emits the file into the output folder and returns the (relative) url|


[raw]: https://github.com/webpack/raw-loader
[raw-npm]: https://img.shields.io/npm/v/raw-loader.svg
[raw-size]: https://packagephobia.now.sh/badge?p=raw-loader
[val]: https://github.com/webpack/val-loader
[val-npm]: https://img.shields.io/npm/v/val-loader.svg
[val-size]: https://packagephobia.now.sh/badge?p=val-loader
[url]: https://github.com/webpack/url-loader
[url-npm]: https://img.shields.io/npm/v/url-loader.svg
[url-size]: https://packagephobia.now.sh/badge?p=url-loader
[file]: https://github.com/webpack/file-loader
[file-npm]: https://img.shields.io/npm/v/file-loader.svg
[file-size]: https://packagephobia.now.sh/badge?p=file-loader

#### JSON

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|<a href="https://github.com/webpack/json-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/json.svg"></a>|![json-npm]|![json-size]|Loads a JSON file (included by default)|
|<a href="https://github.com/webpack/json5-loader"><img width="48" height="10.656" src="https://cdn.rawgit.com/json5/json5-logo/master/json5-logo.svg"></a>|![json5-npm]|![json5-size]|Loads and transpiles a JSON 5 file|
|<a href="https://github.com/awnist/cson-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/coffeescript.svg"></a>|![cson-npm]|![cson-size]|Loads and transpiles a CSON file|


[json-npm]: https://img.shields.io/npm/v/json-loader.svg
[json-size]: https://packagephobia.now.sh/badge?p=json-loader
[json5-npm]: https://img.shields.io/npm/v/json5-loader.svg
[json5-size]: https://packagephobia.now.sh/badge?p=json5-loader
[cson-npm]: https://img.shields.io/npm/v/cson-loader.svg
[cson-size]: https://packagephobia.now.sh/badge?p=cson-loader

#### Transpiling

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|<a href="https://github.com/webpack/script-loader">`<script>`</a>|![script-npm]|![script-size]|Executes a JavaScript file once in global context (like in script tag), `require()`s are not parsed|
|<a href="https://github.com/babel/babel-loader"><img width="48" height="48" title="babel-loader" src="https://worldvectorlogo.com/logos/babel-10.svg"></a>|![babel-npm]|![babel-size]|Loads ES2015+ code and transpiles to ES5 using <a href="https://github.com/babel/babel">Babel</a>|
|<a href="https://github.com/jupl/traceur-loader"><img width="48" height="48" src="https://google.github.com/traceur-compiler/logo/tc.svg"></a>|![traceur-npm]|![traceur-size]|Loads ES2015+ code and transpiles to ES5 using [Traceur](https://github.com/google/traceur-compiler)|
|<a href="https://github.com/TypeStrong/ts-loader"><img width="48" height="48" src="https://cdn.rawgit.com/Microsoft/TypeScript/master/doc/logo.svg"></a>|![type-npm]|![type-size]|Loads TypeScript like JavaScript|
|[`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)|![awesome-typescript-npm]|![awesome-typescript-size]|Awesome TypeScript loader for webpack|
|<a href="https://github.com/webpack/coffee-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/coffeescript.svg"></a>|![coffee-npm]|![coffee-size]|Loads CoffeeScript like JavaScript|


[script-npm]: https://img.shields.io/npm/v/script-loader.svg
[script-size]: https://packagephobia.now.sh/badge?p=script-loader
[babel-npm]: https://img.shields.io/npm/v/babel-loader.svg
[babel-size]: https://packagephobia.now.sh/badge?p=babel-loader
[traceur-npm]: https://img.shields.io/npm/v/traceur-loader.svg
[traceur-size]: https://packagephobia.now.sh/badge?p=traceur-loader
[coffee-npm]: https://img.shields.io/npm/v/coffee-loader.svg
[coffee-size]: https://packagephobia.now.sh/badge?p=coffee-loader
[type-npm]: https://img.shields.io/npm/v/ts-loader.svg
[type-size]: https://packagephobia.now.sh/badge?p=ts-loader
[awesome-typescript-npm]: https://img.shields.io/npm/v/awesome-typescript-loader.svg
[awesome-typescript-size]: https://packagephobia.now.sh/badge?p=awesome-typescript-loader

#### Templating

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|<a href="https://github.com/webpack/html-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/html5.svg"></a>|![html-npm]|![html-size]|Exports HTML as string, requires references to static resources|
|<a href="https://github.com/pugjs/pug-loader"><img width="48" height="48" src="https://cdn.rawgit.com/pugjs/pug-logo/master/SVG/pug-final-logo-_-colour-128.svg"></a>|![pug-npm]|![pug-size]|Loads Pug templates and returns a function|
|<a href="https://github.com/webpack/jade-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/jade-3.svg"></a>|![jade-npm]|![jade-size]|Loads Jade templates and returns a function|
|<a href="https://github.com/peerigon/markdown-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/markdown.svg"></a>|![md-npm]|![md-size]|Compiles Markdown to HTML|
|<a href="https://github.com/posthtml/posthtml-loader"><img width="48" height="48" src="http://posthtml.github.io/posthtml/logo.svg"></a>|![posthtml-npm]|![posthtml-size]|Loads and transforms a HTML file using [PostHTML](https://github.com/posthtml/posthtml)|
|<a href="https://github.com/altano/handlebars-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/handlebars-1.svg"></a>|![hbs-npm]|![hbs-size]| Compiles Handlebars to HTML|


[html-npm]: https://img.shields.io/npm/v/html-loader.svg
[html-size]: https://packagephobia.now.sh/badge?p=html-loader
[pug-npm]: https://img.shields.io/npm/v/pug-loader.svg
[pug-size]: https://packagephobia.now.sh/badge?p=pug-loader
[jade-npm]: https://img.shields.io/npm/v/jade-loader.svg
[jade-size]: https://packagephobia.now.sh/badge?p=jade-loader
[md-npm]: https://img.shields.io/npm/v/markdown-loader.svg
[md-size]: https://packagephobia.now.sh/badge?p=markdown-loader
[posthtml-npm]: https://img.shields.io/npm/v/posthtml-loader.svg
[posthtml-size]: https://packagephobia.now.sh/badge?p=posthtml-loader
[hbs-npm]: https://img.shields.io/npm/v/handlebars-loader.svg
[hbs-size]: https://packagephobia.now.sh/badge?p=handlebars-loader

#### Styling

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|<a href="https://github.com/webpack/style-loader">`<style>`</a>|![style-npm]|![style-size]|Add exports of a module as style to DOM|
|<a href="https://github.com/webpack/css-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/css-3.svg"></a>|![css-npm]|![css-size]|Loads CSS file with resolved imports and returns CSS code|
|<a href="https://github.com/webpack/less-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/less-63.svg"></a>|![less-npm]|![less-size]|Loads and compiles a LESS file|
|<a href="https://github.com/jtangelder/sass-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/sass-1.svg"></a>|![sass-npm]|![sass-size]|Loads and compiles a Sass/SCSS file|
|<a href="https://github.com/shama/stylus-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/stylus.svg"></a>|![stylus-npm]|![stylus-size]|Loads and compiles a Stylus file|
|<a href="https://github.com/postcss/postcss-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/postcss.svg"></a>|![postcss-npm]|![postcss-size]|Loads and transforms a CSS/SSS file using [PostCSS](http://postcss.org)|


[style-npm]: https://img.shields.io/npm/v/style-loader.svg
[style-size]: https://packagephobia.now.sh/badge?p=style-loader
[css-npm]: https://img.shields.io/npm/v/css-loader.svg
[css-size]: https://packagephobia.now.sh/badge?p=css-loader
[less-npm]: https://img.shields.io/npm/v/less-loader.svg
[less-size]: https://packagephobia.now.sh/badge?p=less-loader
[sass-npm]: https://img.shields.io/npm/v/sass-loader.svg
[sass-size]: https://packagephobia.now.sh/badge?p=sass-loader
[stylus-npm]: https://img.shields.io/npm/v/stylus-loader.svg
[stylus-size]: https://packagephobia.now.sh/badge?p=stylus-loader
[postcss-npm]: https://img.shields.io/npm/v/postcss-loader.svg
[postcss-size]: https://packagephobia.now.sh/badge?p=postcss-loader

#### Linting & Testing

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|<a href="https://github.com/webpack/mocha-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/mocha.svg"></a>|![mocha-npm]|![mocha-size]|Tests with mocha (Browser/NodeJS)|
|<a href="https://github.com/MoOx/eslint-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/eslint.svg"></a>|![eslint-npm]|![eslint-size]|PreLoader for linting code using ESLint|
|<a href="https://github.com/webpack-contrib/jshint-loader"><img width="48" height="20.64" src="http://jshint.com/res/jshint-dark.png"></a>|![jshint-npm]|![jshint-size]|PreLoader for linting code using JSHint|

[mocha-npm]: https://img.shields.io/npm/v/mocha-loader.svg
[mocha-size]: https://packagephobia.now.sh/badge?p=mocha-loader
[eslint-npm]: https://img.shields.io/npm/v/eslint-loader.svg
[eslint-size]: https://packagephobia.now.sh/badge?p=eslint-loader
[jshint-npm]: https://img.shields.io/npm/v/jshint-loader.svg
[jshint-size]: https://packagephobia.now.sh/badge?p=jshint-loader
[jscs-npm]: https://img.shields.io/npm/v/jscs-loader.svg
[jscs-size]: https://packagephobia.now.sh/badge?p=jscs-loader

#### Frameworks

|Name|Status|Install Size|Description|
|:--:|:----:|:----------:|:----------|
|<a href="https://github.com/vuejs/vue-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/vue-9.svg"></a>|![vue-npm]|![vue-size]|Loads and compiles Vue Components|
|<a href="https://github.com/webpack-contrib/polymer-webpack-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/polymer.svg"></a>|![polymer-npm]|![polymer-size]|Process HTML & CSS with preprocessor of choice and `require()` Web Components like first-class modules|
|<a href="https://github.com/TheLarkInn/angular2-template-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/angular-icon-1.svg"></a>|![angular-npm]|![angular-size]| Loads and compiles Angular 2 Components|
|<a href="https://github.com/riot/tag-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/riot.svg"></a>|![riot-npm]|![riot-size]| Riot official webpack loader|



[vue-npm]: https://img.shields.io/npm/v/vue-loader.svg
[vue-size]: https://packagephobia.now.sh/badge?p=vue-loader
[polymer-npm]: https://img.shields.io/npm/v/polymer-webpack-loader.svg
[polymer-size]: https://packagephobia.now.sh/badge?p=polymer-webpack-loader
[angular-npm]: https://img.shields.io/npm/v/angular2-template-loader.svg
[angular-size]: https://packagephobia.now.sh/badge?p=angular2-template-loader
[riot-npm]: https://img.shields.io/npm/v/riot-tag-loader.svg
[riot-size]: https://packagephobia.now.sh/badge?p=riot-tag-loader

### Performance

webpack uses async I/O and has multiple caching levels. This makes webpack fast
and incredibly **fast** on incremental compilations.

### Module Formats

webpack supports ES2015+, CommonJS and AMD modules **out of the box**. It performs clever static
analysis on the AST of your code. It even has an evaluation engine to evaluate
simple expressions. This allows you to **support most existing libraries** out of the box.

### [Code Splitting](https://webpack.js.org/guides/code-splitting/)

webpack allows you to split your codebase into multiple chunks. Chunks are
loaded asynchronously at runtime. This reduces the initial loading time.

### [Optimizations](https://webpack.js.org/guides/production-build/)

webpack can do many optimizations to **reduce the output size of your
JavaScript** by deduplicating frequently used modules, minifying, and giving
you full control of what is loaded initially and what is loaded at runtime
through code splitting. It can also make your code chunks **cache
friendly** by using hashes.

<h2 align="center">Contributing</h2>

**We want contributing to webpack to be fun, enjoyable, and educational for anyone, and everyone.** We have a [vibrant ecosystem](https://medium.com/webpack/contributors-guide/home) that spans beyond this single repo. We welcome you to check out any of the repositories in [our organization](http://github.com/webpack) or [webpack-contrib organization](http://github.com/webpack-contrib) which houses all of our loaders and plugins.

Contributions go far beyond pull requests and commits. Although we love giving you the opportunity to put your stamp on webpack, we also are thrilled to receive a variety of other contributions including:

* [Documentation](https://github.com/webpack/webpack.js.org) updates, enhancements, designs, or bugfixes
* Spelling or grammar fixes
* README.md corrections or redesigns
* Adding unit, or functional tests
* Triaging GitHub issues -- especially determining whether an issue still persists or is reproducible.
* [Searching #webpack on twitter](https://twitter.com/search?q=webpack) and helping someone else who needs help
* Teaching others how to contribute to one of the many webpack's repos!
* [Blogging, speaking about, or creating tutorials](https://github.com/webpack-contrib/awesome-webpack) about one of webpack's many features.
* Helping others in our webpack [gitter channel](https://gitter.im/webpack/webpack).

If you are worried or don't know where to start, you can **always** reach out to [Sean Larkin (@TheLarkInn) on Twitter](https://twitter.com/thelarkinn) or simply submit an issue and a maintainer can help give you guidance!

We have also started a series on our [Medium Publication](https://medium.com/webpack) called [The Contributor's Guide to webpack](https://medium.com/webpack/contributors-guide/home). We welcome you to read it and post any questions or responses if you still need help.

_Looking to speak about webpack?_ We'd **love** to review your talk abstract/CFP! You can email it to webpack [at] opencollective [dot] com and we can give pointers or tips!!!

<h3 align="center">Creating your own plugins and loaders</h3>

If you create a loader or plugin, we would <3 for you to open source it, and put it on npm. We follow the `x-loader`, `x-webpack-plugin` naming convention.

<h2 align="center">Support</h2>

We consider webpack to be a low-level tool used not only individually but also layered beneath other awesome tools. Because of it's flexibility, webpack isn't always the _easiest_ entry-level solution, however we do believe it is the most powerful. That said, we're always looking for ways improve and simplify the tool without compromising functionality. If you have any ideas on ways to accomplish this, we're all ears!

If you're just getting started, take a look at [our new docs and concepts page](https://webpack.js.org/concepts/). This has a high level overview that is great for beginners!!

Looking for webpack 1 docs? Please check out the old [wiki](https://github.com/webpack/docs/wiki/contents), but note that this deprecated version is no longer supported.

If you want to discuss something or just need help, [here is our Gitter room](https://gitter.im/webpack/webpack) where there are always individuals looking to help out!

If you are still having difficulty, we would love for you to post
a question to [StackOverflow with the webpack tag](https://stackoverflow.com/tags/webpack). It is much easier to answer questions that include your webpack.config.js and relevant files! So if you can provide them, we'd be extremely grateful (and more likely to help you find the answer!)

If you are twitter savvy you can tweet #webpack with your question and someone should be able to reach out and help also.

If you have discovered a 🐜 or have a feature suggestion, feel free to create an issue on Github.

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack?ref=badge_large)

<h2 align="center">Core Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/sokra.png?s=150">
        <br>
        <a href="https://github.com/sokra">Tobias Koppers</a>
        <p>Core</p>
        <br>
        <p>Founder of webpack</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/jhnns.png?s=150">
        <br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
        <p>Loaders &amp; Plugins</p>
        <br>
        <p>Early adopter of webpack</p>
      </td>
      <td align="center" width="20%" valign="top">
        <img width="150" height="150" src="https://github.com/TheLarkInn.png?s=150">
        <br>
        <a href="https://github.com/TheLarkInn">Sean T. Larkin</a>
        <p>Public Relations</p>
        <br>
        <p>Founder of the core team</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/spacek33z.png?s=150">
        <br>
        <a href="https://github.com/spacek33z">Kees Kluskens</a>
        <p>Development</p>
        <br>
        <p>Sponsor</p>
        <a href="https://codeyellow.nl/">
          <img height="15px" src="https://cloud.githubusercontent.com/assets/1365881/20286583/ad62eb04-aac7-11e6-9c14-a0fef35b9b56.png">
        </a>
		<br>
      </td>
     </tr>
  </tbody>
</table>

<h2 align="center">Sponsoring</h2>

Most of the core team members, webpack contributors and contributors in the ecosystem do this open source work in their free time. If you use webpack for a serious task, and you'd like us to invest more time on it, please donate. This project increases your income/productivity too. It makes development and applications faster and it reduces the required bandwidth.

This is how we use the donations:

* Allow the core team to work on webpack
* Thank contributors if they invested a large amount of time in contributing
* Support projects in the ecosystem that are of great value for users
* Support projects that are voted most (work in progress)
* Infrastructure cost
* Fees for money handling


<h2 align="center">Premium Partners</h2>

<div align="center">

<a href="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship" target="_blank"><img align="center" src="https://raw.githubusercontent.com/webpack/media/2b399d58/horiz-banner-ad-ag-grid.png">
</a>

</div>

<h2 align="center">Other Backers and Sponsors</h2>

Before we started using OpenCollective, donations were made anonymously. Now that we have made the switch, we would like to acknowledge these sponsors (and the ones who continue to donate using OpenCollective). If we've missed someone, please send us a PR, and we'll add you to this list.

<div align="center">

[Google Angular Team](https://angular.io/), [Architects.io](http://architects.io/),
<a href="https://moonmail.io" target="_blank" title="Email Marketing Software"><img
src="https://static.moonmail.io/moonmail-logo.svg" height="30" alt="MoonMail"></a>
<a href="https://monei.net" target="_blank" title="Best payment gateway rates"><img
src="https://static.monei.net/monei-logo.svg" height="30" alt="MONEI"></a>

</div>

<h2 align="center">Gold Sponsors</h2>

[Become a gold sponsor](https://opencollective.com/webpack#sponsor) and get your logo on our README on Github with a link to your site.

<div align="center">

<a href="https://opencollective.com/webpack/goldsponsor/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/goldsponsor/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/goldsponsor/29/avatar.svg?requireActive=false"></a>

</div>

<h2 align="center">Silver Sponsors</h2>

[Become a silver sponsor](https://opencollective.com/webpack#sponsor) and get your logo on our README on Github with a link to your site.

<div align="center">

<a href="https://opencollective.com/webpack/silversponsor/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/silversponsor/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/silversponsor/29/avatar.svg?requireActive=false"></a>

</div>

<h2 align="center">Bronze Sponsors</h2>

[Become a bronze sponsor](https://opencollective.com/webpack#sponsor) and get your logo on our README on Github with a link to your site.

<div align="center">

<a href="https://opencollective.com/webpack/sponsor/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/29/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/30/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/30/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/31/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/31/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/32/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/32/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/33/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/33/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/34/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/34/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/35/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/35/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/36/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/36/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/37/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/37/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/38/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/38/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/39/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/39/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/40/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/40/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/41/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/41/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/42/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/42/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/43/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/43/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/44/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/44/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/45/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/45/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/46/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/46/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/47/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/47/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/48/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/48/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/49/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/49/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/50/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/50/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/51/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/51/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/52/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/52/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/53/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/53/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/54/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/54/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/55/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/55/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/56/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/56/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/57/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/57/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/58/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/58/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/59/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/59/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/60/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/60/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/61/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/61/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/62/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/62/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/63/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/63/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/64/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/64/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/65/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/65/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/66/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/66/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/67/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/67/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/68/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/68/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/69/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/69/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/70/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/70/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/71/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/71/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/72/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/72/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/73/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/73/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/74/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/74/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/75/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/75/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/76/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/76/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/77/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/77/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/78/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/78/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/79/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/79/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/80/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/80/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/81/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/81/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/82/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/82/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/83/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/83/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/84/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/84/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/85/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/85/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/86/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/86/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/87/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/87/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/88/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/88/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/89/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/89/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/90/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/90/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/91/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/91/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/92/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/92/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/93/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/93/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/94/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/94/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/95/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/95/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/96/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/96/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/97/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/97/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/98/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/98/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/99/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/99/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/sponsor/100/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/sponsor/100/avatar.svg?requireActive=false"></a>

</div>

<h2 align="center">Backers</h2>

[Become a backer](https://opencollective.com/webpack#backer) and get your image on our README on Github with a link to your site.

<a href="https://opencollective.com/webpack/backer/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/29/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/30/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/30/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/31/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/31/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/32/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/32/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/33/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/33/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/34/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/34/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/35/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/35/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/36/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/36/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/37/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/37/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/38/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/38/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/39/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/39/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/40/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/40/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/41/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/41/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/42/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/42/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/43/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/43/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/44/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/44/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/45/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/45/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/46/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/46/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/47/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/47/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/48/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/48/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/49/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/49/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/50/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/50/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/51/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/51/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/52/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/52/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/53/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/53/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/54/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/54/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/55/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/55/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/56/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/56/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/57/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/57/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/58/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/58/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/59/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/59/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/60/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/60/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/61/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/61/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/62/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/62/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/63/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/63/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/64/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/64/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/65/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/65/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/66/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/66/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/67/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/67/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/68/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/68/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/69/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/69/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/70/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/70/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/71/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/71/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/72/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/72/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/73/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/73/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/74/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/74/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/75/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/75/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/76/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/76/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/77/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/77/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/78/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/78/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/79/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/79/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/80/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/80/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/81/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/81/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/82/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/82/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/83/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/83/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/84/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/84/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/85/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/85/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/86/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/86/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/87/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/87/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/88/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/88/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/89/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/89/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/90/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/90/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/91/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/91/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/92/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/92/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/93/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/93/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/94/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/94/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/95/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/95/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/96/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/96/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/97/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/97/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/98/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/98/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/99/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/99/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/webpack/backer/100/website?requireActive=false" target="_blank"><img src="https://opencollective.com/webpack/backer/100/avatar.svg?requireActive=false"></a>

<h2 align="center">Thanks to</h2>
<p align="center">(In chronological order)</p>

* @google for [Google Web Toolkit (GWT)](http://www.gwtproject.org/), which aims to compile Java to JavaScript. It features a similar [Code Splitting](http://www.gwtproject.org/doc/latest/DevGuideCodeSplitting.html) as webpack.
* @medikoo for [modules-webmake](https://github.com/medikoo/modules-webmake), which is a similar project. webpack was born because I wanted Code Splitting for modules-webmake. Interestingly the [Code Splitting issue is still open](https://github.com/medikoo/modules-webmake/issues/7) (thanks also to @Phoscur for the discussion).
* @substack for [browserify](http://browserify.org/), which is a similar project and source for many ideas.
* @jrburke for [require.js](http://requirejs.org/), which is a similar project and source for many ideas.
* @defunctzombie for the [browser-field spec](https://gist.github.com/defunctzombie/4339901), which makes modules available for node.js, browserify and webpack.
* Every early webpack user, which contributed to webpack by writing issues or PRs. You influenced the direction...
* @shama, @jhnns and @sokra for maintaining this project
* Everyone who has written a loader for webpack. You are the ecosystem...
* Everyone I forgot to mention here, but also influenced webpack.


[npm]: https://img.shields.io/npm/v/webpack.svg
[npm-url]: https://npmjs.com/package/webpack

[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/webpack/webpack.svg
[deps-url]: https://david-dm.org/webpack/webpack

[tests]: https://img.shields.io/travis/webpack/webpack/master.svg
[tests-url]: https://travis-ci.org/webpack/webpack

[builds-url]: https://ci.appveyor.com/project/sokra/webpack/branch/master
[builds]: https://ci.appveyor.com/api/projects/status/github/webpack/webpack?svg=true

[builds2]: https://dev.azure.com/webpack/webpack/_apis/build/status/webpack.webpack
[builds2-url]: https://dev.azure.com/webpack/webpack/_build/latest?definitionId=3

[licenses-url]: https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack?ref=badge_shield
[licenses]: https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack.svg?type=shield

[cover]: https://img.shields.io/coveralls/webpack/webpack.svg
[cover-url]: https://coveralls.io/r/webpack/webpack/
