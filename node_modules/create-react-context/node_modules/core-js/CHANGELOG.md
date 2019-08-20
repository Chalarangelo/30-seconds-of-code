## Changelog
##### 1.2.7 [LEGACY] - 2016.07.18
* some fixes for issues like #159, #186, #194, #207

##### 1.2.6 - 2015.11.09
* reject with `TypeError` on attempt resolve promise itself
* correct behavior with broken `Promise` subclass constructors / methods
* added `Promise`-based fallback for microtask
* fixed V8 and FF `Array#{values, @@iterator}.name`
* fixed IE7- `[1, 2].join(undefined) -> '1,2'`
* some other fixes / improvements / optimizations

##### 1.2.5 - 2015.11.02
* some more `Number` constructor fixes:
  * fixed V8 ~ Node 0.8 bug: `Number('+0x1')` should be `NaN`
  * fixed `Number(' 0b1\n')` case, should be `1`
  * fixed `Number()` case, should be `0`

##### 1.2.4 - 2015.11.01
* fixed `Number('0b12') -> NaN` case in the shim
* fixed V8 ~ Chromium 40- bug - `Weak(Map|Set)#{delete, get, has}` should not throw errors [#124](https://github.com/zloirock/core-js/issues/124)
* some other fixes and optimizations

##### 1.2.3 - 2015.10.23
* fixed some problems related old V8 bug `Object('a').propertyIsEnumerable(0) // => false`, for example, `Object.assign({}, 'qwe')` from the last release
* fixed `.name` property and `Function#toString` conversion some polyfilled methods
* fixed `Math.imul` arity in Safari 8-

##### 1.2.2 - 2015.10.18
* improved optimisations for V8
* fixed build process from external packages, [#120](https://github.com/zloirock/core-js/pull/120)
* one more `Object.{assign, values, entries}` fix for [**very** specific case](https://github.com/ljharb/proposal-object-values-entries/issues/5)

##### 1.2.1 - 2015.10.02
* replaced fix `JSON.stringify` + `Symbol` behavior from `.toJSON` method to wrapping `JSON.stringify` - little more correct, [compat-table/642](https://github.com/kangax/compat-table/pull/642)
* fixed typo which broke tasks scheduler in WebWorkers in old FF, [#114](https://github.com/zloirock/core-js/pull/114)

##### 1.2.0 - 2015.09.27
* added browser [`Promise` rejection hook](#unhandled-rejection-tracking), [#106](https://github.com/zloirock/core-js/issues/106)
* added correct [`IsRegExp`](http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp) logic to [`String#{includes, startsWith, endsWith}`](https://github.com/zloirock/core-js/#ecmascript-6-string) and [`RegExp` constructor](https://github.com/zloirock/core-js/#ecmascript-6-regexp), `@@match` case, [example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match#Disabling_the_isRegExp_check)
* updated [`String#leftPad`](https://github.com/zloirock/core-js/#ecmascript-7) [with proposal](https://github.com/ljharb/proposal-string-pad-left-right/issues/6): string filler truncated from the right side
* replaced V8 [`Object.assign`](https://github.com/zloirock/core-js/#ecmascript-6-object) - its properties order not only [incorrect](https://github.com/sindresorhus/object-assign/issues/22), it is non-deterministic and it causes some problems
* fixed behavior with deleted in getters properties for `Object.{`[`assign`](https://github.com/zloirock/core-js/#ecmascript-6-object)`, `[`entries, values`](https://github.com/zloirock/core-js/#ecmascript-7)`}`, [example](http://goo.gl/iQE01c)
* fixed [`Math.sinh`](https://github.com/zloirock/core-js/#ecmascript-6-math) with very small numbers in V8 near Chromium 38
* some other fixes and optimizations

##### 1.1.4 - 2015.09.05
* fixed support symbols in FF34-35 [`Object.assign`](https://github.com/zloirock/core-js/#ecmascript-6-object)
* fixed [collections iterators](https://github.com/zloirock/core-js/#ecmascript-6-iterators) in FF25-26
* fixed non-generic WebKit [`Array.of`](https://github.com/zloirock/core-js/#ecmascript-6-array)
* some other fixes and optimizations

##### 1.1.3 - 2015.08.29
* fixed support Node.js domains in [`Promise`](https://github.com/zloirock/core-js/#ecmascript-6-promise), [#103](https://github.com/zloirock/core-js/issues/103)

##### 1.1.2 - 2015.08.28
* added `toJSON` method to [`Symbol`](https://github.com/zloirock/core-js/#ecmascript-6-symbol) polyfill and to MS Edge implementation for expected `JSON.stringify` result w/o patching this method
* replaced [`Reflect.construct`](https://github.com/zloirock/core-js/#ecmascript-6-reflect) implementations w/o correct support third argument
* fixed `global` detection with changed `document.domain` in ~IE8, [#100](https://github.com/zloirock/core-js/issues/100)

##### 1.1.1 - 2015.08.20
* added more correct microtask implementation for [`Promise`](#ecmascript-6-promise)

##### 1.1.0 - 2015.08.17
* updated [string padding](https://github.com/zloirock/core-js/#ecmascript-7) to [actual proposal](https://github.com/ljharb/proposal-string-pad-left-right) - renamed, minor internal changes:
  * `String#lpad` -> `String#padLeft`
  * `String#rpad` -> `String#padRight`
* added [string trim functions](#ecmascript-7) - [proposal](https://github.com/sebmarkbage/ecmascript-string-left-right-trim), defacto standard - required only for IE11- and fixed for some old engines:
  * `String#trimLeft`
  * `String#trimRight`
* [`String#trim`](https://github.com/zloirock/core-js/#ecmascript-6-string) fixed for some engines by es6 spec and moved from `es5` to single `es6` module
* splitted [`es6.object.statics-accept-primitives`](https://github.com/zloirock/core-js/#ecmascript-6-object)
* caps for `freeze`-family `Object` methods moved from `es5` to `es6` namespace and joined with [es6 wrappers](https://github.com/zloirock/core-js/#ecmascript-6-object)
* `es5` [namespace](https://github.com/zloirock/core-js/#commonjs) also includes modules, moved to `es6` namespace - you can use it as before
* increased `MessageChannel` priority in `$.task`, [#95](https://github.com/zloirock/core-js/issues/95)
* does not get `global.Symbol` on each getting iterator, if you wanna use alternative `Symbol` shim - add it before `core-js`
* [`Reflect.construct`](https://github.com/zloirock/core-js/#ecmascript-6-reflect) optimized and fixed for some cases
* simplified [`Reflect.enumerate`](https://github.com/zloirock/core-js/#ecmascript-6-reflect), see [this question](https://esdiscuss.org/topic/question-about-enumerate-and-property-decision-timing)
* some corrections in [`Math.acosh`](https://github.com/zloirock/core-js/#ecmascript-6-math)
* fixed [`Math.imul`](https://github.com/zloirock/core-js/#ecmascript-6-math) for old WebKit
* some fixes in string / RegExp [well-known symbols](https://github.com/zloirock/core-js/#ecmascript-6-regexp) logic
* some other fixes and optimizations

##### 1.0.1 - 2015.07.31
* some fixes for final MS Edge, replaced broken native `Reflect.defineProperty`
* some minor fixes and optimizations
* changed compression `client/*.min.js` options for safe `Function#name` and `Function#length`, should be fixed [#92](https://github.com/zloirock/core-js/issues/92)

##### 1.0.0 - 2015.07.22
* added logic for [well-known symbols](https://github.com/zloirock/core-js/#ecmascript-6-regexp):
  * `Symbol.match`
  * `Symbol.replace`
  * `Symbol.split`
  * `Symbol.search`
* actualized and optimized work with iterables:
  * optimized  [`Map`, `Set`, `WeakMap`, `WeakSet` constructors](https://github.com/zloirock/core-js/#ecmascript-6-collections), [`Promise.all`, `Promise.race`](https://github.com/zloirock/core-js/#ecmascript-6-promise) for default `Array Iterator`
  * optimized  [`Array.from`](https://github.com/zloirock/core-js/#ecmascript-6-array) for default `Array Iterator`
  * added [`core.getIteratorMethod`](https://github.com/zloirock/core-js/#ecmascript-6-iterators) helper
* uses enumerable properties in shimmed instances - collections, iterators, etc for optimize performance
* added support native constructors to [`Reflect.construct`](https://github.com/zloirock/core-js/#ecmascript-6-reflect) with 2 arguments
* added support native constructors to [`Function#bind`](https://github.com/zloirock/core-js/#ecmascript-5) shim with `new`
* removed obsolete `.clear` methods native [`Weak`-collections](https://github.com/zloirock/core-js/#ecmascript-6-collections)
* maximum modularity, reduced minimal custom build size, separated into submodules:
  * [`es6.reflect`](https://github.com/zloirock/core-js/#ecmascript-6-reflect)
  * [`es6.regexp`](https://github.com/zloirock/core-js/#ecmascript-6-regexp)
  * [`es6.math`](https://github.com/zloirock/core-js/#ecmascript-6-math)
  * [`es6.number`](https://github.com/zloirock/core-js/#ecmascript-6-number)
  * [`es7.object.to-array`](https://github.com/zloirock/core-js/#ecmascript-7)
  * [`core.object`](https://github.com/zloirock/core-js/#object)
  * [`core.string`](https://github.com/zloirock/core-js/#escaping-html)
  * [`core.iter-helpers`](https://github.com/zloirock/core-js/#ecmascript-6-iterators)
  * internal modules (`$`, `$.iter`, etc)
* many other optimizations
* final cleaning non-standard features
  * moved `$for` to [separate library](https://github.com/zloirock/forof). This work for syntax - `for-of` loop and comprehensions
  * moved `Date#{format, formatUTC}` to [separate library](https://github.com/zloirock/dtf). Standard way for this - `ECMA-402`
  * removed `Math` methods from `Number.prototype`. Slight sugar for simple `Math` methods calling
  * removed `{Array#, Array, Dict}.turn`
  * removed `core.global`
* uses `ToNumber` instead of `ToLength` in [`Number Iterator`](https://github.com/zloirock/core-js/#number-iterator), `Array.from(2.5)` will be `[0, 1, 2]` instead of `[0, 1]`
* fixed [#85](https://github.com/zloirock/core-js/issues/85) - invalid `Promise` unhandled rejection message in nested `setTimeout`
* fixed [#86](https://github.com/zloirock/core-js/issues/86) - support FF extensions
* fixed [#89](https://github.com/zloirock/core-js/issues/89) - behavior `Number` constructor in strange case

##### 0.9.18 - 2015.06.17
* removed `/` from [`RegExp.escape`](https://github.com/zloirock/core-js/#ecmascript-7) escaped characters

##### 0.9.17 - 2015.06.14
* updated [`RegExp.escape`](https://github.com/zloirock/core-js/#ecmascript-7) to the [latest proposal](https://github.com/benjamingr/RexExp.escape)
* fixed conflict with webpack dev server + IE buggy behavior

##### 0.9.16 - 2015.06.11
* more correct order resolving thenable in [`Promise`](https://github.com/zloirock/core-js/#ecmascript-6-promise) polyfill
* uses polyfill instead of [buggy V8 `Promise`](https://github.com/zloirock/core-js/issues/78)

##### 0.9.15 - 2015.06.09
* [collections](https://github.com/zloirock/core-js/#ecmascript-6-collections) from `library` version return wrapped native instances
* fixed collections prototype methods in `library` version
* optimized [`Math.hypot`](https://github.com/zloirock/core-js/#ecmascript-6-math)

##### 0.9.14 - 2015.06.04
* updated [`Promise.resolve` behavior](https://esdiscuss.org/topic/fixing-promise-resolve)
* added fallback for IE11 buggy `Object.getOwnPropertyNames` + iframe
* some other fixes

##### 0.9.13 - 2015.05.25
* added fallback for [`Symbol` polyfill](https://github.com/zloirock/core-js/#ecmascript-6-symbol) for old Android
* some other fixes

##### 0.9.12 - 2015.05.24
* different instances `core-js` should use / recognize the same symbols
* some fixes

##### 0.9.11 - 2015.05.18
* simplified [custom build](https://github.com/zloirock/core-js/#custom-build)
  * add custom build js api
  * added `grunt-cli` to `devDependencies` for `npm run grunt`
* some fixes

##### 0.9.10 - 2015.05.16
* wrapped `Function#toString` for correct work wrapped methods / constructors with methods similar to the [`lodash` `isNative`](https://github.com/lodash/lodash/issues/1197)
* added proto versions of methods to export object in `default` version for consistency with `library` version

##### 0.9.9 - 2015.05.14
* wrapped `Object#propertyIsEnumerable` for [`Symbol` polyfill](https://github.com/zloirock/core-js/#ecmascript-6-symbol)
* [added proto versions of methods to `library` for ES7 bind syntax](https://github.com/zloirock/core-js/issues/65)
* some other fixes

##### 0.9.8 - 2015.05.12
* fixed [`Math.hypot`](https://github.com/zloirock/core-js/#ecmascript-6-math) with negative arguments
* added `Object#toString.toString` as fallback for [`lodash` `isNative`](https://github.com/lodash/lodash/issues/1197)

##### 0.9.7 - 2015.05.07
* added [support DOM collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#Streamlining_cross-browser_behavior) to IE8- `Array#slice`

##### 0.9.6 - 2015.05.01
* added [`String#lpad`, `String#rpad`](https://github.com/zloirock/core-js/#ecmascript-7)

##### 0.9.5 - 2015.04.30
* added cap for `Function#@@hasInstance`
* some fixes and optimizations

##### 0.9.4 - 2015.04.27
* fixed `RegExp` constructor

##### 0.9.3 - 2015.04.26
* some fixes and optimizations

##### 0.9.2 - 2015.04.25
* more correct [`Promise`](https://github.com/zloirock/core-js/#ecmascript-6-promise) unhandled rejection tracking and resolving / rejection priority

##### 0.9.1 - 2015.04.25
* fixed `__proto__`-based [`Promise`](https://github.com/zloirock/core-js/#ecmascript-6-promise) subclassing in some environments

##### 0.9.0 - 2015.04.24
* added correct [symbols](https://github.com/zloirock/core-js/#ecmascript-6-symbol) descriptors
  * fixed behavior `Object.{assign, create, defineProperty, defineProperties, getOwnPropertyDescriptor, getOwnPropertyDescriptors}` with symbols
  * added [single entry points](https://github.com/zloirock/core-js/#commonjs) for `Object.{create, defineProperty, defineProperties}`
* added [`Map#toJSON`](https://github.com/zloirock/core-js/#ecmascript-7)
* removed non-standard methods `Object#[_]` and `Function#only` - they solves syntax problems, but now in compilers available arrows and ~~in near future will be available~~ [available](http://babeljs.io/blog/2015/05/14/function-bind/) [bind syntax](https://github.com/zenparsing/es-function-bind)
* removed non-standard undocumented methods `Symbol.{pure, set}`
* some fixes and internal changes

##### 0.8.4 - 2015.04.18
* uses `webpack` instead of `browserify` for browser builds - more compression-friendly result

##### 0.8.3 - 2015.04.14
* fixed `Array` statics with single entry points

##### 0.8.2 - 2015.04.13
* [`Math.fround`](https://github.com/zloirock/core-js/#ecmascript-6-math) now also works in IE9-
* added [`Set#toJSON`](https://github.com/zloirock/core-js/#ecmascript-7)
* some optimizations and fixes

##### 0.8.1 - 2015.04.03
* fixed `Symbol.keyFor`

##### 0.8.0 - 2015.04.02
* changed [CommonJS API](https://github.com/zloirock/core-js/#commonjs)
* splitted and renamed some modules
* added support ES3 environment (ES5 polyfill) to **all** default versions - size increases slightly (+ ~4kb w/o gzip), many issues disappear, if you don't need it - [simply include only required namespaces / features / modules](https://github.com/zloirock/core-js/#commonjs)
* removed [abstract references](https://github.com/zenparsing/es-abstract-refs) support - proposal has been superseded =\
* [`$for.isIterable` -> `core.isIterable`, `$for.getIterator` -> `core.getIterator`](https://github.com/zloirock/core-js/#ecmascript-6-iterators), temporary available in old namespace
* fixed iterators support in v8 `Promise.all` and `Promise.race`
* many other fixes

##### 0.7.2 - 2015.03.09
* some fixes

##### 0.7.1 - 2015.03.07
* some fixes

##### 0.7.0 - 2015.03.06
* rewritten and splitted into [CommonJS modules](https://github.com/zloirock/core-js/#commonjs)

##### 0.6.1 - 2015.02.24
* fixed support [`Object.defineProperty`](https://github.com/zloirock/core-js/#ecmascript-5) with accessors on DOM elements on IE8

##### 0.6.0 - 2015.02.23
* added support safe closing iteration - calling `iterator.return` on abort iteration, if it exists
* added basic support [`Promise`](https://github.com/zloirock/core-js/#ecmascript-6-promise) unhandled rejection tracking in shim
* added [`Object.getOwnPropertyDescriptors`](https://github.com/zloirock/core-js/#ecmascript-7)
* removed `console` cap - creates too many problems - you can use [`core.log`](https://github.com/zloirock/core-js/#console) module as that
* restructuring [namespaces](https://github.com/zloirock/core-js/#custom-build)
* some fixes

##### 0.5.4 - 2015.02.15
* some fixes

##### 0.5.3 - 2015.02.14
* added [support binary and octal literals](https://github.com/zloirock/core-js/#ecmascript-6-number) to `Number` constructor
* added [`Date#toISOString`](https://github.com/zloirock/core-js/#ecmascript-5)

##### 0.5.2 - 2015.02.10
* some fixes

##### 0.5.1 - 2015.02.09
* some fixes

##### 0.5.0 - 2015.02.08
* systematization of modules
* splitted [`es6` module](https://github.com/zloirock/core-js/#ecmascript-6)
* splitted [`console` module](https://github.com/zloirock/core-js/#console): `web.console` - only cap for missing methods, `core.log` - bound methods & additional features
* added [`delay` method](https://github.com/zloirock/core-js/#delay)
* some fixes

##### 0.4.10 - 2015.01.28
* [`Object.getOwnPropertySymbols`](https://github.com/zloirock/core-js/#ecmascript-6-symbol) polyfill returns array of wrapped keys

##### 0.4.9 - 2015.01.27
* FF20-24 fix

##### 0.4.8 - 2015.01.25
* some [collections](https://github.com/zloirock/core-js/#ecmascript-6-collections) fixes

##### 0.4.7 - 2015.01.25
* added support frozen objects as [collections](https://github.com/zloirock/core-js/#ecmascript-6-collections) keys

##### 0.4.6 - 2015.01.21
* added [`Object.getOwnPropertySymbols`](https://github.com/zloirock/core-js/#ecmascript-6-symbol)
* added [`NodeList.prototype[@@iterator]`](https://github.com/zloirock/core-js/#ecmascript-6-iterators)
* added basic `@@species` logic - getter in native constructors
* removed `Function#by`
* some fixes

##### 0.4.5 - 2015.01.16
* some fixes

##### 0.4.4 - 2015.01.11
* enabled CSP support

##### 0.4.3 - 2015.01.10
* added `Function` instances `name` property for IE9+

##### 0.4.2 - 2015.01.10
* `Object` static methods accept primitives
* `RegExp` constructor can alter flags (IE9+)
* added `Array.prototype[Symbol.unscopables]`

##### 0.4.1 - 2015.01.05
* some fixes

##### 0.4.0 - 2015.01.03
* added [`es6.reflect`](https://github.com/zloirock/core-js/#ecmascript-6-reflect) module:
  * added `Reflect.apply`
  * added `Reflect.construct`
  * added `Reflect.defineProperty`
  * added `Reflect.deleteProperty`
  * added `Reflect.enumerate`
  * added `Reflect.get`
  * added `Reflect.getOwnPropertyDescriptor`
  * added `Reflect.getPrototypeOf`
  * added `Reflect.has`
  * added `Reflect.isExtensible`
  * added `Reflect.preventExtensions`
  * added `Reflect.set`
  * added `Reflect.setPrototypeOf`
* `core-js` methods now can use external `Symbol.iterator` polyfill
* some fixes

##### 0.3.3 - 2014.12.28
* [console cap](https://github.com/zloirock/core-js/#console) excluded from node.js default builds

##### 0.3.2 - 2014.12.25
* added cap for [ES5](https://github.com/zloirock/core-js/#ecmascript-5) freeze-family methods
* fixed `console` bug

##### 0.3.1 - 2014.12.23
* some fixes

##### 0.3.0 - 2014.12.23
* Optimize [`Map` & `Set`](https://github.com/zloirock/core-js/#ecmascript-6-collections):
  * use entries chain on hash table
  * fast & correct iteration
  * iterators moved to [`es6`](https://github.com/zloirock/core-js/#ecmascript-6) and [`es6.collections`](https://github.com/zloirock/core-js/#ecmascript-6-collections) modules

##### 0.2.5 - 2014.12.20
* `console` no longer shortcut for `console.log` (compatibility problems)
* some fixes

##### 0.2.4 - 2014.12.17
* better compliance of ES6
* added [`Math.fround`](https://github.com/zloirock/core-js/#ecmascript-6-math) (IE10+)
* some fixes

##### 0.2.3 - 2014.12.15
* [Symbols](https://github.com/zloirock/core-js/#ecmascript-6-symbol):
  * added option to disable addition setter to `Object.prototype` for Symbol polyfill:
    * added `Symbol.useSimple`
    * added `Symbol.useSetter`
  * added cap for well-known Symbols:
    * added `Symbol.hasInstance`
    * added `Symbol.isConcatSpreadable`
    * added `Symbol.match`
    * added `Symbol.replace`
    * added `Symbol.search`
    * added `Symbol.species`
    * added `Symbol.split`
    * added `Symbol.toPrimitive`
    * added `Symbol.unscopables`

##### 0.2.2 - 2014.12.13
* added [`RegExp#flags`](https://github.com/zloirock/core-js/#ecmascript-6-regexp) ([December 2014 Draft Rev 29](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#december_6_2014_draft_rev_29))
* added [`String.raw`](https://github.com/zloirock/core-js/#ecmascript-6-string)

##### 0.2.1 - 2014.12.12
* repair converting -0 to +0 in [native collections](https://github.com/zloirock/core-js/#ecmascript-6-collections)

##### 0.2.0 - 2014.12.06
* added [`es7.proposals`](https://github.com/zloirock/core-js/#ecmascript-7) and [`es7.abstract-refs`](https://github.com/zenparsing/es-abstract-refs) modules
* added [`String#at`](https://github.com/zloirock/core-js/#ecmascript-7)
* added real [`String Iterator`](https://github.com/zloirock/core-js/#ecmascript-6-iterators), older versions used Array Iterator
* added abstract references support:
  * added `Symbol.referenceGet`
  * added `Symbol.referenceSet`
  * added `Symbol.referenceDelete`
  * added `Function#@@referenceGet`
  * added `Map#@@referenceGet`
  * added `Map#@@referenceSet`
  * added `Map#@@referenceDelete`
  * added `WeakMap#@@referenceGet`
  * added `WeakMap#@@referenceSet`
  * added `WeakMap#@@referenceDelete`
  * added `Dict.{...methods}[@@referenceGet]`
* removed deprecated `.contains` methods
* some fixes

##### 0.1.5 - 2014.12.01
* added [`Array#copyWithin`](https://github.com/zloirock/core-js/#ecmascript-6-array)
* added [`String#codePointAt`](https://github.com/zloirock/core-js/#ecmascript-6-string)
* added [`String.fromCodePoint`](https://github.com/zloirock/core-js/#ecmascript-6-string)

##### 0.1.4 - 2014.11.27
* added [`Dict.mapPairs`](https://github.com/zloirock/core-js/#dict)

##### 0.1.3 - 2014.11.20
* [TC39 November meeting](https://github.com/rwaldron/tc39-notes/tree/master/es6/2014-11):
  * [`.contains` -> `.includes`](https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-11/nov-18.md#51--44-arrayprototypecontains-and-stringprototypecontains)
    * `String#contains` -> [`String#includes`](https://github.com/zloirock/core-js/#ecmascript-6-string)
    * `Array#contains` -> [`Array#includes`](https://github.com/zloirock/core-js/#ecmascript-7)
    * `Dict.contains` -> [`Dict.includes`](https://github.com/zloirock/core-js/#dict)
  * [removed `WeakMap#clear`](https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-11/nov-19.md#412-should-weakmapweakset-have-a-clear-method-markm)
  * [removed `WeakSet#clear`](https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-11/nov-19.md#412-should-weakmapweakset-have-a-clear-method-markm)

##### 0.1.2 - 2014.11.19
* `Map` & `Set` bug fix

##### 0.1.1 - 2014.11.18
* public release