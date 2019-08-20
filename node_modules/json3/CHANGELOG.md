# JSON 3 Releases

## 3.3.2

### 2014-06-22

 * Test the minified version on Travis [Issue #35].
 * Add a change log and contribution guidelines [Issue #55].
 * Include the minified version in the npm package [Issue #59].
 * Simplify `bower.json`.

## 3.3.1

### 2014-04-08

 * Reduce the Bower package size by lazily downloading the Closure Compiler [Issue #54].
 * Make `JSON3.noConflict()` idempotent [Issue #56].
 * Improve AMD `define` pragma detection before minifying.
 * Support [`node-webkit`](https://github.com/rogerwang/node-webkit) and web workers.

## 3.3.0

### 2014-01-20

 * Export a `JSON3` global in browsers and JavaScript engines.
 * Add `JSON3.noConflict()` and `JSON3.runInContext()` [Issue #50].
 * Add a post-minification step to remove multiple IIFE wrappers.
 * Optimize `quote`.

## 3.2.6

### 2013-10-25

 * Add Travis CI integration.
 * Support [Bower](http://bower.io/), [Component](https://component.github.io/), [Jam](http://jamjs.org/), and [Volo](http://volojs.org/).
 * Test with Node, PhantomJS, RingoJS, Rhino, and Narwhal on Travis.
 * Simplify exports.
 * `stringify()` optimizations.
 * Add a `?minified` query parameter to the browser harness for testing the minified version [Issue #35].
 * Detect trailing comma and trailing decimal extensions in Rhino 1.7R3-R4 [Issue #46].

## 3.2.5

### 2013-06-14

 * Use `object.hasOwnProperty(prop)` instead of `Object#hasOwnProperty.call(object, prop)` when iterating over host objects [Issue #18].
 * Minification improvements; avoid munging the AMD `define` pragma [Issue #22; PR #25].
 * Use character codes instead of strings in `lex()`. Optimize for valid source strings [Issue #23; PR #27].
 * Support Adobe ExtendScript [Issue #29].
 * Handle serializing ExtendScript host objects that throw exceptions [Issue #30; PR #31].
 * Support Browserify and RequireJS by exporting for CommonJS and AMD [PR #33].
 * Use square bracket character access in `parse`. Add a `charIndexBuggy` flag.
 * Add a benchmark suite.

## 3.2.4

### 2012-10-11

 * Change the export order to prefer `module.exports`, `exports`, and then `define` [PR #14].
 * Avoid conflating duplicate properties and circular references [Issue #15].
 * Export `parse` and `stringify` globally even if an AMD loader is present [PR #17].
 * Isolate the feature tests into a `has()` function for [`has.js`](https://github.com/phiggins42/has.js) compatibility [Issue #19].

## 3.2.3

### 2012-07-13

 * Prototype <= 1.6.1 compatibility [Issue #8].
 * `stringify()`: Iterate over whitelisted properties in order [Issue #12].
 * Correctly detect trailing commas in array literals.

## 3.2.2

### 2012-05-05

 * Correctly detect native `parse()` implementations in AMD loaders and CommonJS environments [Issue #9].
 * `parse()`: Use `delete` instead of `Array#splice()` when removing elements from traversed arrays [Issue #10].
 * Detect `parse()` number grammar extensions in IE 9 [Issue #11].

## 3.2.1

### 2012-04-26

 * Reduce the file size by removing parse error strings [Issue #5].
 * Fall back to the native `stringify()` and `parse()` implementations in AMD loaders and CommonJS environments [Issue #6].
 * Use the correct global object when exporting for browsers and JavaScript engines.
 * Support building on Windows by using `zlib` instead of shelling out to `gzip`.
 * Switch to the Closure Compiler for generating the minified version.
 * [`r.js`](http://requirejs.org/docs/optimization.html) compatibility.
 * Safari < 2.0.2 and Opera >= 10.53 support.

## 3.2.0

### 2012-04-15

 * Override native `stringify()` implementations to work around date serialization bugs.
 * Ensure the date serialization tests pass in all time zones [Issue #3].
 * Add a workaround for buggy `Date#getUTC{FullYear, Month, Date}` implementations in Opera > 9.64 [Issue #4].
 * Ensure Firefox <= 11.0 serializes negative years as six-digit extended years.
 * Ensure Safari <= 5.1.5 serializes milliseconds correctly.
 * Add a Node-based build script.
 * Vendor all dependencies.
 * Opera 7.54u2 support.

## 3.1.0

### 2012-03-22

 * Switched to `bestiejs` organisation
 * Added support for a list of properties as the `filter` argument for `JSON.stringify`
 * Fixed Firefox 4 and 4.0.1 allowing non-standard extensions to `JSON.parse`

## 3.0.0

### 2012-03-20

 * Renamed `JSON3` to `JSON`
 * Removed `JSON3.Version`
 * Added minified version of library
 * Created a [GitHub Project Page](http://bestiejs.github.io/json3)
 * Preserved alphanumeric order when iterating over shadowed properties on objects

## 0.8.5

### 2012-03-16

 * Avoided relying on native functions `Math.abs`, and `isFinite`, and native constructors `String`, `Number`, `Object`, and `Array`
 * Fixed AMD export logic

## 0.8.0

### 2012-03-15

 * Renamed `Prim` to `JSON3`
 * Added `JSON3.Version`
 * Added support for AMD lodaers as the `"json"` module
 * Added feature tests for native `JSON` implementations
 * Added string coercion for the `source` argument in `JSON3.parse`
 * Fixed the date serialization routine in `JSON3.stringify`

## 0.5.0

### 2012-02-18

 * Fixed `Prim.stringify`’s handling of the `width` argument
 * Added Microsoft’s [ES5 Conformance Tests](https://es5conform.codeplex.com/) to the test suite

## 0.2.0

### 2012-02-17

 * Added `Prim.stringify` for serializing values
 * Renamed `Prim.Escapes` to `Prim.Unescapes`
 * Disallowed unescaped tab characters in strings passed to `Prim.parse`

## 0.1.0

### 2012-02-16

 * Initial release of Prim
