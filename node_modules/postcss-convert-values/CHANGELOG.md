# 4.0.0-rc.0

* Breaking: Drops support for Node 0.12, we now require at least Node 4.
* Breaking: Update PostCSS to 6.0.0.
* Breaking: Removes the deprecated options from version 2.2.0.

# 2.6.1

* Resolves an issue where IE hacks were being removed from `0` values
  (thanks to @Justineo).

# 2.6.0

* Added clamping of the values for the `shape-image-threshold` property, using
  the same logic as introduced in version `2.5.0`.

# 2.5.0

* Added clamping of the values for the `opacity` property to the `0-1` range.
  For example, this will convert `opacity: 1.1` to `opacity: 1`.

# 2.4.1

* Resolves an issue where the units would be stripped from zero values in
  custom properties (thanks to @jgerigmeyer).

# 2.4.0

* Added a `precision` option to enable rounding of decimal places for
  `px` values.

# 2.3.6

* Resolves an issue with the last patch where `height: 0em` was not being
  converted to `height: 0`.

# 2.3.5

* Resolves an issue where certain properties inside `@keyframes` rules would
  break animation in IE due to the percentage being stripped. Now, the
  percentage is preserved for these properties.

# 2.3.4

* Does not convert `height:0%` to `height:0` (and the same for `max-height`), as
  they produce different results.

# 2.3.3

* Updates postcss-value-parser to version 3 (thanks to @TrySound).

# 2.3.2

* Fixed a regression where `0%` in color functions was being transformed to `0`
  (thanks to @TrySound).

# 2.3.1

* Fixed a behaviour where `0deg` was being converted to `0`.

# 2.3.0

* Added an option to convert between `turn` & `deg` (thanks to @TrySound).

# 2.2.1

* Fixes a behaviour where the module would remove units from zero values inside
  calc functions (thanks to @marek-saji & @TrySound).

# 2.2.0

* Renames `opts.convertLength` & `opts.convertTime` to
  `opts.length` & `opts.time`; the old options will now print deprecation
  warnings (thanks to @TrySound).

# 2.1.0

* Adds options to enable/disable unit conversion for time & length values.

# 2.0.1

* Bump postcss-value-parser to `2.0.2`.

# 2.0.0

* Upgraded to PostCSS 5.

# 1.3.1

* Fixes an issue where the module would convert values in gradient/url functions
  since 1.3.0.

# 1.3.0

* Converted the module to use ES6.
* balanced-match, css-list & some integrated code has been replaced with
  postcss-value-parser; reducing the number of moving parts in this module, and
  providing a more futureproof way of parsing CSS numeric values.

# 1.2.5

* Fixes an issue where uppercase units (such as PX) were being deleted.

# 1.2.4

* Fixes convert not px or ms

# 1.2.3

* Adds support for `ch` units; previously they were removed.
* Upgrades css-list to `0.1.0`, code tidied up.

# 1.2.2

* Added support for viewport units (thanks to @TrySound).

# 1.2.1

* Fixes regressions introduced by the previous patch. Better support for
  negative value transforms.

# 1.2.0

* Adds support for slash/comma separated values (thanks to @TrySound).

# 1.1.1

* Fixes an issue where trailing zeroes were not being removed in
  values that were not `0` (thanks to @TrySound).

# 1.1.0

* Adds support for removing leading zeroes from `rem` values
  (thanks to @tunnckoCore).

# 1.0.3

* Fixed a bug where filenames were being incorrectly transformed.

# 1.0.2

* Fixed a bug where `1.` and `.0` were not being optimised to `1` and `0`,
  respectively.

# 1.0.1

* Fixed a bug where `undefined` would be stringified as the unit value, if the
  value did not have a unit.

# 1.0.0

* Initial release.
