# Autoprefixer [![Cult Of Martians][cult-img]][cult]

<img align="right" width="94" height="71"
     src="http://postcss.github.io/autoprefixer/logo.svg"
     title="Autoprefixer logo by Anton Lovchikov">

[PostCSS] plugin to parse CSS and add vendor prefixes to CSS rules using values
from [Can I Use]. It is [recommended] by Google and used in Twitter and Alibaba.

Write your CSS rules without vendor prefixes (in fact, forget about them
entirely):

```css
::placeholder {
  color: gray;
}

.image {
  background-image: url(image@1x.png);
}
@media (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

Autoprefixer will use the data based on current browser popularity and property
support to apply prefixes for you. You can try the [interactive demo]
of Autoprefixer.

```css
::-webkit-input-placeholder {
  color: gray;
}
::-moz-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}

.image {
  background-image: url(image@1x.png);
}
@media (-webkit-min-device-pixel-ratio: 2),
       (-o-min-device-pixel-ratio: 2/1),
       (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

Twitter account for news and releases: [@autoprefixer].

<a href="https://evilmartians.com/?utm_source=autoprefixer">
<img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg" alt="Sponsored by Evil Martians" width="236" height="54">
</a>

[interactive demo]: https://autoprefixer.github.io/
[@autoprefixer]:    https://twitter.com/autoprefixer
[recommended]:      https://developers.google.com/web/tools/setup/setup-buildtools#dont_trip_up_with_vendor_prefixes
[Can I Use]:        https://caniuse.com/
[cult-img]:         http://cultofmartians.com/assets/badges/badge.svg
[PostCSS]:          https://github.com/postcss/postcss
[cult]:             http://cultofmartians.com/tasks/autoprefixer-grid.html


## Contents

- [Browsers](#browsers)
- [FAQ](#faq)
    - [Does Autoprefixer polyfill Grid Layout for IE?](#does-autoprefixer-polyfill-grid-layout-for-ie)
    - [Does it add polyfills?](#does-it-add-polyfills)
    - [Why doesn’t Autoprefixer add prefixes to `border-radius`?](#why-doesnt-autoprefixer-add-prefixes-to-border-radius)
    - [Why does Autoprefixer use unprefixed properties in `@-webkit-keyframes`?](#why-does-autoprefixer-use-unprefixed-properties-in--webkit-keyframes)
    - [How to work with legacy `-webkit-` only code?](#how-to-work-with-legacy--webkit--only-code)
    - [Does Autoprefixer add `-epub-` prefix?](#does-autoprefixer-add--epub--prefix)
    - [Why doesn’t Autoprefixer transform generic font-family `system-ui`?](#why-doesnt-autoprefixer-transform-generic-font-family-system-ui)
- [Usage](#usage)
    - [Gulp](#gulp)
    - [Webpack](#webpack)
    - [CSS-in-JS](#css-in-js)
    - [CLI](#cli)
    - [Other Build Tools](#other-build-tools)
    - [JavaScript](#javascript)
    - [Text Editors and IDE](#text-editors-and-ide)
- [Warnings](#warnings)
- [Disabling](#disabling)
- [Options](#options)
- [Grid Autoplacement support in IE](#grid-autoplacement-support-in-ie)
- [Debug](#debug)

## Browsers

Autoprefixer uses [Browserslist], so you can specify the browsers
you want to target in your project with queries like `> 5%`
(see [Best Practices]).

The best way to provide browsers is a `.browserslistrc` file in your project
root, or by adding a `browserslist` key to your `package.json`.

We recommend the use of these options over passing options to Autoprefixer so
that the config can be shared with other tools such as [babel-preset-env] and
[Stylelint].

See [Browserslist docs] for queries, browser names, config format, and defaults.

[Browserslist docs]: https://github.com/ai/browserslist#queries
[babel-preset-env]:  https://github.com/babel/babel/tree/master/packages/babel-preset-env
[Best Practices]:    https://github.com/browserslist/browserslist#best-practices
[Browserslist]:      https://github.com/ai/browserslist
[Stylelint]:         https://stylelint.io/


## FAQ

### Does Autoprefixer polyfill Grid Layout for IE?

Autoprefixer can be used to translate modern CSS Grid syntax into IE 10
and IE 11 syntax, but this polyfill will not work in 100% of cases.
This is why it is disabled by default.

First, you need to enable Grid prefixes by using either the `grid: "autoplace"`
option or the `/* autoprefixer grid: autoplace */` control comment.

Second, you need to test every fix with Grid in IE. It is not an enable and
forget feature, but it is still very useful.
Financial Times and Yandex use it in production.

Third, there is only very limited auto placement support. Read the
[Grid Autoplacement support in IE](#grid-autoplacement-support-in-ie) section
for more details.

Fourth, if you are not using the autoplacement feature, the best way
to use Autoprefixer is by using  `grid-template` or `grid-template-areas`.

```css
.page {
  display: grid;
  grid-gap: 33px;
  grid-template:
    "head head  head" 1fr
    "nav  main  main" minmax(100px, 1fr)
    "nav  foot  foot" 2fr /
    1fr   100px 1fr;
}
.page__head {
  grid-area: head;
}
.page__nav {
  grid-area: nav;
}
.page__main {
  grid-area: main;
}
.page__footer {
  grid-area: foot;
}
```

See also:

* [The guide about Grids in IE and Autoprefixer].
* [`postcss-gap-properties`] to use new `gap` property
  instead of old `grid-gap`.
* [`postcss-grid-kiss`] has alternate “everything in one property” syntax,
  which makes using Autoprefixer’s Grid translations safer.

[The guide about Grids in IE and Autoprefixer]: https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/
[`postcss-gap-properties`]:                     https://github.com/jonathantneal/postcss-gap-properties
[`postcss-grid-kiss`]:                          https://github.com/sylvainpolletvillard/postcss-grid-kiss


### Does it add polyfills?

No. Autoprefixer only adds prefixes.

Most new CSS features will require client side JavaScript to handle a new
behavior correctly.

Depending on what you consider to be a “polyfill”, you can take a look at some
other tools and libraries. If you are just looking for syntax sugar,
you might take a look at:

- [postcss-preset-env] is a plugins preset with polyfills and Autoprefixer
  to write future CSS today.
- [Oldie], a PostCSS plugin that handles some IE hacks (opacity, rgba, etc).
- [postcss-flexbugs-fixes], a PostCSS plugin to fix flexbox issues.

[postcss-flexbugs-fixes]: https://github.com/luisrudge/postcss-flexbugs-fixes
[postcss-preset-env]:     https://github.com/jonathantneal/postcss-preset-env
[Oldie]:                  https://github.com/jonathantneal/oldie


### Why doesn’t Autoprefixer add prefixes to `border-radius`?

Developers are often surprised by how few prefixes are required today.
If Autoprefixer doesn’t add prefixes to your CSS, check if they’re still
required on [Can I Use].

[Can I Use]: https://caniuse.com/


### Why does Autoprefixer use unprefixed properties in `@-webkit-keyframes`?

Browser teams can remove some prefixes before others, so we try to use all
combinations of prefixed/unprefixed values.


### How to work with legacy `-webkit-` only code?

Autoprefixer needs unprefixed property to add prefixes. So if you only
wrote `-webkit-gradient` without W3C’s `gradient`,
Autoprefixer will not add other prefixes.

But [PostCSS] has plugins to convert CSS to unprefixed state.
Use [postcss-unprefix] before Autoprefixer.

[postcss-unprefix]: https://github.com/gucong3000/postcss-unprefix


### Does Autoprefixer add `-epub-` prefix?

No, Autoprefixer works only with browsers prefixes from Can I Use.
But you can use [postcss-epub] for prefixing ePub3 properties.

[postcss-epub]: https://github.com/Rycochet/postcss-epub


### Why doesn’t Autoprefixer transform generic font-family `system-ui`?

`system-ui` is technically not a prefix and the transformation is not
future-proof. You can use [postcss-font-family-system-ui] to transform
`system-ui` to a practical font-family list.

[postcss-font-family-system-ui]: https://github.com/JLHwung/postcss-font-family-system-ui


## Usage

### Gulp

In Gulp you can use [gulp-postcss] with `autoprefixer` npm package.

```js
gulp.task('autoprefixer', () => {
  const autoprefixer = require('autoprefixer')
  const sourcemaps = require('gulp-sourcemaps')
  const postcss = require('gulp-postcss')

  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'))
})
```

With `gulp-postcss` you also can combine Autoprefixer
with [other PostCSS plugins].

[gulp-postcss]:          https://github.com/postcss/gulp-postcss
[other PostCSS plugins]: https://github.com/postcss/postcss#plugins


### Webpack

In [webpack] you can use [postcss-loader] with `autoprefixer`
and [other PostCSS plugins].

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
}
```

And create a `postcss.config.js` with:

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

[other PostCSS plugins]: https://github.com/postcss/postcss#plugins
[postcss-loader]:        https://github.com/postcss/postcss-loader
[webpack]:               https://webpack.js.org/


### CSS-in-JS

The best way to use PostCSS with CSS-in-JS is [`astroturf`].
Add it’s loader to your `webpack.config.js`:

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
    require('autoprefixer')
  ]
}
```

[`astroturf`]: https://github.com/4Catalyzer/astroturf


### CLI

You can use the [postcss-cli] to run Autoprefixer from CLI:

```sh
npm install postcss-cli autoprefixer
npx postcss *.css --use autoprefixer -d build/
```

See `postcss -h` for help.

[postcss-cli]: https://github.com/postcss/postcss-cli


### Other Build Tools

* **Grunt:** [grunt-postcss]
* **Ruby on Rails**: [autoprefixer-rails]
* **Neutrino**: [neutrino-middleware-postcss]
* **Jekyll**: add `autoprefixer-rails` and `jekyll-assets` to `Gemfile`
* **Brunch**: [postcss-brunch]
* **Broccoli**: [broccoli-postcss]
* **Middleman**: [middleman-autoprefixer]
* **Mincer**: add `autoprefixer` npm package and enable it:
  `environment.enable('autoprefixer')`

[neutrino-middleware-postcss]: https://www.npmjs.com/package/neutrino-middleware-postcss
[middleman-autoprefixer]:      https://github.com/middleman/middleman-autoprefixer
[autoprefixer-rails]:          https://github.com/ai/autoprefixer-rails
[broccoli-postcss]:            https://github.com/jeffjewiss/broccoli-postcss
[postcss-brunch]:              https://github.com/iamvdo/postcss-brunch
[grunt-postcss]:               https://github.com/nDmitry/grunt-postcss


#### Preprocessors

* **Less**: [less-plugin-autoprefix]
* **Stylus**: [autoprefixer-stylus]
* **Compass**: [autoprefixer-rails#compass]

[less-plugin-autoprefix]: https://github.com/less/less-plugin-autoprefix
[autoprefixer-stylus]:    https://github.com/jenius/autoprefixer-stylus
[autoprefixer-rails#compass]:     https://github.com/ai/autoprefixer-rails#compass


#### GUI Tools

* [CodeKit](https://codekitapp.com/help/autoprefixer/)
* [Prepros](https://prepros.io)


### JavaScript

You can use Autoprefixer with [PostCSS] in your Node.js application
or if you want to develop an Autoprefixer plugin for a new environment.

```js
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

postcss([ autoprefixer ]).process(css).then(result => {
  result.warnings().forEach(warn => {
    console.warn(warn.toString())
  })
  console.log(result.css)
})
```

There is also a [standalone build] for the browser or for a non-Node.js runtime.

You can use [html-autoprefixer] to process HTML with inlined CSS.

[html-autoprefixer]: https://github.com/RebelMail/html-autoprefixer
[standalone build]:  https://raw.github.com/ai/autoprefixer-rails/master/vendor/autoprefixer.js
[PostCSS]:           https://github.com/postcss/postcss


### Text Editors and IDE

Autoprefixer should be used in assets build tools. Text editor plugins are not
a good solution, because prefixes decrease code readability and you will need
to change values in all prefixed properties.

I recommend you to learn how to use build tools like [Parcel].
They work much better and will open you a whole new world of useful plugins
and automation.

If you can’t move to a build tool, you can use text editor plugins:

* [Sublime Text](https://github.com/sindresorhus/sublime-autoprefixer)
* [Brackets](https://github.com/mikaeljorhult/brackets-autoprefixer)
* [Atom Editor](https://github.com/sindresorhus/atom-autoprefixer)
* [Visual Studio](https://github.com/madskristensen/WebCompiler)
  ([how to](https://stackoverflow.com/a/54908636/2440))

[Parcel]: https://parceljs.org/


## Warnings

Autoprefixer uses the [PostCSS warning API] to warn about really important
problems in your CSS:

* Old direction syntax in gradients.
* Old unprefixed `display: box` instead of `display: flex`
  by latest specification version.

You can get warnings from `result.warnings()`:

```js
result.warnings().forEach(warn => {
  console.warn(warn.toString())
})
```

Every Autoprefixer runner should display these warnings.

[PostCSS warning API]: https://github.com/postcss/postcss/blob/master/docs/api.md#warning-class


## Disabling

### Prefixes

Autoprefixer was designed to have no interface – it just works.
If you need some browser specific hack just write a prefixed property
after the unprefixed one.

```css
a {
  transform: scale(0.5);
  -moz-transform: scale(0.6);
}
```

If some prefixes were generated incorrectly, please create an [issue on GitHub].

[issue on GitHub]: https://github.com/postcss/autoprefixer/issues


### Features

You can use these plugin options to control some of Autoprefixer’s features.

* `grid: "autoplace"` will enable `-ms-` prefixes for Grid Layout including some
  [limited autoplacement support](#grid-autoplacement-support-in-ie).
* `supports: false` will disable `@supports` parameters prefixing.
* `flexbox: false` will disable flexbox properties prefixing.
  Or `flexbox: "no-2009"` will add prefixes only for final and IE
  versions of specification.
* `remove: false` will disable cleaning outdated prefixes.

You should set them inside the plugin like so:

```js
autoprefixer({ grid: 'autoplace' })
```


### Control Comments

If you do not need Autoprefixer in some part of your CSS,
you can use control comments to disable Autoprefixer.

```css
.a {
  transition: 1s; /* will be prefixed */
}

.b {
  /* autoprefixer: off */
  transition: 1s; /* will not be prefixed */
}

.c {
  /* autoprefixer: ignore next */
  transition: 1s; /* will not be prefixed */
  mask: url(image.png); /* will be prefixed */
}
```

There are three types of control comments:

* `/* autoprefixer: (on|off) */`: enable/disable all Autoprefixer translations for the
  whole block both *before* and *after* the comment.
* `/* autoprefixer: ignore next */`: disable Autoprefixer only for the next property
  or next rule selector or at-rule parameters (but not rule/at‑rule body).
* `/* autoprefixer grid: (autoplace|no-autoplace|off) */`: control how Autoprefixer handles
  grid translations for the whole block:
  * `autoplace`: enable grid translations with autoplacement support.
  * `no-autoplace`: enable grid translations with autoplacement
    support *disabled* (alias for deprecated value `on`).
  * `off`: disable all grid translations.

You can also use comments recursively:

```css
/* autoprefixer: off */
@supports (transition: all) {
  /* autoprefixer: on */
  a {
    /* autoprefixer: off */
  }
}
```

Note that comments that disable the whole block should not be featured in the same
block twice:

```css
/* How not to use block level control comments */

.do-not-do-this {
  /* autoprefixer: off */
  transition: 1s;
  /* autoprefixer: on */
  transform: rotate(20deg);
}
```


## Options

Function `autoprefixer(options)` returns a new PostCSS plugin.
See [PostCSS API] for plugin usage documentation.

```js
autoprefixer({ cascade: false })
```

Available options are:

* `env` (string): environment for Browserslist.
* `cascade` (boolean): should Autoprefixer use Visual Cascade,
  if CSS is uncompressed. Default: `true`
* `add` (boolean): should Autoprefixer add prefixes. Default is `true`.
* `remove` (boolean): should Autoprefixer [remove outdated] prefixes.
  Default is `true`.
* `supports` (boolean): should Autoprefixer add prefixes for `@supports`
  parameters. Default is `true`.
* `flexbox` (boolean|string): should Autoprefixer add prefixes for flexbox
  properties. With `"no-2009"` value Autoprefixer will add prefixes only
  for final and IE 10 versions of specification. Default is `true`.
* `grid` (false|"autoplace"|"no-autoplace"): should Autoprefixer
  add IE 10-11 prefixes for Grid Layout properties?
    * `false` (default): prevent Autoprefixer from outputting
       CSS Grid translations.
    * `"autoplace"`: enable Autoprefixer grid translations
      and *include* autoplacement support. You can also use
      `/* autoprefixer grid: autoplace */` in your CSS.
    * `"no-autoplace"`: enable Autoprefixer grid translations
      but *exclude* autoplacement support. You can also use
      `/* autoprefixer grid: no-autoplace */` in your CSS.
      (alias for the deprecated `true` value)
* `stats` (object): custom [usage statistics] for `> 10% in my stats`
  browsers query.
* `overrideBrowserslist` (array): list of queries for target browsers.
  Try to not use it. The best practice is to use `.browserslistrc` config
  or `browserslist` key in `package.json` to share target browsers
  with Babel, ESLint and Stylelint. See [Browserslist docs]
  for available queries and default value.
* `ignoreUnknownVersions` (boolean): do not raise error on unknown browser
  version in Browserslist config. Default is `false`.

Plugin object has `info()` method for debugging purpose.

You can use PostCSS processor to process several CSS files
to increase performance.

[usage statistics]: https://github.com/ai/browserslist#custom-usage-data
[PostCSS API]:      http://api.postcss.org

## Grid Autoplacement support in IE

If the `grid` option is set to `"autoplace"`, limited autoplacement support is added to Autoprefixers grid translations. You can also use the `/* autoprefixer grid: autoplace */` control comment to enable autoplacement

Autoprefixer will only autoplace grid cells if both `grid-template-rows` and `grid-template-columns` has been set. If `grid-template` or `grid-template-areas` has been set, Autoprefixer will use area based cell placement instead.

Autoprefixer supports autoplacement by using `nth-child` CSS selectors. It creates [number of columns] x [number of rows] `nth-child` selectors. For this reason Autoplacement is only supported within the explicit grid.

```css
/* Input CSS */

/* autoprefixer grid: autoplace */

.autoplacement-example {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
}
```

```css
/* Output CSS */

/* autoprefixer grid: autoplace */

.autoplacement-example {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 20px 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto 20px auto;
  grid-template-rows: auto auto;
  grid-gap: 20px;
}

.autoplacement-example > *:nth-child(1) {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.autoplacement-example > *:nth-child(2) {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.autoplacement-example > *:nth-child(3) {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
}

.autoplacement-example > *:nth-child(4) {
  -ms-grid-row: 3;
  -ms-grid-column: 3;
}
```

### Beware of enabling autoplacement in old projects

Be careful about enabling autoplacement in any already established projects that have
previously not used Autoprefixer's grid autoplacement feature before.

If this was your html:

```html
<div class="grid">
  <div class="grid-cell"></div>
</div>
```

The following CSS will not work as expected with the autoplacement feature enabled:

```css
/* Unsafe CSS when Autoplacement is enabled */

.grid-cell {
  grid-column: 2;
  grid-row: 2;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
```

Swapping the rules around will not fix the issue either:

```css
/* Also unsafe to use this CSS */

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.grid-cell {
  grid-column: 2;
  grid-row: 2;
}
```

One way to deal with this issue is to disable autoplacement in the
grid-declaration rule:

```css
/* Disable autoplacement to fix the issue */

.grid {
  /* autoprefixer grid: no-autoplace */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.grid-cell {
  grid-column: 2;
  grid-row: 2;
}
```

The absolute best way to integrate autoplacement into already existing projects though is
to leave autoplacement turned off by default and then use a control comment to enable it
when needed. This method is far less likely to cause something on the site to break.

```css
/* Disable autoplacement by default in old projects */
/* autoprefixer grid: no-autoplace */

/* Old code will function the same way it always has */
.old-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.old-grid-cell {
  grid-column: 2;
  grid-row: 2;
}

/* Enable autoplacement when you want to use it in new code */
.new-autoplace-friendly-grid {
  /* autoprefixer grid: autoplace */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
}
```

Note that the `grid: "no-autoplace"` setting and the
`/* autoprefixer grid: no-autoplace */` control comment share identical functionality
to the `grid: true` setting and the `/* autoprefixer grid: on */` control comment.
There is no need to refactor old code to use `no-autoplace` in place of the old
`true` and `on` statements.

### Autoplacement limitations

#### Both columns and rows must be defined

Autoplacement only works inside the explicit grid. The columns and rows need to be defined
so that Autoprefixer knows how many `nth-child` selectors to generate.

```css
.not-allowed {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.is-allowed {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(10, auto);
}
```

#### Repeat auto-fit and auto-fill are not supported

The `repeat(auto-fit, ...)` and `repeat(auto-fill, ...)` grid functionality relies on
knowledge from the browser about screen dimensions and the number of available grid
items for it to work properly. Autoprefixer does not have access to this information
so unfortunately this little snippet will _never_ be IE friendly.

```css
.grid {
  /* This will never be IE friendly */
  grid-template-columns: repeat(auto-fit, min-max(200px, 1fr))
}
```

#### No manual cell placement or column/row spans allowed inside an autoplacement grid

Elements must not be manually placed or given column/row spans inside
an autoplacement grid. Only the most basic of autoplacement grids are supported.
Grid cells can still be placed manually outside the the explicit grid though.
Support for manually placing individual grid cells inside an explicit
autoplacement grid is planned for a future release.

```css
.autoplacement-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
}

/* Grid cells placed inside the explicit grid
   will break the layout in IE */
.not-permitted-grid-cell {
  grid-column: 1;
  grid-row: 1;
}

/* Grid cells placed outside the
   explicit grid will work in IE */
.permitted-grid-cell {
  grid-column: 1 / span 2;
  grid-row: 4;
}
```

If manual cell placement is required, we recommend using `grid-template` or
`grid-template-areas` instead:

```css
.page {
  display: grid;
  grid-gap: 30px;
  grid-template:
      "head head"
      "nav  main" minmax(100px, 1fr)
      "foot foot" /
      200px 1fr;
}
.page__head {
  grid-area: head;
}
.page__nav {
  grid-area: nav;
}
.page__main {
  grid-area: main;
}
.page__footer {
  grid-area: foot;
}
```

#### Do not create `::before` and `::after` pseudo elements

Let's say you have this HTML:

```html
<div class="grid">
  <div class="grid-cell"></div>
</div>
```

And you write this CSS:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}

.grid::before {
  content: 'before';
}

.grid::after {
  content: 'after';
}
```

This will be the output:

```css
.grid {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.grid > *:nth-child(1) {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}


.grid > *:nth-child(2) {
  -ms-grid-row: 1;
  -ms-grid-column: 2;
}

.grid::before {
  content: 'before';
}

.grid::after {
  content: 'after';
}
```

IE will place `.grid-cell`, `::before` and `::after` in row 1 column 1.
Modern browsers on the other hand will place `::before` in row 1 column 1,
`.grid-cell` in row 1 column 2, and `::after` in row 2 column 1.

See this [Code Pen](https://codepen.io/daniel-tonon/pen/gBymVw) to see a visualization
of the issue. View the Code Pen in both a modern browser and IE to see the difference.

Note that you can still create `::before` and `::after` elements as long as you manually
place them outside the explicit grid.

#### When changing the `grid gap` value, columns and rows must be re-declared

If you wish to change the size of a `grid-gap`, you will need to redeclare the grid columns and rows.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 50px;
}

/* This will *NOT* work in IE */
@media (max-width: 600px) {
  .grid {
    grid-gap: 20px;
  }
}

/* This will *NOT* work in IE */
.grid.small-gap {
  grid-gap: 20px;
}
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 50px;
}

/* This *WILL* work in IE */
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
  }
}

/* This *WILL* work in IE */
.grid.small-gap {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
}
```

## Debug

Run `npx autoprefixer --info` in your project directory to check
which browsers are selected and which properties will be prefixed:

```
$ npx autoprefixer --info
Browsers:
  Edge: 16

These browsers account for 0.26% of all users globally

At-Rules:
  @viewport: ms

Selectors:
  ::placeholder: ms

Properties:
  appearance: webkit
  flow-from: ms
  flow-into: ms
  hyphens: ms
  overscroll-behavior: ms
  region-fragment: ms
  scroll-snap-coordinate: ms
  scroll-snap-destination: ms
  scroll-snap-points-x: ms
  scroll-snap-points-y: ms
  scroll-snap-type: ms
  text-size-adjust: ms
  text-spacing: ms
  user-select: ms
```

JS API is also available:

```js
console.log(autoprefixer().info())
```


## Security Contact

To report a security vulnerability, please use the [Tidelift security contact].
Tidelift will coordinate the fix and disclosure.

[Tidelift security contact]: https://tidelift.com/security
