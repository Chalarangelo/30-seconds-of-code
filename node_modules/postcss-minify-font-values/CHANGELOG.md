# 4.0.0-rc.0

* Breaking: Drops support for Node 0.12, we now require at least Node 4.
* Breaking: Update PostCSS to 6.0.0.
* Breaking: `removeAfterKeyword` is now set to `false` by default. This is to
  avoid incorrectly discarding emoji font families.
* Removed support for compressing whitespace, this is now delegated to
  postcss-normalize-whitespace.

# 1.0.5

* Resolves an issue where `var` would be removed from `font-family`
  values (@ben-eb).

# 1.0.4

* Ignores duplicated `monospace` definitions (@ben-eb).

# 1.0.3

* Resolves an issue where the module would remove quotes from font families
  that began with numbers (@ben-eb).

# 1.0.2

* Upgraded postcss-value-parser to version 3 (@TrySound).

# 1.0.1

* Add repository link to `package.json` (@TrySound).

# 1.0.0

* Initial release (@TrySound).
