# 4.0.0-rc.0

* Breaking: Drops support for Node 0.12, we now require at least Node 4.
* Breaking: Update PostCSS to 6.0.0.
* Breaking: `stripWWW` is now set to `false` by default.

# 3.0.8

* Fixes `@namespace` URL conversion; now the semantics of the URL are preserved
  and only the `url(foo)` to `"foo"` optimisation is performed.

# 3.0.7

* Fix `main` field in `package.json`.

# 3.0.6

* Now compiled with Babel 6.

# 3.0.5

* Fixes an issue where base64 encoded OpenType font urls were being erroneously
  converted by the module (thanks to @ln-e).

# 3.0.4

* Fixes incorrect minification of empty non-url functions.

# 3.0.3

* Updates postcss-value-parser to version 3 (thanks to @TrySound).

# 3.0.2

* Fixes incorrect minification of chrome-extension urls.

# 3.0.1

* Bump postcss-value-parser to `2.0.2`.

# 3.0.0

* Upgraded to PostCSS 5.

# 2.1.3

* Replaces trim space nodes function with a built in method
  of postcss-value-parser.

# 2.1.2

* postcss-normalize-url now uses postcss-value-parser to iterate
  url values (thanks to @TrySound).
* Fixed `@namespace` URL reduction behaviour. (thanks to @TrySound).

# 2.1.1

* Increased performance by using a single call to `eachInside` rather than two.

# 2.1.0

* Adds `keepWWW` option.
* Compatibility fixes for `is-absolute-url@2.0.0`.

# 2.0.3

* Fixes an issue where embedded base 64 data was being converted as if it were
  a URL.

# 2.0.2

* Addresses an issue where relative path separators were converted to
  backslashes on Windows.

# 2.0.1

* Documentation/metadata tweaks for plugin guidelines compatibility.
* Bump css-list to 0.1.0, use instead of postcss.list.space for namespace
  rule normalization.

# 2.0.0

* Improved URL detection when using two or more in the same declaration.
* node 0.10 is no longer supported.

# 1.2.1

* Patch to address incorrect transformation of `@document` rules.

# 1.2.0

* Fixes an issue where options could not be passed through.
* Support for normalising URLs in `@namespace` rules.

# 1.1.0

* Now uses the PostCSS `4.1` plugin API.

# 1.0.2

* Adds a JSHint config, code tidied up.

# 1.0.1

* Bug fix; does not transform embedded base 64 or svg images.

# 1.0.0

* Initial release.
