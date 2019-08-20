# gatsby-plugin-sass

Provides drop-in support for SASS/SCSS stylesheets

## Install

`npm install --save node-sass gatsby-plugin-sass`

## How to use

1. Include the plugin in your `gatsby-config.js` file.

```javascript:title="gatsby-config.js"
plugins: [`gatsby-plugin-sass`]
```

2. Write your stylesheets in Sass/SCSS and require or import them as normal.

```css:title="src/index.sass"
html {
  background-color: rebeccapurple;
  p {
    color: white;
  }
}
```

```javascript
import("./src/index.sass")
```

## Other options

If you need to pass options to Sass use the plugins options, see [node-sass](https://github.com/sass/node-sass)/[dart-sass](https://github.com/sass/dart-sass) docs
for all available options.

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      includePaths: ["absolute/path/a", "absolute/path/b"],
      ...
    },
  },
]
```

If you need to override the default options passed into [`css-loader`](https://github.com/webpack-contrib/css-loader):

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      cssLoaderOptions: {
        camelCase: false,
      },
    },
  },
]
```

### Alternative Sass Implementations

By default the node implementation of Sass (`node-sass`) is used. To use the implementation written in Dart (`dart-sass`), you can install `sass` instead of `node-sass` and pass it into the options as the implementation:

```bash
npm install --save-dev sass
```

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      implementation: require("sass"),
    },
  },
]
```

### SASS Precision

SASS defaults to [10 digits of precision](https://github.com/sass/sass/pull/2297). If you want some other level of precision (e.g. if you use Bootstrap), you may configure it as follows:

#### Bootstrap 4

See [Bootstrap's documentation on theming](https://github.com/twbs/bootstrap/blob/master/site/content/docs/4.3/getting-started/theming.md#sass) for reference.

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      postCssPlugins: [somePostCssPlugin()],
      precision: 6,
    },
  },
]
```

### Bootstrap 3 (with `bootstrap-sass`)

See [`bootstrap-sass`](https://github.com/twbs/bootstrap-sass/blob/master/README.md#sass-number-precision) for reference.

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      postCssPlugins: [somePostCssPlugin()],
      precision: 8,
    },
  },
]
```

### With CSS Modules

Using CSS Modules requires no additional configuration. Simply prepend `.module` to the extension. For example: `App.scss` -> `App.module.scss`.
Any file with the `module` extension will use CSS Modules.

## SASS & CSS Modules file Regexes

To override the file regex for SASS or CSS modules,

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      // Override the file regex for SASS
      sassRuleTest: /\.global\.s(a|c)ss$/,
      // Override the file regex for CSS modules
      sassRuleModulesTest: /\.mod\.s(a|c)ss$/,
    },
  },
]
```

### PostCSS plugins

PostCSS is also included to handle some default optimizations like autoprefixing
and common cross-browser flexbox bugs. Normally you don't need to think about it, but if
you'd prefer to add additional postprocessing to your Sass output you can specify plugins
in the plugin options.

## Relative paths & url()

This plugin resolves `url()` paths relative to the entry SCSS/Sass file not – as might be expected – the location relative to the declaration. Under the hood, it makes use of [sass-loader](https://github.com/webpack-contrib/sass-loader/blob/master/README.md#problems-with-url) and this is documented in the [readme](https://github.com/webpack-contrib/sass-loader/blob/master/README.md#problems-with-url).

Using [resolve-url-loader](https://github.com/bholloway/resolve-url-loader) provides a workaround, if you want to use relative url just install the plugin and then add it to your sass plugin options configuration.

First:

```javascript
  npm install resolve-url-loader --save-dev
  or
  yarn add resolve-url-loader --dev
```

And then:

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-sass",
    options: {
      useResolveUrlLoader: true,
    },
  },
]
```

You can also configure resolve-url-plugin providing some options (see plugin documentation for all options https://github.com/bholloway/resolve-url-loader):

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-sass",
    options: {
      useResolveUrlLoader: {
        options: {
          debug: true,
        },
      },
    },
  },
]
```

NOTE that adding resolve-url-loader will use `sourceMap: true` on sass-loader (as it is required for the plugin to work), you can then activate/deactivate source-map for sass files in the plugin:

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-sass",
    options: {
      useResolveUrlLoader: {
        options: {
          sourceMap: true, //default is false
        },
      },
    },
  },
]
```

## Breaking changes history

<!-- Please keep the breaking changes list ordered with the newest change at the top -->

### v2.0.0

- `node-sass` is moved to a peer dependency. Installing the package
  alongside `gatsby-plugin-sass` is now required. Use `npm install --save node-sass`

- support Gatsby v2 only
