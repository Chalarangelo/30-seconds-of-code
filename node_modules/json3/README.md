# 🚨 Unmaintained 🚨

<p class="banner">JSON 3 is **deprecated** and **no longer maintained**. Please don't use it in new projects, and migrate existing projects to use the native `JSON.parse` and `JSON.stringify` instead.</p>

Thanks to everyone who contributed patches or found it useful! ❤️

# JSON 3 #

 [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

**JSON 3** was a JSON polyfill for older JavaScript platforms.

## About ##

[JSON](http://json.org/) is a language-independent data interchange format based on a loose subset of the JavaScript grammar. Originally popularized by [Douglas Crockford](http://www.crockford.com/), the format was standardized in the [fifth edition](http://es5.github.io/) of the ECMAScript specification. The 5.1 edition, ratified in June 2011, incorporates several modifications to the grammar pertaining to the serialization of dates.

JSON 3 exposes two functions: `stringify()` for [serializing](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/JSON/stringify) a JavaScript value to JSON, and `parse()` for [producing](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/JSON/parse) a JavaScript value from a JSON source string. The JSON 3 parser uses recursive descent instead of `eval` and regular expressions, which makes it slower on older platforms compared to [JSON 2](http://json.org/js). The functions behave exactly as described in the ECMAScript spec, **except** for the date serialization discrepancy noted below.

The project is [hosted on GitHub](http://git.io/json3), along with the [unit tests](http://bestiejs.github.io/json3/test/test_browser.html). It is part of the [BestieJS](https://github.com/bestiejs) family, a collection of best-in-class JavaScript libraries that promote cross-platform support, specification precedents, unit testing, and plenty of documentation.

## Date Serialization

**JSON 3 deviates from the specification in one important way**: it does not define `Date#toISOString()` or `Date#toJSON()`. This preserves CommonJS compatibility and avoids polluting native prototypes. Instead, date serialization is performed internally by the `stringify()` implementation: if a date object does not define a custom `toJSON()` method, it is serialized as a [simplified ISO 8601 date-time string](http://es5.github.com/#x15.9.1.15).

**Several native `Date#toJSON()` implementations produce date time strings that do *not* conform to the grammar outlined in the spec**. In these environments, JSON 3 will override the native `stringify()` implementation. There is an [issue](https://github.com/bestiejs/json3/issues/73) on file to make these tests less strict.

Portions of the date serialization code are adapted from the [`date-shim`](https://github.com/Yaffle/date-shim) project.

# Usage #

## Web Browsers

    <script src="//cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>
    <script>
      JSON.stringify({"Hello": 123});
      // => '{"Hello":123}'
      JSON.parse("[[1, 2, 3], 1, 2, 3, 4]", function (key, value) {
        if (typeof value == "number") {
          value = value % 2 ? "Odd" : "Even";
        }
        return value;
      });
      // => [["Odd", "Even", "Odd"], "Odd", "Even", "Odd", "Even"]
    </script>

**When used in a web browser**, JSON 3 exposes an additional `JSON3` object containing the `noConflict()` and `runInContext()` functions, as well as aliases to the `stringify()` and `parse()` functions.

### `noConflict` and `runInContext`

* `JSON3.noConflict()` restores the original value of the global `JSON` object and returns a reference to the `JSON3` object.
* `JSON3.runInContext([context, exports])` initializes JSON 3 using the given `context` object (e.g., `window`, `global`, etc.), or the global object if omitted. If an `exports` object is specified, the `stringify()`, `parse()`, and `runInContext()` functions will be attached to it instead of a new object.

### Asynchronous Module Loaders

JSON 3 is defined as an [anonymous module](https://github.com/amdjs/amdjs-api/wiki/AMD#define-function-) for compatibility with [RequireJS](http://requirejs.org/), [`curl.js`](https://github.com/cujojs/curl), and other asynchronous module loaders.

    <script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.js"></script>
    <script>
      require({
        "paths": {
          "json3": "./path/to/json3"
        }
      }, ["json3"], function (JSON) {
        JSON.parse("[1, 2, 3]");
        // => [1, 2, 3]
      });
    </script>

To avoid issues with third-party scripts, **JSON 3 is exported to the global scope even when used with a module loader**. If this behavior is undesired, `JSON3.noConflict()` can be used to restore the global `JSON` object to its original value.

**Note:** If you intend to use JSON3 alongside another module, **please do not simply concatenate these modules together**, as that would cause multiple `define` calls in one script, resulting in errors in AMD loaders. The `r.js` build optimizer can be used instead if you need a single compressed file for production.

## CommonJS Environments

    var JSON3 = require("./path/to/json3");
    JSON3.parse("[1, 2, 3]");
    // => [1, 2, 3]

## JavaScript Engines

    load("path/to/json3.js");
    JSON.stringify({"Hello": 123, "Good-bye": 456}, ["Hello"], "\t");
    // => '{\n\t"Hello": 123\n}'

# Compatibility #

JSON 3 has been **tested** with the following web browsers, CommonJS environments, and JavaScript engines.

## Web Browsers

- Windows [Internet Explorer](http://windows.microsoft.com/en-us/internet-explorer/download-ie), version 6.0 and higher
- Google [Chrome](http://www.google.com/chrome), version 19.0 and higher
- Mozilla [Firefox](https://www.mozilla.org/en-US/firefox/new/), version 2.0 and higher
- Apple [Safari](http://www.apple.com/safari/), version 3.0 and higher
- [Opera](http://www.opera.com/) 8.54 and higher
- [SeaMonkey](http://www.seamonkey-project.org/) 1.0 and higher

## CommonJS Environments

- [Node](http://nodejs.org/) 0.6.21 and higher
- [io.js](https://iojs.org/) 1.0.3 and higher
- [RingoJS](http://ringojs.org/) 0.9 and higher
- [Narwhal](https://github.com/280north/narwhal) 0.3.2

## JavaScript Engines

- Mozilla [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) 1.7R3 and higher
- WebKit [JSC](https://trac.webkit.org/wiki/JSC)
- Google [V8](http://code.google.com/p/v8/)

## Known Incompatibilities

* Attempting to serialize the `arguments` object may produce inconsistent results across environments due to specification version differences. As a workaround, please convert the `arguments` object to an array first: `JSON.stringify([].slice.call(arguments, 0))`.

## Required Native Methods

JSON 3 assumes that the following methods exist and function as described in the ECMAScript specification:

- The `Number`, `String`, `Array`, `Object`, `Date`, `SyntaxError`, and `TypeError` constructors.
- `String.fromCharCode`
- `Object#toString`
- `Object#hasOwnProperty`
- `Function#call`
- `Math.floor`
- `Number#toString`
- `Date#valueOf`
- `String.prototype`: `indexOf`, `charCodeAt`, `charAt`, `slice`, `replace`.
- `Array.prototype`: `push`, `pop`, `join`.
