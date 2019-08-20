# 4.0.0-rc.0

* Breaking: Drops support for Node 0.12, we now require at least Node 4.
* Breaking: Update PostCSS to 6.0.0.

# 1.1.1

* Performance tweaks; test that `node.parent` is equal to the AST rather than
  checking its type is `root`, and use the AST directly to prepend the
  `@charset` to, rather than using the superfluous `root()` method.

# 1.1.0

* Added `add` option (thanks to @ben-eb)

# 1.0.0

* Initial release.
