# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## 9.6.1
* Fix `-webkit-line-clamp` truncating multi-line text support.

## 9.6 “Nunc id vides, nunc ne vides”
* Show warning about Browserslist config on `browser` option.
* Add warning-less `overrideBrowserslist` option.
* Add `text-orientation` support.
* Add `min-resolution: 2x` alias support.
* Add `.github/CONTRIBUTING.md` (by Juan Martin Marco).

## 9.5.1
* Fix `backdrop-filter` for Edge (by Oleh Aloshkin).
* Fix `min-resolution` media query support in Firefox < 16.

## 9.5 “Draco dormiens nunquam titillandus”
* Add `mask-composite` support (by Semen Levenson).

## 9.4.10
* Add warning for named Grid rows.

## 9.4.9
* Fix `grid-template` and `@media` case (by Bogdan Dolin).

## 9.4.8
* Fix `calc()` support in Grid gap.

## 9.4.7
* Fix infinite loop on mismatched parens.

## 9.4.6
* Fix warning text (by Albert Juhé Lluveras).

## 9.4.5
* Fix `text-decoration-skip-ink` support.

## 9.4.4
* Use `direction` value for `-ms-writing-mode` (by Denys Kniazevych).
* Fix warning text (by @zzzzBov).

## 9.4.3
* Add warning to force `flex-start` instead of `start` (by Antoine du Hamel).
* Fix docs (by Christian Oliff).

## 9.4.2
* Fix Grid autoplacement warning.

## 9.4.1
* Fix unnecessary Flexbox prefixes in Grid elements.

## 9.4 “Advance Australia”
* Add Grid autoplacement for `-ms-` (by Bogdan Dolin).
* Improve docs and warnings (by Daniel Tonon).
* Remove some unnecessary warnings for Grid (by Andrey Alexandrov).

## 9.3.1
* Fix Grid prefixes with `repeat()` value (by Bogdan Dolin).

## 9.3 “Labor omnia vincit”
* Add `place-self` support (by Bogdan Dolin).
* Fix Grid row/column span inheritance bug (by Bogdan Dolin).

## 9.2.1
* Fix broken AST.

## 9.2 “Onyi est glavnaya krepost”
* Add `/* autoprefixer grid: on */` control comment (by Andrey Alexandrov).
* Add duplicate `grid-area` support (by Bogdan Dolin).
* Fix `grid-gap` support for rules with different specifity (by Bogdan Dolin).
* Disable Grid in `@supports` at-rule with non-supported Grid features.
* Improve Grid warnings (by Daniel Tonon).
* Improve docs (by Joshua Hall, Mat Gadd, Roy Revelt, and Ivan).

## 9.1.5
* Remove `@babel/register` from dependencies.

## 9.1.4
* Use Babel 7.

## 9.1.3
* Sort properties in `autoprefixer --info` alphabetically.
* Fix old Firefox gradient prefix.

## 9.1.2
* Fix `autoprefixer --info` in new Node.js.

## 9.1.1
* Retain `grid-gap` through `@media` (by Bogdan Dolin).
* Fix `grid-template` and  `@media` (by Bogdan Dolin).
* Fix Grid areas searching error (by Bogdan Dolin).
* Fix `span X` Grid prefix (by Bogdan Dolin).
* Fix docs (by Eduard Kyvenko).

## 9.1 “Equality before the law”
* Add `background-clip: text` support.
* Fix adding Grid span for IE (by Bogdan Dolin).

## 9.0.2
* Show warning on Grid area names conflict (by Bogdan Dolin).
* Fix documentation (by Sven Wagner).

## 9.0.1
* Fix nested at-rules in Grid prefixes (by Ivan Malov).

## 9.0 “A Mari Usque Ad Mare”
* Remove Node.js 9 and Node.js 4 support.
* Remove IE and “dead” browsers from Babel.
* Use PostCSS 7.0.
* Use Browserslist 4.0.

## 8.6.5
* Do not show Grid warnings if IE was not selected.

## 8.6.4
* Fix `stretch` prefix in Chrome >= 46.

## 8.6.3
* Add warnings for unsupported Grid features.
* Add warnings about wrong Grid properties.
* Add note about `grid` option for grid properties in `autoprefixer --info`.

## 8.6.2
* Fix error during adding Grid prefixes in `@media` (by Evgeny Petukhov).

## 8.6.1
* Fix `grid-template` with media queries (by Evgeny Petukhov).

## 8.6 “Follow Reason”
* Add `gap` support (by Evgeny Petukhov).
* Add two values support for `grid-gap` and `gap` (by Evgeny Petukhov).
* Add `ignoreUnknownVersions` option for Browserslist.

## 8.5.2
* Fix `grid-template` support wit auto row sizes (by Yury Timofeev).

## 8.5.1
* Remove unnecessary warning on `-webkit-fill-available`.

## 8.5 “Muito Nobre e Sempre Leal”
* Add `grid-gap` support (by Evgeny Petukhov).
* Fix radial gradients direction fix.
* Fix docs (by Phani Kandula and Huáng Jùnliàng).

## 8.4.1
* Fix working in old PostCSS versions (by Diablohu).

## 8.4 “Non in aves, sed in angues”
* Add `/* autoprefixer: ignore next */` control comment (by Pavel Vostrikov).

## 8.3 “Benigno Numine”
* Add `@media` support to `grid-template` (by Evgeny Petukhov).
* Fix `radial-gradient` direction warning (by Gustavo Real).

## 8.2 “Ad Astra per Aspera”
* Add `color-adjust` (by Sergey Lysenko, Stanislav Botev, and Yuriy Alekseyev).

## 8.1 “Rex, Familia et Ultio”
* Add `overscroll-behavior` support.
* Add `grid-template` shortcut support (by Evgeny Petukhov).
* Add better `grid-column-end` and `grid-row-end` support (by Evgeny Petukhov).
* Fix Grid properties support in `@supports`.

## 8.0 “Excelsior”
* Use Browserslist 3.0.
* Rename `autoprefixer-info` CLI tool to `autoprefixer --info`.
* Remove `break-*` to `page-break-*` conversion for Firefox.

## 7.2.6
* Fix `-ms-` prefix for grid cells with same `grid-area` (by Evgeny Petukhov).

## 7.2.5
* Fix multiple prefixes in declaration value.

## 7.2.4
* Fix IE 10 support.

## 7.2.3
* Fix `grid-template-areas` in `@media` (by Evgeny Petukhov).

## 7.2.2
* Fix `_autoprefixerDisabled is undefined` issue.

## 7.2.1
* Fix IE and other old JS runtimes support.

## 7.2 “Ordem e Progresso”
* Add `grid-template-areas` support (by Evgeny Petukhov).
* Add `grid-template` support (by Evgeny Petukhov).
* Add `grid-area` support (by Alexey Komarov).
* Add `autoprefixer-info` CLI tool.
* Add wrong `radial-gradient` properties warning.
* Use current working dir on missed `from` in `info()` (by Phil Dokas).
* Fix `grid-row` and `grid-column` support (by Alexey Komarov).
* Do not prefix `reverse` animation direction.
* Improve test coverage (by Dmitry Semigradsky).

## 7.1.6
* Add warning for using `browserslist` option instead of `browsers`.
* Add warning for multiple control comments in the same scope.
* Fix `Invalid array length` error during indent changes.

## 7.1.5
* Fix `::placeholder` prefix for Edge.
* Fix `inherit`/`initial`/`unset` values for `flex-direction`.
* Fix RegExp usage in gradients (by Yet Another Minion).

## 7.1.4
* Fix `radial-gradient` direction conversion.
* Fix `image-set` in `cursor`.

## 7.1.3
* Add warning for old `radial-gradient` direction syntax.

## 7.1.2
* Fix `text-decoration` shortcut support.

## 7.1.1
* Remove non-`-webkit-` intrinsic prefixes in Grid Layout (by 一丝).

## 7.1 “Universitas litterarum”
* Add `unicode-bidi` support.
* Add `-webkit-appearance` support for Edge.
* Add `from` option to `info()`.
* Fix intrinsic widths prefixes in Grid Layout.

## 7.0.1
* Fix Autoprefixer for old JS runtimes.

## 7.0 “Coelestem adspicit lucem”
* Remove node.js 0.12 support.
* Use PostCSS 6.0.
* Use Browserslist 2.
* Use `caniuse-lite` instead of `caniuse-db` (by Ben Briggs).
* Use `^` for Browserslist dependencies, instead of `~`.
* Rewrite project from CoffeeScript to Babel (by Dmitry Semigradsky).
* Disable Grid Layout prefixes for IE by default.
* Fix `-ms-grid-column-align`.
* Move tests to Jest.

## 6.7.7
* Fix `order` for non-digit values.

## 6.7.6
* Fix `font-kerning` (by Chi Vinh Le).

## 6.7.5
* Fix `text-decoration-skip` in iOS (by Chi Vinh Le).
* Fix `clip-path` (by Chi Vinh Le).

## 6.7.4
* Improve `browsers` option perfomance.
* Update CoffeeScript compiler.

## 6.7.3
* Fix compatibility with “Intrinsic & Extrinsic Sizing” spec update.

## 6.7.2
* Do not prefix grid/flexbox in `@supports` on `grid: false`/`flexbox: false`.

## 6.7.1
* Update Browserslist with `last n version` fix.

## 6.7 “Krungthep doot thep saang”
* Add Electron support in browsers list (by Kilian Valkhof).
* Add `flex-flow` partial support for Flexbox 2009 specification.
* Fix browsers `0` version issue in some Can I Use data.

## 6.6.1
* Add metadata to use Autoprefixer in JSS tests (by Chi Vinh Le).

## 6.6 “Kaiyuan”
* Add `browserslist` key in `package.json` support.
* Add support for separated environments in browserslist config.
* Add `browserslist-stats.json` file support to load custom usage statistics.

## 6.5.4
* Fix unitless 0 basis in IE10/IE11 shorthand flex (by Google).

## 6.5.3
* Add error for popular mistake with `browser` option instead of `browsers`.

## 6.5.2
* Clean prefixes data (by Reinaldo Schiehll).

## 6.5.1
* Fix selectors with `:--` prefix support.

## 6.5 “Einigkeit und Recht und Freiheit”
* Add `defaults` keyword to browsers requirements.
* Fix CSS Grid Layout support.
* Fix `align-self` cleaning.

## 6.4.1
* Fix node cloning after some PostCSS plugins.

## 6.4 “Hic et ubique terrarum”
* Add `:any-link` selector support.
* Add `text-decoration-skip` support.
* Add `transition: duration property` support.
* Fix `-webkit-` prefix for `backface-visibility`.
* Fix `rad` unit support in gradients (by 刘祺).
* Fix `transition` support in Opera 12.
* Removed Safari TP Grid prefixes support.

## 6.3.7
* Fix rare `Cannot read property 'constructor' of null` issue.

## 6.3.6
* Add Safari TP prefix support for Grid Layout.

## 6.3.5
* Fix duplicate prefixes for `-ms-interpolation-mode`.

## 6.3.4
* Show users coverage for selected browsers in `info()`.

## 6.3.3
* Fix transition warning.

## 6.3.2
* Fix jspm support (by Sean Anderson).

## 6.3.1
* Fix compatibility with Flexibility polyfill.

## 6.3 “Pro rege et lege”
* Add Grid Layout support.
* Add `text-spacing` support.
* Add `> 10% in my stats` browsers query with custom usage statistics.
* Add options to disable `@supports`, Flexbox or Grid support.
* Fix compatibility with other PostCSS plugins.

## 6.2.3
* Fix error on broken transition with double comma.

## 6.2.2
* Fix issues in broken transitions.

## 6.2.1
* Fix AST error in transition warning (by @jvdanilo).

## 6.2 “Fluctuat nec mergitur”
* Use `fill` instead of `fill-available` according spec changes (by 一丝).
* Add `fill` support for logical dimension properties (by 一丝).
* Add `text-emphasis` support (by 一丝).
* Add prefixes to `@supports` only for compatible browsers.
* Add `rad`, `grad` and `turn` units support to linear gradients.
* Add some `deg` directions support for old WebKit linear gradients.
* Fix `@supports` parenthesis (by @heady).
* Add warning when prefixes could not be generated
  for complicated `transition-property` values.
* Add warning for outdated `fill-available` value.
* Add warning for wrong `text-emphasis-position` value.
* Add “time capsule” warning for prefix-less future.
* Normalizes all warning messages.

## 6.1.2
* Fix gradient hack on some parameters (by Alexey Efremov).

## 6.1.1
* Fix `cursor: grab` and `cursor: grabbing` support.

## 6.1 “Bil-shaʿb wa lil-shaʿb”
* Change `transition` support to output more robust CSS.
* Add `:read-only` support.
* Add support for `appearance` with any values.
* Add CSS-in-JS support via `postcss-js`.
* Add loud `/*! autoprefixer: off */` control comments support.
* Convert `rotateZ` to `rotate` for `-ms-transform`.
* Use `postcss-value-parser` to carefully work with gradients.
* Remove `-ms-transform-style` and `-o-transform-style` that never existed.

## 6.0.3
* Fix old gradient direction warning.

## 6.0.2
* Remove unnecessary `-khtml-` prefix too.

## 6.0.1
* Fix `cross-fade()` support (by 一丝).

## 6.0 “Eureka”
* CLI was removed from `autoprefixer` package to `autoprefixer-cli`.
* `autoprefixer-core` and `autoprefixer` packages was merged back.
* Remove `autoprefixer(opt).process(css)`, use `autoprefixer.process(css, opt)`.
* Remove `safe` option. Use separated Safe parser from PostCSS.
* Remove Opera 12.1 from default query.
* Use PostCSS 5.0 API.
* Add custom syntaxes support.
* Add `image-set` support (by 一丝).
* Add `mask-border` support (by 一丝).
* Add `filter()` function support (by Vincent De Oliveira).
* Add `backdrop-filter` support (by Vincent De Oliveira).
* Add `element()` support (by Vincent De Oliveira).
* Add CSS Regions support.
* Add Scroll Snap Points support.
* Add `writing-mode` support.
* Add `::backdrop` support.
* Add `cross-fade()` support.
* Add other `break-` properties support.
* Add Microsoft Edge support (by Andrey Polischuk).
* Add `not` keyword and exclude browsers by query.
* Add version ranges `IE 6-9` (by Ben Briggs).
* Fix `filter` in `transition` support on Safari.
* Fix `url()` parsing.
* Fix `pixelated` cleaning.
* Always show old gradient direction warning.

## 5.2.1
* Fix parent-less node issue on some cases (by Josh Gillies).

## 5.2 “Dont tread on me”
* Add `appearance` support.
* Warn users on old gradient direction or flexbox syntax.
* Add `add: false` option to disable new prefixes adding.
* Make Autoprefixer 30% faster.
* Use PostCSS 4.1 plugin API.
* Add prefixes for `pixelated` instead of `crisp-edges` in `image-rendering`.
* Do not add `::placeholder` prefixes for `:placeholder-shown`.
* Fix `text-decoration` prefixes.
* `autoprefixer.process()` was deprecated. Use PostCSS API.

## 5.1.11
* Update `num2fraction` to fix resolution media query (by 一丝).

## 5.1.10
* Do not generate `-webkit-image-rendering`.

## 5.1.9
* Fix DynJS compatibility (by Nick Howes).

## 5.1.8
* Fix gradients in `mask` and `mask-image` properties.
* Fix old webkit prefix on some unsupported gradients.

## 5.1.7
* Fix placeholder selector (by Vincent De Oliveira).

## 5.1.6
* Use official `::placeholder-shown` selector (by Vincent De Oliveira).

## 5.1.5
* Add transition support for CSS Masks properties.

## 5.1.4
* Use `-webkit-` prefix for Opera Mobile 24.

## 5.1.3
* Add IE support for `image-rendering: crisp-edges`.

## 5.1.2
* Add never existed `@-ms-keyframes` to common mistake.

## 5.1.1
* Safer value split in `flex` hack.

## 5.1 “Jianyuan”
* Add support for resolution media query (by 一丝).
* Higher accuracy while removing prefixes in values.
* Add support for logical properties (by 一丝).
* Add `@viewport` support.
* Add `text-overflow` support (by 一丝).
* Add `text-emphasis` support (by 一丝).
* Add `image-rendering: crisp-edges` support.
* Add `text-align-last` support.
* Return `autoprefixer.defaults` as alias to current `browserslist.defaults`.
* Save code style while adding prefixes to `@keyframes` and `@viewport`.
* Do not remove `-webkit-background-clip` with non-spec `text` value.
* Fix `-webkit-filter` in `transition`.
* Better support for browser versions joined on Can I Use
  like `ios_saf 7.0-7.1` (by Vincent De Oliveira).
* Fix compatibility with `postcss-import` (by Jason Kuhrt).
* Fix Flexbox prefixes for BlackBerry and UC Browser.
* Fix gradient prefixes for old Chrome.

## 5.0 “Pravda vítězí”
* Use PostCSS 4.0.
* Use Browserslist to parse browsers queries.
* Use global `browserslist` config.
* Add `> 5% in US` query to select browsers by usage in some country.
* Add `object-fit` and `object-position` properties support.
* Add CSS Shape properties support.
* Fix UC Browser name in debug info.
* Remove `autoprefixer.defaults` and use defaults from Browserslist.

## 4.0.2
* Remove `o-border-radius`, which is common mistake in legacy CSS.

## 4.0.1
* Fix `@supports` support with brackets in values (by Vincent De Oliveira).

## 4.0 “Indivisibiliter ac Inseparabiliter”
* Become 2.5 times fatser by new PostCSS 3.0 parser.
* Do not remove outdated prefixes by `remove: false` option.
* `map.inline` and `map.sourcesContent` options are now `true` by default.
* Add `box-decoration-break` support.
* Do not add old `-webkit-` prefix for gradients with `px` units.
* Use previous source map to show origin source of CSS syntax error.
* Use `from` option from previous source map `file` field.
* Set `to` value to `from` if `to` option is missing.
* Trim Unicode BOM on source maps parsing.
* Parse at-rules without spaces like `@import"file"`.
* Better previous `sourceMappingURL` annotation comment cleaning.
* Do not remove previous `sourceMappingURL` comment on `map.annotation: false`.

## 3.1.2
* Update Firefox ESR version from 24 to 31.

## 3.1.1
* Use Flexbox 2009 spec for Android stock browser < 4.4.

## 3.1 “Satyameva Jayate”
* Do not remove comments from prefixed values (by Eitan Rousso).
* Allow Safari 6.1 to use final Flexbox spec (by John Kreitlow).
* Fix `filter` value in `transition` in Webkits.
* Show greetings if your browsers don’t require any prefixes.
* Add `<=` and `<` browsers requirement (by Andreas Lind).

## 3.0.1
* Fix `autoprefixer.postcss` in callbacks.

## 3.0 “Liberté, Égalité, Fraternité”
* Project was split to autoprefixer (with CLI) and autoprefixer-core.
* `autoprefixer()` now receives only `options` object with `browsers` key.
* GNU format for syntax error messages from PostCSS 2.2.

## 2.2 “Mobilis in mobili”
* Allow to disable Autoprefixer for some rule by control comment.
* Use PostCSS 2.1 with Safe Mode option and broken source line
  in CSS syntax error messages.

## 2.1.1
* Fix `-webkit-background-size` hack for `contain` and `cover` values.
* Don’t add `-webkit-` prefix to `filter` with SVG (by Vincent De Oliveira).

## 2.1 “Eleftheria i thanatos”
* Add support for `clip-path` and `mask` properties.
* Return `-webkit-` prefix to `filter` with SVG URI.

## 2.0.2
* Add readable names for new browsers from 2.0 release.
* Don’t add `-webkit-` prefix to `filter` with SVG URI.
* Don’t add `-o-` prefix 3D transforms.

## 2.0.1
* Save declaration style, when clone declaration to prefix.

## 2.0 “Hongik Ingan”
* Based on PostCSS 1.0.
  See [options changes](https://github.com/postcss/postcss/releases/tag/1.0.0).
* Restore visual cascade after declaration removing.
* Enable visual cascade by default.
* Prefix declareation in `@supports` at-rule conditions.
* Add all browsers from Can I Use: `ie_mob`, `and_chr`, `and_ff`,
  `op_mob` and `op_mini`.
* Allow to use latest Autoprefixer from GitHub by npm.
* Add `--no-cascade`, `--annotation` and `--sources-content` options to binary.

## 1.3.1
* Fix gradient hack, when `background` property contains color.

## 1.3 “Tenka Fubu”
* Add `text-size-adjust` support.
* Add `background-size` to support Android 2.

## 1.2 “Meiji”
* Use Can I Use data from official `caniuse-db` npm package.
* Remove package data update from binary.
* Use increment value instead of current date in minor versions.

## 1.1 “Nutrisco et extingo”
* Add source map annotation comment support.
* Add inline source map support.
* Autodetect previous source map.
* Fix source maps support on Windows.
* Fix source maps support in subdirectory.
* Prefix selector even if it is already prefixed by developer.
* Add option `cascade` to create nice visual cascade of prefixes.
* Fix flexbox support for IE 10 (by Roland Warmerdam).
* Better `break-inside` support.
* Fix prefixing, when two same properties are near.

### 20140222
* Add `touch-action` support.

### 20140226
* Chrome 33 is moved to released versions.
* Add Chrome 36 data.

### 20140302
* Add `text-decoration-*` properties support.
* Update browsers usage statistics.
* Use new PostCSS version.

### 20140319
* Check already prefixed properties after current declaration.
* Normalize spaces before already prefixed check.
* Firefox 28 is moved to released versions.
* Add Firefox 31 data.
* Add some Blackberry data.

### 20140327
* Don’t use `-ms-transform` in `@keyframes`, because IE 9 doesn’t support
  animations.
* Update BlackBerry 10 data.

### 20140403
* Update browsers usage statistics.
* Opera 20 is moved to released versions.
* Add Opera 22 data.

### 20140410
* Chrome 34 is moved to released versions.
* Add Chrome 37 data.
* Fix Chrome 36 data.

### 20140429
* Fix `display: inline-flex` support by 2009 spec.
* Fix old WebKit gradient converter (by Sergey Belov).
* Fix CSS 3 cursors data (by Nick Schonning).

### 20140430
* Separate 2D and 3D transform prefixes to clean unnecessary `-ms-` prefixes.
* Firefox 29 is moved to released versions.
* Add Firefox 32 data.

### 20140510
* Do not add `-ms-` prefix for `transform` with 3D functions.
* Update browsers global usage statistics.

### 20140512
* Remove unnecessary `-moz-` prefix for `wavy` in `text-decoration`.
* Update Safari data for font properties.

### 20140521
* Chrome 36 is moved to released versions.
* Add Chrome 38 data.

### 20140523
* Opera 21 is moved to released versions.
* Add Opera 23 data.

### 20140605
* Allow to parse gradients without space between color and position.
* Add iOS 8, Safari 8 and Android 4.4.3 data.
* Update browsers usage statistics.

## 1.0 “Plus ultra”
* Source map support.
* Save origin indents and code formatting.
* Change CSS parser to PostCSS.
* Preserve vendor-prefixed properties put right after unprefixed ones.
* Rename `compile()` to `process()` and return result object,
  instead of CSS string.
* Rename `inspect()` to `info()`.
* Add in binary `-d` option to specify output directory.
* Binary now will not concat output files.
* Allow to select last versions for specified browser.
* Add full browser names aliases: `firefox`, `explorer` and `blackberry`.
* Ignore case in browser names.
* Change license to MIT.
* Add prefixes inside custom at-rules.
* Add only necessary prefixes to selector inside prefixed at-rule.
* Safer backgrounds list parser in gradient hack.
* Prefix `@keyframes` inside `@media`.
* Don’t prefix values for CSS3 PIE properties.
* Binary now shows file name in syntax error.
* Use browserify to build standalone version.

### 20131225
* Fix deprecated API convertor.
* Add `::placeholder` support for Firefix >= 18.
* Fix vendor prefixes order.

### 20140103
* Add `-webkit-` prefix for `sticky` position.
* Update browsers popularity statistics.

### 20140109
* Add selectors and at-rules sections to debug info.
* Fix outdated prefixes cleaning.

### 20140110
* Add `Firefox ESR` browser requirement.
* Opera 18 is moved to released versions.
* Add Opera 20 data.

### 20140117
* Chrome 32 is moved to released versions.
* Add Opera 34 data.

### 20140130
* Fix flexbox properties names in transitions.
* Add Chrome 35 and Firefox 29 data.

### 20140203
* Android 4.4 stock browser and Opera 19 are moved to released versions.
* Add Opera 21 data.
* Update browsers usage statistics.

### 20140213
* Add case insensitive to IE’s filter hack (by Dominik Schilling).
* Improve selector prefixing in some rare cases (by Simon Lydell).
* Firefox 27 is moved to released versions.
* Add Firefox 30 data.

## 0.8 “Unbowed, Unbent, Unbroken”
* Add more browsers to defaults ("> 1%, last 2 versions, ff 17, opera 12.1"
  instead of just "last 2 browsers").
* Keep vendor prefixes without unprefixed version (like vendor-specific hacks).
* Convert gradients to old WebKit syntax (actual for Android 2.3).
* Better support for several syntaxes with one prefix (like Flexbox and
  gradients in WebKit).
* Add intrinsic and extrinsic sizing values support.
* Remove never existed prefixes from common mistakes (like -ms-transition).
* Add Opera 17 data.
* Fix selector prefixes order.
* Fix browser versions order in inspect.

### 20130903
* Fix old WebKit gradients convertor on rgba() colors.
* Allow to write old direction syntax in gradients.

### 20130906
* Fix direction syntax in radial gradients.
* Don’t prefix IE filter with modern syntax.

### 20130911
* Fix parsing property name with spaces.

### 20130919
* Fix processing custom framework prefixes (by Johannes J. Schmidt).
* Concat outputs if several files compiled to one output.
* Decrease standalone build size by removing unnecessary Binary class.
* iOS 7 is moved to released versions.
* Clean up binary code (by Simon Lydell).

### 20130923
* Firefox 24 is moved to released versions.

### 20131001
* Add support for grab, grabbing, zoom-in and zoom-out cursor values.

### 20131006
* Chrome 30 is moved to released versions.

### 20131007
* Don’t add another prefixes in rule with prefixed selector.

### 20131009
* Opera 17 is moved to released versions.

### 20131015
* Fix converting multiple gradients to old webkit syntax (by Aleksei Androsov).

### 20131017
* Fix @host at-rule parsing.

### 20131020
* IE 11 and Andrid 4.3 is moved to released versions.
* Add Opera 18 data.
* Add @namespace support.
* Sort browser versions in data file.

### 20131029
* Add Safari 6.1 data.
* Add fx alias for Firefox.

### 20131104
* Update Android future version to 4.4.
* Google Chrome 32 added to future versions list.
* Firefox 25 now is actual version, 27 and 28 added to future versions.
* Browsers statistics are updated.

### 20131205
* Google Chrome 33 added to future releases list.
* Google Chrome 31 moved to current releases list.

### 20131209
* Use old webkit gradients for old iOS and Safari (by Chad von Nau).
* Fix direction conversion for old webkit gradients (by Chad von Nau).
* Update browsers popularity statistics.

### 20131213
* Firefox ESR in default browsers was changed to 24 version.
* Firefox 26 was moved to current releases list.
* Firefox 28 was added to future releases list.

## 0.7 “We Do Not Sow”
* Add vendor prefixes to selectors.
* Add ::selection and ::placeholder selectors support.
* Allow to load support data from Can I Use pull requests.
* Remove deprecated API.

### 20130806
* Add hyphens support.

### 20130807
* Add tab-size support.
* Add :fullscreen support.

### 20130808
* Allow to select browser versions by > and >= operator.
* Fix flex properties in transition.

### 20130810
* Add Firefox 25 data.

### 20130824
* Add Chrome 31 and 30 data.
* Fix CSS comments parsing (by vladkens).

## 0.6 “As High As Honor”
* New faster API, which cache preprocessed data. Old API is deprecated.
* A lot of perfomance improvements.
* Add Opera 15 -webkit- prefix support.
* Update Chrome 29 and Safari 7 prefixes data.
* Add minor browsers in popularity select.
* Better syntax error messages.

### 20130721
* Add Chrome 30 data.

### 20130728
* Don’t remove non-standard -webkit-background-clip: text.
* Don’t remove IE hack on CSS parse.

### 20130729
* Add Opera 16 data.
* Fix “Invalid range in character class” error on Firefox.

### 20130730
* Fix correct clone comments inside keyframes (by Alexey Plutalov).
* Fix angle recalculation in gradients (by Roman Komarov).

### 20130731
* Add border-image support.

## 0.5 “Ours is the Fury”
* Rewrite Autoprefixer to be more flexible.
* Use css, instead of Rework, to fix CSS parsing errors faster.
* Fix a lot of CSS parsing errors.

### 20130616
* More useful message for CSS parsing errors.
* Remove old WebKit gradient syntax.
* Fix parsing error on comment with braces.

### 20130617
* Remove old Mozilla border-radius.
* Don’t prefix old IE filter.
* Remove old background-clip, background-size and background-origin prefixes.
* Speed up regexps in values.
* Allow to hack property declarations.

### 20130625
* Convert flexbox properties to 2009 and 2012 specifications.
* Improve messages on syntax errors.

### 20130626
* Add Firefox 24 data.
* Add prefixes for font-feature-settings.

### 20130629
* Fix convert flex properties to old box-flex.

## 0.4 “Winter Is Coming”
* Remove outdated prefixes.
* Add border-radius and box-shadow properties to database.
* Change degrees in webkit gradients.

### 20130515
* Add old syntax in gradient direction.
* Add old syntax for display: flex.
* Update browser global usage statistics.

### 20130521
* Add Firefox 23 data.

### 20130524
* Add Chrome 29 data.

### 20130528
* Fix compatibilty with Rework from git master.
* Add minor browsers to data, which can be selected only directly.

### 20130530
* Add Opera 15 and iOS 6.1 data.
* Fix iOS versions in properties and values data.

### 20130603
* Use latest Rework 0.15 with a lot of CSS parsing fixes.
* Update browsers usage statistics.

## 0.3 “Growing Strong”
* Rename `autoprefixer.filter()` to `autoprefixer.rework()`.
* Use own filters instead of Rework’s `prefix` and `prefixValue`.
* Smarter value prefixer without false match “order” in “border”.
* 40% faster.
* Don’t add unnecessary properties instead of Rework’s `prefixValue`.
* Don’t change properties order.
* Sort properties and values in inspect output.
* Add main to component config (by Jonathan Ong).
* Fix documentation (by Sergey Leschina and Mark Vasilkov).

### 20130424
* Fix value override in prefixer.

### 20130427
* Prefix several same values in one property.
* Fix Windows support in binary.
* Improve print errors in binary.

### 20130502
* Don’t add -webkit- prefix to IE filter.
* Don’t duplicate prefixes on second run.

## 0.2 “Hear Me Roar!”
* Update parse libraries.
* Use component package manager to build standalone script.
* Add inspect to standalone script.

## 0.1 “Fire and Blood”
* Initial release.
