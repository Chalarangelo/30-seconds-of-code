# 4.1.10

## Bug Fixes

* `stylehacks` does not throw error on `[attr]` selector

# 4.1.9

## Performance Improvements

* `postcss-colormin`: increase performance
* `postcss-discard-comments`: increase performance
* `postcss-merge-rules` increase performance
* `postcss-minify-params` increase performance
* `postcss-minify-selectors`: increase performance
* `postcss-normalize-display-values`: increase performance 
* `postcss-normalize-positions`: increase performance
* `postcss-normalize-repeat-style`: increase performance
* `postcss-normalize-string`: increase performance
* `postcss-normalize-timing-functions`: increase performance
* `postcss-normalize-whitespace`: increase performance
* `postcss-ordered-values`: increase performance
* `postcss-reduce-transforms`: increase performance
* `postcss-svgo`: increase performance

## Bug Fixes

* `postcss-merge-longhand` handle uppercase properties and values
* `postcss-minify-gradients` handle uppercase properties and values
* `postcss-minify-params` do break `@page` rules
* `postcss-reduce-idents` handle uppercase at-rules
* `postcss-reduce-initial` now uses `repeat` as initial value for `mask-repeat`
* `postcss-reduce-initial` handle uppercase value when you convert to initial
* `stylehacks` handle uppercase properties and values

# 4.1.8

## Performance Improvements

* initial loading time (`require('cssnano')`).

## Bug Fixes

* `postcss-merge-longhand` correctly merging border properties with custom properties.

# 4.1.7

## Bug Fixes

* republish `cssnano` due broken release.

# 4.1.6

## Bug Fixes

* `postcss-merge-longhand` doesn't throw error when merge a border property.

# 4.1.5

## Bug Fixes

* `cssnano` now allow to toggling of plugins in presets using boolean configuration option.
* `postcss-merge-longhand` doesn't merge properties with `unset`.
* `postcss-merge-longhand` correctly merge borders with custom properties.
* `postcss-merge-longhand` doesn't merge redundant values if declarations are of different importance.

## Other changes

* `postcss-calc` updated to `7.0.0` version.

# 4.1.4

## Other changes

* `css-declaration-sorter` now use PostCSS 7.
* `postcss-calc` now use PostCSS 7.

# 4.1.3

## Other changes

* `postcss-minify-font-values` now use PostCSS 7.
* `postcss-discard-duplicates` now use PostCSS 7.

# 4.1.2

## Bug Fixes

* `postcss-svgo` now handle DataURI with uppercase `data` value (`DATA:image/*;...`).

# 4.1.1

## Bug Fixes

* `css-declaration-sorter` was removed from default prevent.
* `postcss-normalize-timing-functions` doesn't lowercased property anymore.
* `postcss-normalize-positons` now handles uppercase properties.
* `postcss-normalize-url` now is case-insensitive.
* `postcss-merge-idents` now is case-insensitive.
* `postcss-merge-rules` now is case-insensitive.
* `postcss-minify-selectors` now is case-insensitive.
* `postcss-minify-font-values` now is case-insensitive.
* `postcss-normalize-unicode` now has correct dependencies.
* `postcss-minify-params` now has correct dependencies.

## Other changes

* `cssnano-preset-advanced` use Autoprefixer 9.
* use PostCSS 7 in all plugins.

# 4.1.0

## Bug Fixes

* `postcss-merge-longhand` doesn't mangle borders.

## Features

* `postcss-ordered-values` support ordering animation values.

# 4.0.5

## Bug Fixes

* `postcss-merge-longhand` now correctly merges borders with custom properties.
* `postcss-merge-longhand` doesn't throw error in some `border` merge cases.

# 4.0.4

## Bug Fixes

* `postcss-merge-longhand` doesn't drop border-width with custom property from border shorthand.
* `postcss-merge-longhand` doesn't convert `currentColor`.
* `postcss-merge-longhand` doesn't merge border properties if there is a shorthand property between them.

# 4.0.3

## Bug Fixes

* `postcss-merge-longhand` incorrect minification of `border` (`border-*`) declarations.

# 4.0.2

## Bug Fixes

* `postcss-merge-longhand` don't explode declarations with custom properties.
* `postcss-colormin` now better transform to `hsl`.

# 4.0.1

## Bug Fixes

* `browserslist` version incompatibility with `caniuse-api`.

# 4.0.0

## Breaking changes

* We dropped support for Node 4, now requiring at least Node 6.9.

## Features

* postcss-merge-longhand now optimises `border-spacing` property.

## Bug Fixes

* postcss-normalize-unicode doesn't change `U` to lowercase for `IE` <= 11 and `Edge` <= 15.
* postcss-merge-longhand works with custom properties (Example `a { border-style:dotted; border-style:var(--variable) }`) correctly.
* postcss-ordered-values handle `border` property with invalid border width value correctly.
* postcss-merge-rules handles `:-ms-input-placeholder` and `::-ms-input-placeholder` selectors correctly.
* postcss-merge-rules works with `all` property correctly.
* postcss-normalize-url don't handle empty `url` function.
* postcss-normalize-url handles `data` and `*-extension://` URLs correctly.
* postcss-colormin adds whitespace after minified value and before function.
* postcss-minify-font-values better escapes font name.
* postcss-minify-params doesn't remove `all` for IE.

## Other changes

* update all dependencies to latest.
* better handles uppercase selectors/properties/values/units.

# 4.0.0-rc.2

## Features

* Includes the new release candidate for postcss-selector-parser 3.
* Refactors comments tokenizing in postcss-discard-comments to be more
  memory efficient.
* Adds css-declaration-sorter for improved gzip compression efficiencies
  (thanks to @Siilwyn).
* postcss-svgo now optimises base 64 encoded SVG where possible
  (thanks to @evilebottnawi).
* stylehacks now supports `@media \0screen\,screen\9 {}` hacks
  (thanks to @evilebottnawi).

## Bug Fixes

* Fixed handling of package.json configuration (thanks to @andyjansson).
* Fixed `resolveConfig` for a `Root` node without a `source` property
  (thanks to @darthmaim).
* Improved radial gradient handling (thanks to @pigcan).
* stylehacks now properly accounts for vendor prefixes
  (thanks to @evilebottnawi).

# 4.0.0-rc.1

## Bug Fixes

* cssnano: Resolved an issue with external configuration which wasn't
  being loaded correctly (thanks to @andyjansson).
* postcss-minify-params: Resolved an issue with cssnano's handling of the
  `@value` syntax from css-modules to better integrate with css-loader.

# 4.0.0-rc.0

Since version 4 has been in-development for some time, we thought it would be
best to release an alpha version so that we could catch any issues before
the actual release.

## Breaking changes

* cssnano & its plugins have been upgraded to PostCSS 6.x. Please ensure that
  for optimal results that you use cssnano with a PostCSS 6 compatible runner
  & that any other plugins are also using PostCSS 6.
* cssnano is now essentially a preset loader and does not contain any built-in
  transforms (instead, it delegates to `cssnano-preset-default` by default).
  Due to the new architecture, it's not possible to exclude asynchronous
  transforms and run it synchronously, unlike in 3.x. Any transforms that
  were "core" modules have now been extracted out into separate packages.
* Because of the new preset system, cssnano will not accept any transformation
  options; these must be set in the preset. The option names remain mostly the
  same, except some cases where "core" modules have been extracted out:

  * `core` is now `normalizeWhitespace`.
  * `reduceBackgroundRepeat` is now `normalizeRepeatStyle`.
  * `reduceDisplayValues` is now `normalizeDisplayValues`.
  * `reducePositions` is now `normalizePositions`.
  * `reduceTimingFunctions` is now `normalizeTimingFunctions`.
  * `styleCache` is now `rawCache`.

  When excluding transforms, we now have an `exclude` option (in 3.x this was
  named `disable`). Similarly, the `safe` option was removed; the defaults
  are now much less aggressive.
* By default, the following transforms are no longer applied to any input CSS.
  You may see an increased output file size as a result:

  * `autoprefixer`
  * `postcss-discard-unused`
  * `postcss-merge-idents`
  * `postcss-reduce-idents`
  * `postcss-zindex`

  Note that you can load `cssnano-preset-advanced` instead which *does* contain
  these transforms.
* We no longer detect previous plugins to silently exclude our own, and now
  consider this to be an anti-pattern. So `postcss-filter-plugins` was removed.
* We also changed some options to make the default transforms safer:

  * `postcss-minify-font-values`: `removeAfterKeyword` set to `false` from `true`.
  * `postcss-normalize-url`: `stripWWW` set to `false` from `true`.

* cssnano now does not accept the `sourcemap` shortcut option; please refer
  to the PostCSS documentation on sourcemaps. The `quickstart.js` file included
  with this module will give you a good starting point.
* `cssnano.process` is no longer a custom method; we use the built-in `process`
  method exposed on each PostCSS plugin. The new signature is
  `cssnano.process(css, postcssOpts, cssnanoOpts)`, in 3.x it was
  `cssnano.process(css, cssnanoOpts)`.
* We dropped support for Node 0.12, now requiring at least Node 4.
* Finally, cssnano is now developed as a monorepo, due to the fact that some
  transforms have a lot of grey area/overlap. Due to this, some modules have
  been refactored to delegate responsibility to others, such that duplication
  of functionality is minimized. For instance, `postcss-colormin` will no
  longer compress whitespace or compress numbers, as those are handled by
  `postcss-normalize-whitespace` & `postcss-convert-values` respectively.

## Other changes

* Due to the PostCSS 6 upgrade, we have been able to reduce usage of custom
  methods, such as node `clone` behaviour. In cases where some utility
  has been used by several plugins it is now a separate package, reducing
  cssnano's footprint.
* cssnano now makes much better use of Browserslist. `postcss-colormin` &
  `postcss-reduce-initial` were enhanced with different behaviour depending
  on which browsers are passed. And now, the footprint for the `caniuse-db`
  dependency is much smaller thanks to `caniuse-lite` - 7 times smaller as
  of this writing. This makes cssnano much faster to download from npm!

# 3.10.0

* cssnano will no longer `console.warn` any messages when using deprecated
  options; these are now sent to PostCSS. You will be able to see them if you
  use a PostCSS runner with built-in messages support, or alternately by
  loading `postcss-reporter` or `postcss-browser-reporter` in your plugins list.
* Prepares support for `grid` identifier reduction by adding it to the list
  of optimisations turned off when `options.safe` is set to `true`.
* Adds support for normalizing `unicode-range` descriptors. Values will
  be converted when the code matches `0` & `f` in the same place on both sides
  of the range. So, `u+2000-2fff` can be converted to `u+2???`, but
  `u+2100-2fff` will be left as it is.

# 3.9.1

* Resolves an integration issue with `v3.9.0`, where `undefined` values
  would attempt to be parsed.

# 3.9.0

* Adds a new option to normalize wrapping quotes for strings & joining
  multiple-line strings into a single line. This optimisation can potentially
  reduce the final gzipped size of your CSS file.

# 3.8.2

* Resolves an issue where `display: list-item inline flow` would be normalized
  to `inline list-item` rather than `inline-list-item` (thanks to @mattbasta).

# 3.8.1

* Adds a quick start file for easy integration with Runkit. Try cssnano online
  at https://runkit.com/npm/cssnano.

# 3.8.0

* Adds support for normalizing multiple values for the `display` property. For
  example `block flow` can be simplified to `block`.

# 3.7.7

* Further improves CSS mixin handling; semicolons will no longer be stripped
  from *rules* as well as declarations.

# 3.7.6

* Resolves an issue where the semicolon was being incorrectly stripped
  from CSS mixins.

# 3.7.5

* Resolves an issue where the `safe` flag was not being persisted across
  multiple files (thanks to @techmatt101).

# 3.7.4

* Improves performance of the reducePositions transform by testing
  against `hasOwnProperty` instead of using an array of object keys.
* Removes the redundant `indexes-of` dependency.

# 3.7.3

* Unpins postcss-filter-plugins from `2.0.0` as a fix has landed in the new
  version of uniqid.

# 3.7.2

* Temporarily pins postcss-filter-plugins to version `2.0.0` in order to
  mitigate an issue with uniqid `3.0.0`.

# 3.7.1

* Enabling safe mode now turns off both postcss-merge-idents &
  postcss-normalize-url's `stripWWW` option.

# 3.7.0

* Added: Reduce `background-repeat` definitions; works with both this property
  & the `background` shorthand, and aims to compress the extended two value
  syntax into the single value syntax.
* Added: Reduce `initial` values for properties when the *actual* initial value
  is shorter; for example, `min-width: initial` becomes `min-width: 0`.

# 3.6.2

* Fixed an issue where cssnano would crash on `steps(1)`.

# 3.6.1

* Fixed an issue where cssnano would crash on `steps` functions with a
  single argument.

# 3.6.0

* Added `postcss-discard-overridden` to safely discard overridden rules with
  the same identifier (thanks to @Justineo).
* Added: Reduce animation/transition timing functions. Detects `cubic-bezier`
  functions that are equivalent to the timing keywords and compresses, as well
  as normalizing the `steps` timing function.
* Added the `perspective-origin` property to the list of supported properties
  transformed by the `reduce-positions` transform.

# 3.5.2

* Resolves an issue where the 3 or 4 value syntax for `background-position`
  were being incorrectly converted.

# 3.5.1

* Improves checking for `background-position` values in the `background`
  shorthand property.

# 3.5.0

* Adds a new optimisation path which can minimise keyword values for
  `background-position` and the `background` shorthand.
* Tweaks to performance in the `core` module, now performs less AST passes.
* Now compiled with Babel 6.

# 3.4.0

* Adds a new optimisation path which can minimise gradient parameters
  automatically.

# 3.3.2

* Fixes an issue where using `options.safe` threw an error when cssnano was
  not used as part of a PostCSS instance, but standalone (such as in modules
  like gulp-cssnano). cssnano now renames `safe` internally to `isSafe`.

# 3.3.1

* Unpins postcss-colormin from `2.1.2`, as the `2.1.3` & `2.1.4` patches had
  optimization regressions that are now resolved in `2.1.5`.

# 3.3.0

* Updated modules to use postcss-value-parser version 3 (thanks to @TrySound).
* Now converts between transform functions with postcss-reduce-transforms.
  e.g. `translate3d(0, 0, 0)` becomes `translateZ(0)`.

# 3.2.0

* cssnano no longer converts `outline: none` to `outline: 0`, as there are
  some cases where the values are not equivalent (thanks to @TrySound).
* cssnano no longer converts for example `16px` to `1pc` *by default*. Length
  optimisations can be turned on via `{convertValues: {length: true}}`.
* Improved minimization of css functions (thanks to @TrySound).

# 3.1.0

* This release swaps postcss-single-charset for postcss-normalize-charset,
  which can detect encoding to determine whether a charset is necessary.
  Optionally, you can set the `add` option to `true` to prepend a UTF-8
  charset to the output automatically (thanks to @TrySound).
* A `safe` option was added, which disables more aggressive optimisations, as
  a convenient preset configuration (thanks to @TrySound).
* Added an option to convert from `deg` to `turn` & vice versa, & improved
  minification performance in functions (thanks to @TrySound).

# 3.0.3

* Fixes an issue where cssnano was removing spaces around forward slashes in
  string literals (thanks to @TrySound).

# 3.0.2

* Fixes an issue where cssnano was removing spaces around forward slashes in
  calc functions.

# 3.0.1

* Replaced css-list & balanced-match with postcss-value-parser, reducing the
  module's overall size (thanks to @TrySound).

# 3.0.0

* All cssnano plugins and cssnano itself have migrated to PostCSS 5.x. Please
  make sure that when using the 3.x releases that you use a 5.x compatible
  PostCSS runner.
* cssnano will now compress inline SVG through SVGO. Because of this change,
  interfacing with cssnano must now be done through an asynchronous API. The
  main `process` method has the same signature as a PostCSS processor instance.
* The old options such as `merge` & `fonts` that were deprecated in
  release `2.5.0` were removed. The new architecture allows you to specify any
  module name to disable it.
* postcss-minify-selectors' at-rule compression was extracted out into
  postcss-minify-params (thanks to @TrySound).
* Overall performance of the module has improved dramatically, thanks to work
  by @TrySound and input from the community.
* Improved selector merging/deduplication in certain use cases.
* cssnano no longer compresses hex colours in filter properties, to better
  support old versions of Internet Explorer (thanks to @faddee).
* cssnano will not merge properties together that have an `inherit` keyword.
* postcss-minify-font-weight & postcss-font-family were consolidated into
  postcss-minify-font-values. Using the old options will print deprecation
  warnings (thanks to @TrySound).
* The cssnano CLI was extracted into a separate module, so that dependent
  modules such as gulp-cssnano don't download unnecessary extras.

# 2.6.1

* Improved performance of the core module `functionOptimiser`.

# 2.6.0

* Adds a new optimisation which re-orders properties that accept values in
  an arbitrary order. This can lead to improved merging behaviour in certain
  cases.

# 2.5.0

* Adds support for disabling modules of the user's choosing, with new option
  names. The old options (such as `merge` & `fonts`) will be removed in `3.0`.

# 2.4.0

* postcss-minify-selectors was extended to add support for conversion of
  `::before` to `:before`; this release removes the dedicated
  postcss-pseudoelements module.

# 2.3.0

* Consolidated postcss-minify-trbl & two integrated modules into
  postcss-merge-longhand.

# 2.2.0

* Replaced integrated plugin filter with postcss-filter-plugins.
* Improved rule merging logic.
* Improved performance across the board by reducing AST iterations where it
  was possible to do so.
* cssnano will now perform better whitespace compression when used with other
  PostCSS plugins.

# 2.1.1

* Fixes an issue where options were not passed to normalize-url.

# 2.1.0

* Allow `postcss-font-family` to be disabled.

# 2.0.3

* cssnano can now be consumed with the parentheses-less method in PostCSS; e.g.
  `postcss([ cssnano ])`.
* Fixes an issue where 'Din' was being picked up by the logic as a numeric
  value, causing the full font name to be incorrectly rearranged.

# 2.0.2

* Extract trbl value reducing into a separate module.
* Refactor core longhand optimiser to not rely on trbl cache.
* Adds support for `ch` units; previously they were removed.
* Fixes parsing of some selector hacks.
* Fixes an issue where embedded base 64 data was being converted as if it were
  a URL.

# 2.0.1

* Add `postcss-plugin` keyword to package.json.
* Wraps all core processors with the PostCSS 4.1 plugin API.

# 2.0.0

* Adds removal of outdated vendor prefixes based on browser support.
* Addresses an issue where relative path separators were converted to
  backslashes on Windows.
* cssnano will now detect previous plugins and silently disable them when the
  functionality overlaps. This is to enable faster interoperation with cssnext.
* cssnano now exports as a PostCSS plugin. The simple interface is exposed
  at `cssnano.process(css, opts)` instead of `cssnano(css, opts)`.
* Improved URL detection when using two or more in the same declaration.
* node 0.10 is no longer officially supported.

# 1.4.3

* Fixes incorrect minification of `background:none` to `background:0 0`.

# 1.4.2

* Fixes an issue with nested URLs inside `url()` functions.

# 1.4.1

* Addresses an issue where whitespace removal after a CSS function would cause
  rendering issues in Internet Explorer.

# 1.4.0

* Adds support for removal of unused `@keyframes` and `@counter-style` at-rules.
* comments: adds support for user-directed removal of comments, with the
  `remove` option (thanks to @dmitrykiselyov).
* comments: `removeAllButFirst` now operates on each CSS tree, rather than the
  first one passed to cssnano.

# 1.3.3

* Fixes incorrect minification of `border:none` to `border:0 0`.

# 1.3.2

* Improved selector minifying logic, leading to better compression of attribute
  selectors.
* Improved comment discarding logic.

# 1.3.1

* Fixes crash on undefined `decl.before` from prior AST.

# 1.3.0

* Added support for bundling cssnano using webpack (thanks to @MoOx).

# 1.2.1

* Fixed a bug where a CSS function keyword inside its value would throw
  an error.

# 1.2.0

* Better support for merging properties without the existance of a shorthand
  override.
* Can now 'merge forward' adjacent rules as well as the previous 'merge behind'
  behaviour, leading to better compression.
* Selector re-ordering now happens last in the chain of plugins, to help clean
  up merged selectors.

# 1.1.0

* Now can merge identifiers such as `@keyframes` and `@counter-style` if they
  have duplicated properties but are named differently.
* Fixes an issue where duplicated keyframes with the same name would cause
  an infinite loop.

# 1.0.2

* Improve module loading logic (thanks to @tunnckoCore).
* Improve minification of numeric values, with better support for `rem`,
  trailing zeroes and slash/comma separated values
  (thanks to @TrySound & @tunnckoCore).
* Fixed an issue where `-webkit-tap-highlight-color` values were being
  incorrectly transformed to `transparent`. This is not supported in Safari.
* Added support for viewport units (thanks to @TrySound).
* Add MIT license file.

# 1.0.1

* Add repository/author links to package.json.

# 1.0.0

* Initial release.
