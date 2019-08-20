## 1.6.2 (2019-8-11)

* Update package metadata.
* Update deps to fix security audit.

## 1.6.1 (2018-8-8)

* Update deps to fix security audit.

## 1.6.0 (2018-8-8)

* Replace functions when merging (`merge()` and `mergeDeep()`) [#25, @hipstersmoothie]

## 1.5.0 (2018-7-23)

* Add TypeScript definitions [#23, @grrowl]

## 1.4.2 (2018-3-29)

* Support Symbol properties in objects.

## 1.4.1 (2018-1-2)

* Add `mergeDeep()` benchmarks [#16, @dentrado]
* doSetIn: ensure nested value is object [#17, @petermikitsh]

## 1.4.0 (2017-10-25)

* Add **mergeDeep()** [#14, @dentrado]
* Update benchmarks to reflect current versions of *ImmutableJS* and *seamless-immutable*

## 1.3.1 (2017-10-14)

* Add **update()** to Flow API [#13, @dentrado]

## 1.3.0 (October 3, 2017)

* Add **update()** [#12, @dentrado]

## 1.2.5 (April 2, 2017)

* Improve `replaceAt` performance [#9, @gamtiq]

## 1.2.4 (March 4, 2017)

* Bugfix: Fix `setIn` object creation for arrays in some edge cases [#8, @adierkens]

## 1.2.3 (December 8, 2016)

* Bugfix: Allow `set`/`setIn` to automatically create arrays, handling correctly negative and decimal numbers [#4, @YellowKirby]

## 1.2.2 (December 7, 2016)

* Bugfix: Allow `set`/`setIn` to automatically create arrays [#3, @YellowKirby]

## 1.2.1 (November 15, 2016)

* Update external Flow type definitions to support Flex 0.35.

## 1.2.0 (October 24, 2016)

* Add **removeFirst(), removeLast()**

## 1.1.3 (October 19, 2016)

* Make user-facing Flow type definitions inherit from internal ones (to avoid divergence).

## 1.1.2 (October 19, 2016)

* Change how Flow type definitions are exposed so they can be used with zero config.

## 1.1.1 (October 18, 2016)

* Fix Flow type definitions for object-related function outputs, making them more flexible.

## 1.1.0 (October 10, 2016)

* Expose **Flow** type definitions.

## 1.0.0 (June 13, 2016)

* **Use semantic versioning**
* [minor] Bump development dependencies.

## 0.6.1 (Apr. 22, 2016)

* Add `omit()`

## 0.6.0 (Mar. 24, 2016)

* Renamed build directory to `lib`.

## 0.5.3 (Mar. 23, 2016)

* Removed Babel config (.babelrc) from the published package (npm). This simplifies consumption of the ES6 (or ES6 with Flow) versions.

## 0.5.1, 0.5.2 (Mar. 23, 2016)

* Distribute 4 versions of Timm:
    - ES5 (default): `timm.js` (just `require('timm')`)
    - ES5 minimised: `timm.min.js`
    - ES6: `timm_es6.js`
    - ES6 with Flow type annotations: `timm_es6_flow.js`

## 0.5.0 (Mar. 23, 2016)

* Important internal changes (migrated to AVA, ES6, Flow), but usage remains unchanged

## 0.4.3 (Mar. 08, 2016)

* Bugfix: internal `_merge()` incorrectly merged `{a: 3} + {a: undefined} => {a: undefined}`

## 0.4.2 (Feb. 28, 2016)

* Update documentation for the new functions added in 0.4.1.

## 0.4.1 (Feb. 28, 2016)

* Add `getIn()`, `updateIn()`, `mergeIn()`
* `setIn()` now creates nested objects for unknown paths
* Bugfix: internal `_clone()` converted arrays to objects

## 0.4.0 (Feb. 25, 2016)

* Accept arrays in array operations `addLast()` and `addFirst()`.
* Add new array operation `insert()`.
