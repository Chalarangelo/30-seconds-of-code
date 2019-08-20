# PostCSS [![Gitter][chat-img]][chat]

<img align="right" width="95" height="95"
     alt="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo.svg">

[chat-img]: https://img.shields.io/badge/Gitter-Join_the_PostCSS_chat-brightgreen.svg
[chat]:     https://gitter.im/postcss/postcss

PostCSS is a tool for transforming styles with JS plugins.
These plugins can lint your CSS, support variables and mixins,
transpile future CSS syntax, inline images, and more.

PostCSS is used by industry leaders including Wikipedia, Twitter, Alibaba,
and JetBrains. The [Autoprefixer] PostCSS plugin is one of the most popular
CSS processors.

PostCSS takes a CSS file and provides an API to analyze and modify its rules
(by transforming them into an [Abstract Syntax Tree]).
This API can then be used by [plugins] to do a lot of useful things,
e.g. to find errors automatically insert vendor prefixes.

**Support / Discussion:** [Gitter](https://gitter.im/postcss/postcss)<br>
**Twitter account:**      [@postcss](https://twitter.com/postcss)<br>
**VK.com page:**          [postcss](https://vk.com/postcss)<br>
**中文翻译**:              [`README-cn.md`](./README-cn.md)

For PostCSS commercial support (consulting, improving the front-end culture
of your company, PostCSS plugins), contact [Evil Martians]
at <surrender@evilmartians.com>.

[Abstract Syntax Tree]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
[Evil Martians]:        https://evilmartians.com/?utm_source=postcss
[Autoprefixer]:         https://github.com/postcss/autoprefixer
[plugins]:              https://github.com/postcss/postcss#plugins

<a href="https://evilmartians.com/?utm_source=postcss">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

## Plugins

Currently, PostCSS has more than 200 plugins. You can find all of the plugins
in the [plugins list] or in the [searchable catalog]. Below is a list
of our favorite plugins — the best demonstrations of what can be built
on top of PostCSS.

If you have any new ideas, [PostCSS plugin development] is really easy.

[searchable catalog]: http://postcss.parts
[plugins list]:       https://github.com/postcss/postcss/blob/master/docs/plugins.md

### Solve Global CSS Problem

* [`postcss-use`] allows you to explicitly set PostCSS plugins within CSS
  and execute them only for the current file.
* [`postcss-modules`] and [`react-css-modules`] automatically isolate
  selectors within components.
* [`postcss-autoreset`] is an alternative to using a global reset
  that is better for isolatable components.
* [`postcss-initial`] adds `all: initial` support, which resets
  all inherited styles.
* [`cq-prolyfill`] adds container query support, allowing styles that respond
  to the width of the parent.

### Use Future CSS, Today

* [`autoprefixer`] adds vendor prefixes, using data from Can I Use.
* [`postcss-preset-env`] allows you to use future CSS features today.

### Better CSS Readability

* [`precss`] contains plugins for Sass-like features, like variables, nesting,
  and mixins.
* [`postcss-sorting`] sorts the content of rules and at-rules.
* [`postcss-utilities`] includes the most commonly used shortcuts and helpers.
* [`short`] adds and extends numerous shorthand properties.

### Images and Fonts

* [`postcss-assets`] inserts image dimensions and inlines files.
* [`postcss-sprites`] generates image sprites.
* [`font-magician`] generates all the `@font-face` rules needed in CSS.
* [`postcss-inline-svg`] allows you to inline SVG and customize its styles.
* [`postcss-write-svg`] allows you to write simple SVG directly in your CSS.

### Linters

* [`stylelint`] is a modular stylesheet linter.
* [`stylefmt`] is a tool that automatically formats CSS
  according `stylelint` rules.
* [`doiuse`] lints CSS for browser support, using data from Can I Use.
* [`colorguard`] helps you maintain a consistent color palette.

### Other

* [`postcss-rtl`] combines both-directional (left-to-right and right-to-left) styles in one CSS file.
* [`cssnano`] is a modular CSS minifier.
* [`lost`] is a feature-rich `calc()` grid system.
* [`rtlcss`] mirrors styles for right-to-left locales.

[PostCSS plugin development]:   https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md
[`postcss-inline-svg`]:         https://github.com/TrySound/postcss-inline-svg
[`postcss-preset-env`]:         https://github.com/jonathantneal/postcss-preset-env
[`react-css-modules`]:          https://github.com/gajus/react-css-modules
[`postcss-autoreset`]:          https://github.com/maximkoretskiy/postcss-autoreset
[`postcss-write-svg`]:          https://github.com/jonathantneal/postcss-write-svg
[`postcss-utilities`]:          https://github.com/ismamz/postcss-utilities
[`postcss-initial`]:            https://github.com/maximkoretskiy/postcss-initial
[`postcss-sprites`]:            https://github.com/2createStudio/postcss-sprites
[`postcss-modules`]:            https://github.com/outpunk/postcss-modules
[`postcss-sorting`]:            https://github.com/hudochenkov/postcss-sorting
[`postcss-assets`]:             https://github.com/assetsjs/postcss-assets
[`font-magician`]:              https://github.com/jonathantneal/postcss-font-magician
[`autoprefixer`]:               https://github.com/postcss/autoprefixer
[`cq-prolyfill`]:               https://github.com/ausi/cq-prolyfill
[`postcss-rtl`]:                https://github.com/vkalinichev/postcss-rtl
[`postcss-use`]:                https://github.com/postcss/postcss-use
[`css-modules`]:                https://github.com/css-modules/css-modules
[`colorguard`]:                 https://github.com/SlexAxton/css-colorguard
[`stylelint`]:                  https://github.com/stylelint/stylelint
[`stylefmt`]:                   https://github.com/morishitter/stylefmt
[`cssnano`]:                    http://cssnano.co
[`precss`]:                     https://github.com/jonathantneal/precss
[`doiuse`]:                     https://github.com/anandthakker/doiuse
[`rtlcss`]:                     https://github.com/MohammadYounes/rtlcss
[`short`]:                      https://github.com/jonathantneal/postcss-short
[`lost`]:                       https://github.com/peterramsing/lost

## Syntaxes

PostCSS can transform styles in any syntax, not just CSS.
If there is not yet support for your favorite syntax,
you can write a parser and/or stringifier to extend PostCSS.

* [`sugarss`] is a indent-based syntax like Sass or Stylus.
* [`postcss-syntax`] switch syntax automatically by file extensions.
* [`postcss-html`] parsing styles in `<style>` tags of HTML-like files.
* [`postcss-markdown`] parsing styles in code blocks of Markdown files.
* [`postcss-jsx`] parsing CSS in template / object literals of source files.
* [`postcss-styled`] parsing CSS in template literals of source files.
* [`postcss-scss`] allows you to work with SCSS
  *(but does not compile SCSS to CSS)*.
* [`postcss-sass`] allows you to work with Sass
    *(but does not compile Sass to CSS)*.
* [`postcss-less`] allows you to work with Less
  *(but does not compile LESS to CSS)*.
* [`postcss-less-engine`] allows you to work with Less
  *(and DOES compile LESS to CSS using true Less.js evaluation)*.
* [`postcss-js`] allows you to write styles in JS or transform
  React Inline Styles, Radium or JSS.
* [`postcss-safe-parser`] finds and fixes CSS syntax errors.
* [`midas`] converts a CSS string to highlighted HTML.

[`postcss-less-engine`]: https://github.com/Crunch/postcss-less
[`postcss-safe-parser`]: https://github.com/postcss/postcss-safe-parser
[`postcss-syntax`]:      https://github.com/gucong3000/postcss-syntax
[`postcss-html`]:        https://github.com/gucong3000/postcss-html
[`postcss-markdown`]:    https://github.com/gucong3000/postcss-markdown
[`postcss-jsx`]:         https://github.com/gucong3000/postcss-jsx
[`postcss-styled`]:      https://github.com/gucong3000/postcss-styled
[`postcss-scss`]:        https://github.com/postcss/postcss-scss
[`postcss-sass`]:        https://github.com/AleshaOleg/postcss-sass
[`postcss-less`]:        https://github.com/webschik/postcss-less
[`postcss-js`]:          https://github.com/postcss/postcss-js
[`sugarss`]:             https://github.com/postcss/sugarss
[`midas`]:               https://github.com/ben-eb/midas

## Articles

* [Some things you may think about PostCSS… and you might be wrong](http://julian.io/some-things-you-may-think-about-postcss-and-you-might-be-wrong)
* [What PostCSS Really Is; What It Really Does](http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss)
* [PostCSS Guides](http://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889)

More articles and videos you can find on [awesome-postcss](https://github.com/jjaderg/awesome-postcss) list.

## Books

* [Mastering PostCSS for Web Design](https://www.packtpub.com/web-development/mastering-postcss-web-design) by Alex Libby, Packt. (June 2016)

## Usage

You can start using PostCSS in just two steps:

1. Find and add PostCSS extensions for your build tool.
2. [Select plugins] and add them to your PostCSS process.

[Select plugins]: http://postcss.parts

### CSS-in-JS

The best way to use PostCSS with CSS-in-JS is [`astroturf`].
Add its loader to your `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader'],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'astroturf/loader'],
      }
    ]
  }
}
```

Then create `postcss.config.js`:

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

[`astroturf`]: https://github.com/4Catalyzer/astroturf

### Parcel

[Parcel] has perfect built-in PostCSS support. It already uses Autoprefixer
and cssnano. If you want to change plugins, create `postcss.config.js`
in project’s root:

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

Parcel will even automatically install these plugins for you.

[Parcel]: https://parceljs.org

### Webpack

Use [`postcss-loader`] in `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
```

Then create `postcss.config.js`:

```js
module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}
```

[`postcss-loader`]: https://github.com/postcss/postcss-loader

### Gulp

Use [`gulp-postcss`] and [`gulp-sourcemaps`].

```js
gulp.task('css', () => {
  const postcss    = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')

  return gulp.src('src/**/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') )
})
```

[`gulp-sourcemaps`]: https://github.com/floridoo/gulp-sourcemaps
[`gulp-postcss`]:    https://github.com/postcss/gulp-postcss

### npm run / CLI

To use PostCSS from your command-line interface or with npm scripts
there is [`postcss-cli`].

```sh
postcss --use autoprefixer -c options.json -o main.css css/*.css
```

[`postcss-cli`]: https://github.com/postcss/postcss-cli

### Browser

If you want to compile CSS string in browser (for instance, in live edit
tools like CodePen), just use [Browserify] or [webpack]. They will pack
PostCSS and plugins files into a single file.

To apply PostCSS plugins to React Inline Styles, JSS, Radium
and other [CSS-in-JS], you can use [`postcss-js`] and transforms style objects.

```js
var postcss  = require('postcss-js')
var prefixer = postcss.sync([ require('autoprefixer') ])

prefixer({ display: 'flex' }) //=> { display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex'] }
```

[`postcss-js`]: https://github.com/postcss/postcss-js
[Browserify]:   http://browserify.org/
[CSS-in-JS]:    https://github.com/MicheleBertoli/css-in-js
[webpack]:      https://webpack.github.io/

### Runners

* **Grunt**: [`grunt-postcss`](https://github.com/nDmitry/grunt-postcss)
* **HTML**: [`posthtml-postcss`](https://github.com/posthtml/posthtml-postcss)
* **Stylus**: [`poststylus`](https://github.com/seaneking/poststylus)
* **Rollup**: [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss)
* **Brunch**: [`postcss-brunch`](https://github.com/brunch/postcss-brunch)
* **Broccoli**: [`broccoli-postcss`](https://github.com/jeffjewiss/broccoli-postcss)
* **Meteor**: [`postcss`](https://atmospherejs.com/juliancwirko/postcss)
* **ENB**: [`enb-postcss`](https://github.com/awinogradov/enb-postcss)
* **Taskr**: [`taskr-postcss`](https://github.com/lukeed/taskr/tree/master/packages/postcss)
* **Start**: [`start-postcss`](https://github.com/start-runner/postcss)
* **Connect/Express**: [`postcss-middleware`](https://github.com/jedmao/postcss-middleware)

### JS API

For other environments, you can use the JS API:

```js
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const fs = require('fs')

fs.readFile('src/app.css', (err, css) => {
  postcss([precss, autoprefixer])
    .process(css, { from: 'src/app.css', to: 'dest/app.css' })
    .then(result => {
      fs.writeFile('dest/app.css', result.css, () => true)
      if ( result.map ) {
        fs.writeFile('dest/app.css.map', result.map, () => true)
      }
    })
})
```

Read the [PostCSS API documentation] for more details about the JS API.

All PostCSS runners should pass [PostCSS Runner Guidelines].

[PostCSS Runner Guidelines]: https://github.com/postcss/postcss/blob/master/docs/guidelines/runner.md
[PostCSS API documentation]: http://api.postcss.org/postcss.html

### Options

Most PostCSS runners accept two parameters:

* An array of plugins.
* An object of options.

Common options:

* `syntax`: an object providing a syntax parser and a stringifier.
* `parser`: a special syntax parser (for example, [SCSS]).
* `stringifier`: a special syntax output generator (for example, [Midas]).
* `map`: [source map options].
* `from`: the input file name (most runners set it automatically).
* `to`: the output file name (most runners set it automatically).

[source map options]: https://github.com/postcss/postcss/blob/master/docs/source-maps.md
[Midas]:              https://github.com/ben-eb/midas
[SCSS]:               https://github.com/postcss/postcss-scss

### Treat Warnings as Errors

In some situations it might be helpful to fail the build on any warning
from PostCSS or one of its plugins. This guarantees that no warnings
go unnoticed, and helps to avoid bugs. While there is no option to enable
treating warnings as errors, it can easily be done
by adding `postcss-fail-on-warn` plugin in the end of PostCSS plugins:

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-fail-on-warn')
  ]
}
```


## Editors & IDE Integration

### Atom

* [`language-postcss`] adds PostCSS and [SugarSS] highlight.
* [`source-preview-postcss`] previews your output CSS in a separate, live pane.

[SugarSS]: https://github.com/postcss/sugarss

### Sublime Text

* [`Syntax-highlighting-for-PostCSS`] adds PostCSS highlight.

[`Syntax-highlighting-for-PostCSS`]: https://github.com/hudochenkov/Syntax-highlighting-for-PostCSS
[`source-preview-postcss`]:          https://atom.io/packages/source-preview-postcss
[`language-postcss`]:                https://atom.io/packages/language-postcss

### Vim

* [`postcss.vim`] adds PostCSS highlight.

[`postcss.vim`]: https://github.com/stephenway/postcss.vim

### WebStorm

WebStorm 2016.3 [has] built-in PostCSS support.

[has]: https://blog.jetbrains.com/webstorm/2016/08/webstorm-2016-3-early-access-preview/


## Security Contact

To report a security vulnerability, please use the [Tidelift security contact].
Tidelift will coordinate the fix and disclosure.

[Tidelift security contact]: https://tidelift.com/security
