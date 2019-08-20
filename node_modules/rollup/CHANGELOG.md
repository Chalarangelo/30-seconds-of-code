# rollup changelog

## 0.58.2
*2018-04-23*
* Fix rendering of certain statically resolvable if statements ([#2146](https://github.com/rollup/rollup/pull/2146))

## 0.58.1
*2018-04-18*
* Fix comment detection ([#2129](https://github.com/rollup/rollup/pull/2129))

## 0.58.0
*2018-04-16*
* Support individual chunk names with optional content hashes ([#2068](https://github.com/rollup/rollup/pull/2068))
* Support manually created chunks ([#2084](https://github.com/rollup/rollup/pull/2084))
* Automatically import deep dependencies when code splitting for better performance ([#2073](https://github.com/rollup/rollup/pull/2073))
* Automatically minify internal export/import names for esm and system output ([#2087](https://github.com/rollup/rollup/pull/2087))
* Add option to automatically merge small chunks ([#2090](https://github.com/rollup/rollup/pull/2090))
* Significantly improve tree-shaking performance ([#2119](https://github.com/rollup/rollup/pull/2119))
* Enable tree-shaking for logical expressions ([#2098](https://github.com/rollup/rollup/pull/2098))
* Rework external types and reduce type related dependencies ([#2108](https://github.com/rollup/rollup/pull/2108))
* Support parallel dependency resolution ([#2116](https://github.com/rollup/rollup/pull/2116))
* Improve deprecation handling ([#2076](https://github.com/rollup/rollup/pull/2076))
* Enable `--perf` timings in watch mode ([#2065](https://github.com/rollup/rollup/pull/2065))
* Improve performance timers ([#2111](https://github.com/rollup/rollup/pull/2111))
* Improve error handling for plugins ([#2100](https://github.com/rollup/rollup/pull/2100))
* Improve error when using `--dir` in a single file build ([#2123](https://github.com/rollup/rollup/pull/2123))
* Do not warn for external imports that are unused due to tree-shaking ([#2124](https://github.com/rollup/rollup/pull/2124))
* Update mixed export warning message ([#2107](https://github.com/rollup/rollup/pull/2107))
* Remove duplicate badges from readme ([#2083](https://github.com/rollup/rollup/pull/2083))
* Update readme examples ([#2086](https://github.com/rollup/rollup/pull/2086))

## 0.57.1
*2018-03-17*
* Improve sourcemap generation performance ([#2062](https://github.com/rollup/rollup/pull/2062))
* Add reserved config option namespace and improve CLI interface ([#2063](https://github.com/rollup/rollup/pull/2063))
* Fix issue with default exported function and class expressions ([#2059](https://github.com/rollup/rollup/pull/2059))
* Replace `forEach` with faster `for` loops in some places ([#2064](https://github.com/rollup/rollup/pull/2064))

## 0.57.0
*2018-03-15*
* Add option to preserve the module structure instead of bundling ([#1922](https://github.com/rollup/rollup/pull/1922))
* Enable watch mode when code-splitting ([#2035](https://github.com/rollup/rollup/pull/2035))
* Optionally pass CLI commands to config file ([#1926](https://github.com/rollup/rollup/pull/1926))
* Option to add correct `.toString` tags to namespaces ([#2041](https://github.com/rollup/rollup/pull/2041))
* Option and scripts to display performance timings ([#2045](https://github.com/rollup/rollup/pull/2045))
* Fixes for exported or early accessed namespaces + improved namespace indentation ([#2041](https://github.com/rollup/rollup/pull/2041))
* Include missing TypeScript dependencies ([#1965](https://github.com/rollup/rollup/pull/1965))
* Add #_PURE annotation to frozen namespaces ([#2044](https://github.com/rollup/rollup/pull/2044))
* Improve sourcemap and tree-shaking performance ([#2052](https://github.com/rollup/rollup/pull/2052))
* Inline sourcemap lookups and make rollup smaller ([#2055](https://github.com/rollup/rollup/pull/2055))
* Use updated magic-string types ([#2057](https://github.com/rollup/rollup/pull/2057))
* [BREAKING] Revert class id preservation from #2025 ([#2048](https://github.com/rollup/rollup/pull/2048))
* [BREAKING] Refactor missing export plugin hook ([#1987](https://github.com/rollup/rollup/pull/1987))

## 0.56.5
*2018-03-07*
* Preserve ids when deconflicting classes ([#2025](https://github.com/rollup/rollup/pull/2025))
* Fix an issue with re-exported namespace imports ([#2034](https://github.com/rollup/rollup/pull/2034))
* Prevent an infinite loop when binding member expressions ([#1963](https://github.com/rollup/rollup/pull/1963))
* Convert code style via prettier ([#2031](https://github.com/rollup/rollup/pull/2031))
* Fix links in documentation ([#2026](https://github.com/rollup/rollup/pull/2026))

## 0.56.4
*2018-03-05*
* Make rollup builds reproducible ([#2024](https://github.com/rollup/rollup/pull/2024))
* Improve error handling for source maps ([#2012](https://github.com/rollup/rollup/pull/2012))
* Properly handle SystemJS default exports without semicolons ([#2019](https://github.com/rollup/rollup/pull/2019))
* Properly handle importing the same variable several times when code-splitting ([#2020](https://github.com/rollup/rollup/pull/2020))
* Improve re-export tracing ([#2021](https://github.com/rollup/rollup/pull/2021))
* Apply "prettier" on commit ([#2017](https://github.com/rollup/rollup/pull/2017))
* Automatically clean up outdated tests ([#2009](https://github.com/rollup/rollup/pull/2009))
* Add SystemJS output to form tests ([#2022](https://github.com/rollup/rollup/pull/2022))
* Improve internal build configuration ([#2016](https://github.com/rollup/rollup/pull/2016))

## 0.56.3
*2018-02-25*
* Fix issues around default exports and module facades ([#2001](https://github.com/rollup/rollup/pull/2001))
* Improve and fix internal chunk interface ([#1994](https://github.com/rollup/rollup/pull/1994))
* Fix superfluous semicolons added after declarations ([#1999](https://github.com/rollup/rollup/pull/1999))
* Improve code-splitting tests ([#1990](https://github.com/rollup/rollup/pull/1990))

## 0.56.2
*2018-02-19*
* Fix handling of reassigned default exports ([#1975](https://github.com/rollup/rollup/pull/1975))
* Fix handling of renamed exports in entry points ([#1977](https://github.com/rollup/rollup/pull/1977))
* Update internal TypeScript version ([#1980](https://github.com/rollup/rollup/pull/1980))
* Omit compiled source files from published types ([#1981](https://github.com/rollup/rollup/pull/1981))
* Fix example in readme file ([#1984](https://github.com/rollup/rollup/pull/1984))
* Fix non-replaced dynamic imports in non-ESM output ([#1985](https://github.com/rollup/rollup/pull/1985))

## 0.56.1
*2018-02-16*
* Fix regression when rendering switch statements ([#1971](https://github.com/rollup/rollup/pull/1971))

## 0.56.0
*2018-02-15*
* Update to ECMAScript 2018 ([#1953](https://github.com/rollup/rollup/pull/1953))
* Rework tree-shaking rendering algorithm ([#1949](https://github.com/rollup/rollup/pull/1949))
* Tree-shake pure prototype calls on literals ([#1916](https://github.com/rollup/rollup/pull/1916))
* Expose AST parser to plugins ([#1945](https://github.com/rollup/rollup/pull/1945))
* Fix namespace re-export deconflicting ([#1960](https://github.com/rollup/rollup/pull/1960))
* Allow globals to be re-exported ([#1959](https://github.com/rollup/rollup/pull/1959))
* Fix internal performance timers ([#1966](https://github.com/rollup/rollup/pull/1966))

## 0.55.5
*2018-02-10*
* Remove OpenCollective dependency ([#1915](https://github.com/rollup/rollup/pull/1915))

## 0.55.4
*2018-02-09*
* Improve name deconflicting of external variables ([#1930](https://github.com/rollup/rollup/pull/1930))
* Improve re-export handling ([#1947](https://github.com/rollup/rollup/pull/1947))
* Mark preserveSymlinks option as optional ([#1939](https://github.com/rollup/rollup/pull/1939))
* Enable code-splitting tests to check directory structures ([#1924](https://github.com/rollup/rollup/pull/1924))
* Improve TypeScript definition test ([#1954](https://github.com/rollup/rollup/pull/1954))

## 0.55.3
*2018-02-01*
* Remove OpenCollective dependency ([#1915](https://github.com/rollup/rollup/pull/1915))

## 0.55.2
*2018-02-01*
* Add option to not follow symlinks ([#1819](https://github.com/rollup/rollup/pull/1819))
* Fix crash in windows shell ([#1928](https://github.com/rollup/rollup/pull/1928))
* Fix and test for external TypeScript errors ([#1903](https://github.com/rollup/rollup/pull/1903))
* Activate OpenCollective ([#1915](https://github.com/rollup/rollup/pull/1915))
* Optimize CI scripts ([#1921](https://github.com/rollup/rollup/pull/1921))

## 0.55.1
*2018-01-26*
* Improve dynamic import workflow ([#1907](https://github.com/rollup/rollup/pull/1907))
* Properly handle multiple dynamic imports of the same module ([#1911](https://github.com/rollup/rollup/pull/1911))
* Fix import specifier deshadowing ([#1912](https://github.com/rollup/rollup/pull/1912))
* Allow plugin load hook to return an empty string ([#1908](https://github.com/rollup/rollup/pull/1908))
* Let onwarn handler accept strings ([#1905](https://github.com/rollup/rollup/pull/1905))

## 0.55.0
*2018-01-23*
* Support code splitting ([#1841](https://github.com/rollup/rollup/pull/1841))
* Support SystemJS as output format ([#1897](https://github.com/rollup/rollup/pull/1897))
* Allow injecting acorn plugins ([#1857](https://github.com/rollup/rollup/pull/1857))
* Add `missingExport` plugin hook ([#1845](https://github.com/rollup/rollup/pull/1845))
* No longer parse config files via bublé ([#1899](https://github.com/rollup/rollup/pull/1899))
* Use externally maintained dynamic import acorn plugin ([#1891](https://github.com/rollup/rollup/pull/1891))
* Fix an error message ([#1886](https://github.com/rollup/rollup/pull/1886))
* Refactor internal rendering options ([#1900](https://github.com/rollup/rollup/pull/1900))
* Extract internal path resolution ([#1879](https://github.com/rollup/rollup/pull/1879))
* Extract internal bundle option handling ([#1880](https://github.com/rollup/rollup/pull/1880))
* Add import description type ([#1884](https://github.com/rollup/rollup/pull/1884))
* Clean up watch options types ([#1860](https://github.com/rollup/rollup/pull/1860))
* Clean up some tests ([#1888](https://github.com/rollup/rollup/pull/1888))

## 0.54.1
*2018-01-17*
* Fix TypeScript errors in emitted type definitions ([#1871](https://github.com/rollup/rollup/pull/1871))

## 0.54.0
*2018-01-12*
* Automatically inline locally resolvable dynamic imports ([#1816](https://github.com/rollup/rollup/pull/1816))
* Preserve directives in function bodies ([#1856](https://github.com/rollup/rollup/pull/1856))
* Refactor an error notification ([#1846](https://github.com/rollup/rollup/pull/1846))
* Refactor a wrong import ([#1863](https://github.com/rollup/rollup/pull/1863))
* Improve emitted TypeScript definitions ([#1864](https://github.com/rollup/rollup/pull/1864))
* Refactor unused import ([#1866](https://github.com/rollup/rollup/pull/1866))

## 0.53.4
* More type cleanup ([#1858](https://github.com/rollup/rollup/pull/1858))
* Use chalks internal helper to detect if colors should be used ([#1853](https://github.com/rollup/rollup/pull/1853))
* Refactor entity handling to use interfaces ([#1840](https://github.com/rollup/rollup/pull/1840))
* Use immutable.js internal types ([#1844](https://github.com/rollup/rollup/pull/1844))
* Ship `TypeScript` declaration files ([#1837](https://github.com/rollup/rollup/pull/1837))

## 0.53.3
* Use correct name when re-exporting from external modules ([#1794](https://github.com/rollup/rollup/pull/1794))
* Disable warnings when `resolveId` returns false ([#1825](https://github.com/rollup/rollup/pull/1825))

## 0.53.2
* Properly handle output arrays in the JavaScript API ([#1827](https://github.com/rollup/rollup/pull/1827))

## 0.53.1
* Properly deprecate more config options ([#1812](https://github.com/rollup/rollup/pull/1812))
* Pass output options to `transformBundle` plugin hook ([#1813](https://github.com/rollup/rollup/pull/1813))

## 0.53.0
* Experimental dynamic import support ([#1790](https://github.com/rollup/rollup/pull/1790))
* Unify config validation ([#1805](https://github.com/rollup/rollup/pull/1805))

## 0.52.3
* Properly hoist default exported functions in more situations ([#1799](https://github.com/rollup/rollup/pull/1799))
* Allow plugin transformations to not overwrite source maps by returning null ([#1797](https://github.com/rollup/rollup/pull/1797))
* Provide more parameters to "external" handler ([#1792](https://github.com/rollup/rollup/pull/1792))

## 0.52.2
* No longer ignore side-effects in JSON.parse and JSON.stringify ([#1785](https://github.com/rollup/rollup/pull/1785))
* Updated links in warnings ([#1776](https://github.com/rollup/rollup/pull/1776))
* No longer prevent self-imports ([#1777](https://github.com/rollup/rollup/pull/1777))
* Properly hoist default exported functions ([#1787](https://github.com/rollup/rollup/pull/1787))
* Prevent corruption when re-exporting default exports ([#1765](https://github.com/rollup/rollup/pull/1765))

## 0.52.1
* Improve deprecation warnings ([#1765](https://github.com/rollup/rollup/pull/1765))
* Properly use stdin ([#1774](https://github.com/rollup/rollup/pull/1774))
* Let --environment be used multiple times ([#1768](https://github.com/rollup/rollup/pull/1768))
* Always transpile config files ([#1759](https://github.com/rollup/rollup/pull/1759))
* Respect globals option in headers of UMD and IIFE files ([#1747](https://github.com/rollup/rollup/pull/1747))

## 0.52.0

* Accept config as promise ([#1731](https://github.com/rollup/rollup/pull/1731))
* Accept promises for intro/outro/banner/footer ([#1253](https://github.com/rollup/rollup/pull/1253))
* Option to prevent freezing of namespace imports ([#1696](https://github.com/rollup/rollup/pull/1696))
* Option to retain all output in watch mode ([#1688](https://github.com/rollup/rollup/pull/1688))
* Options to fine-tune treeshaking ([#1760](https://github.com/rollup/rollup/pull/1760))

## 0.51.8

* Fix speed problems by simplifying treeshaking reassignment handling ([#1740](https://github.com/rollup/rollup/pull/1740))
* Update dependencies ([#1742](https://github.com/rollup/rollup/pull/1742))

## 0.51.7

* Keep "this"-context when calling sequence expressions ([#1724](https://github.com/rollup/rollup/pull/1724))

## 0.51.6

* Use sourcemaps to determine error locations ([#1728](https://github.com/rollup/rollup/pull/1728))

## 0.51.5

* Fix regressions with uninitialised conditional expressions ([#1720](https://github.com/rollup/rollup/pull/1720))

## 0.51.4

* Fix regressions preventing builds ([#1725](https://github.com/rollup/rollup/pull/1725))

## 0.51.3

* Fix regression when treeshaking sequence expressions ([#1717](https://github.com/rollup/rollup/pull/1717))

## 0.51.2

* Fix treeshaking regression when labels are used inside functions ([#1712](https://github.com/rollup/rollup/pull/1712))

## 0.51.1

* Fix an issue with empty return statements ([#1704](https://github.com/rollup/rollup/pull/1704))

## 0.51.0

* Massive improvements to the treeshaking algorithm ([#1667](https://github.com/rollup/rollup/pull/1667))

## 0.50.1

* Fix treeshaking regression ([#1695](https://github.com/rollup/rollup/pull/1695))
* Treeshaking improvements ([#1650](https://github.com/rollup/rollup/pull/1650))
* Enable installation from Github ([#1670](https://github.com/rollup/rollup/pull/1670))
* Update documentation ([#1660](https://github.com/rollup/rollup/pull/1660))

## 0.50.0

* Many treeshaking improvements ([#1624](https://github.com/rollup/rollup/pull/1624))
* Show finish time in watch mode ([#1620](https://github.com/rollup/rollup/pull/1620))

## 0.49.3

* Respect `watch` options ([#1596](https://github.com/rollup/rollup/issues/1596))
* Fix treeshaking regressions ([#1604](https://github.com/rollup/rollup/pull/1604))
* Allow `-o` to work with `output.format` ([#1606](https://github.com/rollup/rollup/pull/1606))

## 0.49.2

* Fix treeshaking regressions ([#1591](https://github.com/rollup/rollup/pull/1591))

## 0.49.1

* Fix treeshaking regressions ([#1586](https://github.com/rollup/rollup/pull/1586))

## 0.49.0

* Completely update the treeshaking algorithm ([#1582](https://github.com/rollup/rollup/pull/1582))
* Only flip screen buffer if appropriate ([#1574](https://github.com/rollup/rollup/pull/1574))
* Guard against two instances creating the same dir ([#1576](https://github.com/rollup/rollup/pull/1576))

## 0.48.2

* Paths is an output option ([#1569](https://github.com/rollup/rollup/pull/1569))

## 0.48.1

* Print deprecation warnings in watch mode, and fix options when watcher restarts ([#1568](https://github.com/rollup/rollup/pull/1568))

## 0.48.0

* Numerous changes to the `options` object and CLI arguments ([#1479](https://github.com/rollup/rollup/issues/1479)). See [this gist](https://gist.github.com/Rich-Harris/d472c50732dab03efeb37472b08a3f32) for a rundown.

## 0.47.6

* Set `process.env.ROLLUP_WATCH` *before* loading config file

## 0.47.5

* Fix broken multi-bundle configs with `rollup.watch` ([#1532](https://github.com/rollup/rollup/issues/1532))

## 0.47.4

* Delete cached config file before reloading in watch mode

## 0.47.3

* Deshadow aliased imports ([#1550](https://github.com/rollup/rollup/issues/1550))

## 0.47.2

* Rebuild with dependency that npm randomly deleted

## 0.47.1

* Ignore external namespace imports when deshadowing ([#1547](https://github.com/rollup/rollup/issues/1547))

## 0.47.0

* Watch config file, restart `rollup.watch` on change ([#1535](https://github.com/rollup/rollup/issues/1535))
* Correctly render `export { foo } from` declarations in `es` output ([#1543](https://github.com/rollup/rollup/pull/1543))
* Reinstate missing `rollup.VERSION`

## 0.46.3

* init for/for-of loop section head with correct scopes ([#1538](https://github.com/rollup/rollup/issues/1538), [#1539](https://github.com/rollup/rollup/issues/1539))
* Fix namespace imports and re-exports in `es` output ([#1511](https://github.com/rollup/rollup/issues/1511))
* Deshadow indirectly imported namespaces ([#1488](https://github.com/rollup/rollup/issues/1488), [#1505](https://github.com/rollup/rollup/issues/1505))

## 0.46.2

* Pass options to `bundle.write` correctly in `rollup.watch` ([#1533](https://github.com/rollup/rollup/issues/1533))
* init for-in loop section head with correct scopes ([#1480](https://github.com/rollup/rollup/issues/1480))
* support `--no-interop` flag ([#1524](https://github.com/rollup/rollup/issues/1524))

## 0.46.1

* Remove `rollup.watch` from browser build ([#1530](https://github.com/rollup/rollup/issues/1530))
* Remove `source-map-support` dependency ([#1528](https://github.com/rollup/rollup/issues/1528))

## 0.46.0

* `options.format` is now required ([#1491](https://github.com/rollup/rollup/pull/1491))
* if `options.format` is `es6`, it will now throw an error (should be `es`) ([#1491](https://github.com/rollup/rollup/pull/1491))
* Add experimental `rollup.watch` method, replacing [rollup-watch](https://github.com/rollup/rollup-watch) ([#1491](https://github.com/rollup/rollup/pull/1491))
* Batch warnings together in CLI output ([#1491](https://github.com/rollup/rollup/pull/1491))
* Clear screen between rebuilds in `--watch` mode ([#1491](https://github.com/rollup/rollup/pull/1491))
* `onwarn` function's second argument is the default handler, allowing easier filtering without reimplementing any logic ([#1491](https://github.com/rollup/rollup/pull/1491))
* Prevent semi-colon removal after variable declaration that is for loop body ([#1275](https://github.com/rollup/rollup/issues/1275))
* Return `exports` for namespaced but non-extended IIFE bundles ([#1492](https://github.com/rollup/rollup/issues/1492))
* Fix scoping in switch statements ([#1498](https://github.com/rollup/rollup/pull/1498))
* Handle side-effects in tagged template expressions ([#1508](https://github.com/rollup/rollup/pull/1508))
* More descriptive error for missing options.format ([#1510](https://github.com/rollup/rollup/pull/1510))
* Refactor scope handling ([#1517](https://github.com/rollup/rollup/pull/1517))
* Handle failure of a config in multi-config build ([#1513](https://github.com/rollup/rollup/issues/1513))


## 0.45.2

* Fix interop when import is a string ([#1486](https://github.com/rollup/rollup/issues/1486))
* Separate `resolvedIds` from `resolvedExternalIds` ([#1490](https://github.com/rollup/rollup/pull/1490))
* Add `--extend` flag to CLI ([#1482](https://github.com/rollup/rollup/pull/1482))

## 0.45.1

* Remove `weak` from `optionalDependencies` ([#1483](https://github.com/rollup/rollup/issues/1483))

## 0.45.0

* [BREAKING] `bundle.generate(...)` returns a Promise, so that `transformBundle` plugin hooks can be asynchronous ([#1474](https://github.com/rollup/rollup/issues/1474))

## 0.44.0

* [BREAKING] Don't extend existing globals, unless `options.extend` is true ([#827](https://github.com/rollup/rollup/issues/827))
* Fix handling of catch clause parameters ([#1462](https://github.com/rollup/rollup/issues/1462))

## 0.43.1

* Fix memory leak on incremental rebuilds ([#883](https://github.com/rollup/rollup/issues/883))
* Allow `this.warn` and `this.error` to accept a `{line, column}` object as an alternative to a character index ([#1265](https://github.com/rollup/rollup/issues/1265))
* Print more useful error if entry module is 'external' ([#1264](https://github.com/rollup/rollup/issues/1264))
* Catch errors in `bundle.generate` options ([#1463](https://github.com/rollup/rollup/pull/1463))
* Fix magic-string deprecation warning ([#1445](https://github.com/rollup/rollup/pull/1445))

## 0.43.0

* Allow config files to import JSON ([#1426](https://github.com/rollup/rollup/issues/1426))
* Allow undefined imports in interop block ([#1341](https://github.com/rollup/rollup/issues/1341))
* Add `process.env.ROLLUP_WATCH = 'true'` in watch mode ([#1429](https://github.com/rollup/rollup/issues/1429))
* Add `pureExternalModules` option ([#1352](https://github.com/rollup/rollup/issues/1352))
* Allow plugins to specify `options.entry` ([#1270](https://github.com/rollup/rollup/issues/1270))
* Update dependencies

## 0.42.0

* Deprecate `options.moduleId` in favour of `options.amd.id` ([#1365](https://github.com/rollup/rollup/pull/1365))
* Add `options.amd.define` option to specify name of AMD `define` function ([#1365](https://github.com/rollup/rollup/pull/1365))
* Fix incorrect class removal with `treeshake: false` ([#1375](https://github.com/rollup/rollup/pull/1375))
* Deconflict module exports imported as namespaces ([#1384](https://github.com/rollup/rollup/issues/1384))
* Handle bare self-imports ([#1274](https://github.com/rollup/rollup/issues/1274))
* Allow config file to export an array of multiple configs ([#1389](https://github.com/rollup/rollup/pull/1389))
* Handle exponentiation operator, and fail gracefully on unknown operators ([#1416](https://github.com/rollup/rollup/issues/1416))
* Add `watch` option ([#1424](https://github.com/rollup/rollup/pull/1424))

## 0.41.6

* Preserve `originalSourceMap` on incremental rebuilds for loaders with sourcemaps ([#1336](https://github.com/rollup/rollup/issues/1336))

## 0.41.5

* Wrap ternary consequent/alternate sequences in parens ([#1273](https://github.com/rollup/rollup/issues/1273))
* Fix erroneous warning on multiple `export * from` declarations with defaults ([#1278](https://github.com/rollup/rollup/issues/1278))
* Prevent variable conflicts with `treeshake: false` ([#1268](https://github.com/rollup/rollup/issues/1268))
* Allow missing `source` when collapsing sourcemaps ([#1254](https://github.com/rollup/rollup/issues/1254))
* Allow plugins to log with strings ([#1316](https://github.com/rollup/rollup/pull/1316))

## 0.41.4

* Fix cases of multiple `export * from 'external'` declarations ([#1252](https://github.com/rollup/rollup/issues/1252))
* Fix 'TODO' error message ([#1257](https://github.com/rollup/rollup/issues/1257))

## 0.41.3

* Don't treat `this.foo` as possible namespace ([#1258](https://github.com/rollup/rollup/issues/1258))

## 0.41.2

* Optimize `namespace['foo']` references ([#1240](https://github.com/rollup/rollup/pull/1240))

## 0.41.1

* Include `new` expressions where callee is a class with side-effects ([#980](https://github.com/rollup/rollup/issues/980) [#1233](https://github.com/rollup/rollup/issues/1233))

## 0.41.0

* Add `this.warn(...)` and `this.error(...)` methods to plugin `transform` hook contexts ([#1140](https://github.com/rollup/rollup/issues/1140))
* `throw` always considered to be a side effect ([#1227](https://github.com/rollup/rollup/pull/1227))

## 0.40.2

* Add `file` property to sourcemaps for bundles with plugins ([#986](https://github.com/rollup/rollup/issues/986))
* Don't require globals for empty imports ([#1217](https://github.com/rollup/rollup/issues/1217))

## 0.40.1

* Allow missing space between `export default` and declaration ([#1218](https://github.com/rollup/rollup/pull/1218))

## 0.40.0

* [BREAKING] Better, more consistent error logging ([#1212](https://github.com/rollup/rollup/pull/1212))
* Don't use colours and emojis for non-TTY stderr ([#1201](https://github.com/rollup/rollup/issues/1201))

## 0.39.2

* Prevent mutation of cached ASTs (fixes stack overflow with rollup-watch) ([#1205](https://github.com/rollup/rollup/pull/1205))

## 0.39.1

* Ignore `var` initialisers in dead branches ([#1198](https://github.com/rollup/rollup/issues/1198))

## 0.39.0

* [BREAKING] Warnings are objects, rather than strings ([#1194](https://github.com/rollup/rollup/issues/1194))

## 0.38.3

* More informative warning for implicit external dependencies ([#1051](https://github.com/rollup/rollup/issues/1051))
* Warn when creating browser bundle with external dependencies on Node built-ins ([#1051](https://github.com/rollup/rollup/issues/1051))
* Statically analyse LogicalExpression nodes, for better dead code removal ([#1061](https://github.com/rollup/rollup/issues/1061))

## 0.38.2

* Preserve `var` declarations in dead branches ([#997](https://github.com/rollup/rollup/issues/997))
* Warn if exporting a call expression that looks like a function declaration ([#1011](https://github.com/rollup/rollup/issues/1011))
* Wrap function expressions in parentheses if necessary ([#1011](https://github.com/rollup/rollup/issues/1011))

## 0.38.1

* Fix sourcemap comment removal ([#1104](https://github.com/rollup/rollup/issues/1104))
* Warn if empty bundle is generated ([#444](https://github.com/rollup/rollup/issues/444))
* Support ES2017 syntax ([#492](https://github.com/rollup/rollup/issues/492))
* Remove unused imports from external modules ([#595](https://github.com/rollup/rollup/issues/595))
* Remove unused function and class declarations inside function bodies ([#1108](https://github.com/rollup/rollup/issues/1108), [#1178](https://github.com/rollup/rollup/issues/1178))
* Deconflict function expression IDs ([#1176](https://github.com/rollup/rollup/issues/1176))

## 0.38.0

* [BREAKING] `export { foo as default }` creates live binding ([#1078](https://github.com/rollup/rollup/issues/1078))
* Prevent sourceMappingURL removal edge case ([#988](https://github.com/rollup/rollup/issues/988))
* Bind function expression IDs to the correct scope ([#1083](https://github.com/rollup/rollup/issues/1083))
* Correctly deshadow destructured parameters with assignments ([#1008](https://github.com/rollup/rollup/issues/1008))

## 0.37.2

* Remove unused `new` expressions without side-effects ([#179](https://github.com/rollup/rollup/issues/179))
* Only remove valid sourceMappingURL comments ([#1132](https://github.com/rollup/rollup/issues/1132))
* Ensure blocks containing activated `var` declarations are included in output ([#1113](https://github.com/rollup/rollup/issues/1113))
* Support plugin outros ([#1116](https://github.com/rollup/rollup/issues/1116))

## 0.37.1

* Follow symlinks ([#447](https://github.com/rollup/rollup/issues/447))
* Fix tree-shaking of recursive functions and other cases ([#1120](https://github.com/rollup/rollup/issues/1120), [#1142](https://github.com/rollup/rollup/issues/1142))
* Support module names that require quotes ([#582](https://github.com/rollup/rollup/issues/582), [#584](https://github.com/rollup/rollup/issues/584))
* Fix [#957](https://github.com/rollup/rollup/issues/957)

## 0.37.0

* [BREAKING] Default exports are not included in reified namespaces ([#1028](https://github.com/rollup/rollup/issues/1028))
* Parentheses do not defeat tree-shaking ([#1101](https://github.com/rollup/rollup/issues/1101), [#1128](https://github.com/rollup/rollup/issues/1128))
* More `legacy` fixes: do not create getters ([#1069](https://github.com/rollup/rollup/pull/1069)), do not include `__esModule` ([#1068](https://github.com/rollup/rollup/pull/1068)), quote reserved property names ([#1057](https://github.com/rollup/rollup/pull/1057))
* Fix missing namespace member warnings ([#1045](https://github.com/rollup/rollup/issues/1045))
* Fix TypeError in arrow function without braces returning a function ([#1062](https://github.com/rollup/rollup/pull/1062))

## 0.36.4

* Only depend on program-level call expressions ([#977](https://github.com/rollup/rollup/issues/977))

## 0.36.3

* Add `legacy` option for IE8 support ([#989](https://github.com/rollup/rollup/pull/989))

## 0.36.2

* Insert semicolons where necessary to fix broken code ([#1004](https://github.com/rollup/rollup/issues/1004))
* Include module ID and location when warning about top-level `this`  ([#1012](https://github.com/rollup/rollup/pull/1012))
* More informative error for missing exports ([#1033](https://github.com/rollup/rollup/issues/1033))
* `options.moduleContext` for per-module context overrides ([#1023](https://github.com/rollup/rollup/pull/1023))

## 0.36.1

* Include naked block statements ([#981](https://github.com/rollup/rollup/issues/981))
* Correctly include falsy alternate statements in optimised if blocks ([#973](https://github.com/rollup/rollup/issues/973))
* Prevent omission of default exports that are only used by the exporting module ([#967](https://github.com/rollup/rollup/pull/967))
* Prevent warning on `auto` exports with ES output ([#966](https://github.com/rollup/rollup/pull/966))

## 0.36.0

* `export { foo as default }` no longer creates a live binding ([#860](https://github.com/rollup/rollup/issues/860))

## 0.35.15

* Warn on missing unused imports in deshadowing phase ([#928](https://github.com/rollup/rollup/issues/928))
* Always add a newline to the end of bundles ([#958](https://github.com/rollup/rollup/issues/958))

## 0.35.14

* Include all parent statements of expression with effects, up to function boundary ([#930](https://github.com/rollup/rollup/issues/930))

## 0.35.13

* Include superclasses when including their subclasses ([#932](https://github.com/rollup/rollup/issues/932))

## 0.35.12

* Add `interop: false` option to disable unwrapping of external imports ([#939](https://github.com/rollup/rollup/issues/939))

## 0.35.11

* Deconflict reified namespaces with other declarations ([#910](https://github.com/rollup/rollup/issues/910))

## 0.35.10

* Only remove EmptyStatement nodes directly inside blocks ([#913](https://github.com/rollup/rollup/issues/931))

## 0.35.9

* Support Node 0.12 ([#909](https://github.com/rollup/rollup/issues/909))

## 0.35.8

* Correctly deshadow re-assigned module functions ([#910](https://github.com/rollup/rollup/issues/910))

## 0.35.7

* Refactor `flushTime.js` ([#922](https://github.com/rollup/rollup/pull/922))

## 0.35.6

* Fix browser build

## 0.35.5

* Allow empty for loop heads ([#919](https://github.com/rollup/rollup/issues/919))

## 0.35.4

* Preserve effects in for-of and for-in loops ([#870](https://github.com/rollup/rollup/issues/870))
* Remove empty statements ([#918](https://github.com/rollup/rollup/pull/918))

## 0.35.3

* Render identifiers inside template literals

## 0.35.2

* Fix broken build caused by out of date locally installed dependencies

## 0.35.1

* Rewrite deconflicted class identifiers ([#915](https://github.com/rollup/rollup/pull/915))
* Include `dependencies` in `bundle.modules` objects ([#903](https://github.com/rollup/rollup/issues/903))
* Update to Acorn 4 ([#914](https://github.com/rollup/rollup/pull/914))

## 0.35.0

* Rewrite analysis/tree-shaking code ([#902](https://github.com/rollup/rollup/pull/902))
* Include conditional mutations of global objects ([#901](https://github.com/rollup/rollup/issues/901))
* Only reify namespaces if necessary ([#898](https://github.com/rollup/rollup/issues/898))
* Track mutations of aliased globals ([#893](https://github.com/rollup/rollup/issues/893))
* Include duplicated var declarations ([#716](https://github.com/rollup/rollup/issues/716))

## 0.34.13

* Pass `{ format }` through to `transformBundle` ([#867](https://github.com/rollup/rollup/issues/867))

## 0.34.12

* Fix `rollup --watch` ([#887](https://github.com/rollup/rollup/issues/887))
* Case-sensitive paths ([#862](https://github.com/rollup/rollup/issues/862))

## 0.34.11

* Prevent leaky state when `bundle` is reused ([#875](https://github.com/rollup/rollup/issues/875))
* Ensure `intro` appears before interop block ([#880](https://github.com/rollup/rollup/issues/880))

## 0.34.10

* Allow custom `options.context` to replace top-level `this` ([#851](https://github.com/rollup/rollup/issues/851))
* Fix `noConflict` when used via `rollup --config` ([#846](https://github.com/rollup/rollup/issues/846))
* Place `outro` block *after* export block ([#852](https://github.com/rollup/rollup/issues/852))

## 0.34.9

* Disable indentation by default, for faster bundle generation ([#812](https://github.com/rollup/rollup/pull/812))
* More helpful error on missing entry file ([#802](https://github.com/rollup/rollup/issues/802))
* Preserve comments before import declarations ([#815](https://github.com/rollup/rollup/pull/815))

## 0.34.8

* Wrap UMD factory function in parens to avoid lazy parsing ([#774](https://github.com/rollup/rollup/pull/774))

## 0.34.7

* Leave it up to resolveId to normalize the entry path ([#835](https://github.com/rollup/rollup/pull/835))
* Cache decoded mappings ([#834](https://github.com/rollup/rollup/pull/834))

## 0.34.5

* Fix circular export ([#813](https://github.com/rollup/rollup/issues/813))

## 0.34.4

* Module render performance tweak ([#823](https://github.com/rollup/rollup/pull/823))

## 0.34.3

* Avoid infinite recursion in `Bundle.sort()` ([#800](https://github.com/rollup/rollup/pull/800))

## 0.34.2

* resolveId calls are cached now to improve incremental build
* Fixed error message recursion in plugins

## 0.34.1

* Support `paths` config ([#754](https://github.com/rollup/rollup/issues/754))
* Allow `export *` from external module, internally

## 0.34.0

* Use resolved IDs for relative imports that are also external modules, to allow `options.globals` to work with them ([#763](https://github.com/rollup/rollup/issues/763))
* Ensure reassigned exports are declared in an ES bundle, and remove empty `exports.foo;` statements ([#755](https://github.com/rollup/rollup/issues/755))
* Add newline after sourcemap comment ([#756](https://github.com/rollup/rollup/issues/756))

## 0.33.2

* Add `bundle` as second argument to `ongenerate` and `onwrite` hooks ([#773](https://github.com/rollup/rollup/pull/773))
* Warn on top-level `this` ([#770](https://github.com/rollup/rollup/issues/770))

## 0.33.1

* Fix `--no-strict` option ([#751](https://github.com/rollup/rollup/pull/751))
* Fix Windows edge case with case-sensitive paths ([#760](https://github.com/rollup/rollup/pull/760))

## 0.33.0

* Downgrade missing transformer sourcemap to a warning, not an error, and print the name of the offending plugin if possible ([#746](https://github.com/rollup/rollup/issues/746))
* Warn if same name is re-exported from two modules ([#722](https://github.com/rollup/rollup/issues/722))

## 0.32.4

* Add `ongenerate` and `onwrite` plugin hooks ([#742](https://github.com/rollup/rollup/pull/742))

## 0.32.3

* Generated correct sourcemaps with reified namespaces ([#668](https://github.com/rollup/rollup/issues/668))
* Exclude plugin helper modules from sourcemaps ([#747](https://github.com/rollup/rollup/pull/747))

## 0.32.2

* Allow `--globals` to work with `--external` or `options.external` in whatever configuration ([#743](https://github.com/rollup/rollup/issues/743))

## 0.32.1

* Preserve side-effects to default exports that coincide with used named exports ([#733](https://github.com/rollup/rollup/issues/733))
* Support `rollup -c node:pkgname` ([#736](https://github.com/rollup/rollup/issues/736))

## 0.32.0

* Deprecate `es6` format in favour of `es` ([#468](https://github.com/rollup/rollup/issues/468))
* Add correct `jsnext:main` build ([#726](https://github.com/rollup/rollup/pull/726))

## 0.31.2

* Allow `load` plugins to provide sourcemap ([#715](https://github.com/rollup/rollup/pull/715))
* Allow `sourceMapFile` in config options ([#717](https://github.com/rollup/rollup/issues/717))

## 0.31.1

* Logging for errors emitted by `rollup-watch` ([#712](https://github.com/rollup/rollup/issues/712))

## 0.31.0

* Rewrite top-level `this` as `undefined` ([#707](https://github.com/rollup/rollup/pull/707))
* Pass `options.acorn` to Acorn ([#564](https://github.com/rollup/rollup/issues/564))

## 0.30.0

* Bundle CLI ([#700](https://github.com/rollup/rollup/issues/700))
* Ensure absolute paths are normalised ([#704](https://github.com/rollup/rollup/issues/704))
* Allow `rollup --watch` to work with targets

## 0.29.1

* Merge `target` options with main options ([#701](https://github.com/rollup/rollup/issues/701))
* Update magic-string ([#690](https://github.com/rollup/rollup/issues/690))

## 0.29.0

* `rollup --watch` ([#284](https://github.com/rollup/rollup/issues/284))

## 0.28.0

* Experimental support for incremental rebuilds ([#658](https://github.com/rollup/rollup/pull/658))

## 0.27.1

* Ensure names exported from a module are not replaced with reserved words ([#696](https://github.com/rollup/rollup/pull/696))
* Revert ([#692](https://github.com/rollup/rollup/pull/692)) – resolved IDs must be strings

## 0.27.0

* Use native promises instead of `es6-promise` ([#689](https://github.com/rollup/rollup/issues/689))
* Support multiple targets in config files ([#655](https://github.com/rollup/rollup/issues/655))
* Allow `resolveId` plugin functions to return non-strings ([#692](https://github.com/rollup/rollup/pull/692))

## 0.26.7

* Distinguish between default and namespace imports of external module ([#637](https://github.com/rollup/rollup/issues/637))
* Add `__esModule` property to named exports in AMD, CJS and UMD modes ([#650](https://github.com/rollup/rollup/issues/650))

## 0.26.6

* Deconflict named imports from external modules in ES bundles ([#659](https://github.com/rollup/rollup/issues/659))
* Support `options.preferConst` to generate `const` declarations for exports rather than `var` declarations ([#653](https://github.com/rollup/rollup/issues/653))

## 0.26.5

* Preserve `debugger` statements ([#664](https://github.com/rollup/rollup/issues/664))
* Allow `options.external` to be a function ([#522](https://github.com/rollup/rollup/issues/522))

## 0.26.4

* Prevent plugin-provided external IDs being normalised ([#630](https://github.com/rollup/rollup/issues/630), [#633](https://github.com/rollup/rollup/issues/633))
* Throw if module exports/re-exports the same name twice, or has multiple default exports ([#679](https://github.com/rollup/rollup/issues/679))
* Warn about `eval` security issue ([#675]((https://github.com/rollup/rollup/issues/675)))


## 0.26.3

* Ensure reference is not incorrectly marked as a reassignment ([#648](https://github.com/rollup/rollup/issues/648))

## 0.26.2

* Sanity check output of `load` hook ([#607](https://github.com/rollup/rollup/issues/607))
* Correct scoping for ID class expressions ([#626](https://github.com/rollup/rollup/issues/626))
* Warn if named and default exports are used together in auto mode ([#587](https://github.com/rollup/rollup/issues/587))
* Allow variable initialisers to be rewritten if necessary ([#632](https://github.com/rollup/rollup/issues/632))
* Prevent double `var` with no-treeshake option ([#639](https://github.com/rollup/rollup/pull/639))

## 0.26.1

* Add `treeshake: false`/`--no-treeshake` option for debugging ([#505](https://github.com/rollup/rollup/issues/505))
* Update build process to use Bublé ([#620](https://github.com/rollup/rollup/pull/620))

## 0.26.0

* Add `noConflict`/`--no-conflict` option for UMD builds ([#580](https://github.com/rollup/rollup/pull/580))
* Normalise relative external paths ([#591](https://github.com/rollup/rollup/pull/591))
* Report files causing transform errors ([#609](https://github.com/rollup/rollup/pull/609))
* Handle sourcemap segments with a single member ([#619](https://github.com/rollup/rollup/pull/619))
* Update dependencies

## 0.25.8

* Unixize entry path ([#586](https://github.com/rollup/rollup/pull/586))

## 0.25.7

* Expand deshadowed shorthand properties ([#575](https://github.com/rollup/rollup/issues/575))
* Allow external files to be non-existent ([#532](https://github.com/rollup/rollup/issues/532))

## 0.25.6

* Fix a regression introduced by #566 ([#569](https://github.com/rollup/rollup/issues/569))
* Prune dead conditional expressions more carefully ([#567](https://github.com/rollup/rollup/issues/567))

## 0.25.5

* Make sure shorthand destructuring assignments don't break ([#528](https://github.com/rollup/rollup/issues/528))
* Allow 'exports' key ([#542](https://github.com/rollup/rollup/issues/542))
* Ensure `foo.  bar` where `foo` is a namespace import is rewritten correctly ([#566](https://github.com/rollup/rollup/issues/566))
* Fix an edge case for exported globals (e.g. `export { document }`) ([#562](https://github.com/rollup/rollup/issues/562))

## 0.25.4

* Fix misnamed exports of default imports in ES bundles ([#513](https://github.com/rollup/rollup/issues/513))
* CLI: warn on missing config ([#515](https://github.com/rollup/rollup/pull/515))
* Detect side-effects in non-top-level member expression assignment ([#476](https://github.com/rollup/rollup/issues/476))
* Don't remove computed property class keys ([#504](https://github.com/rollup/rollup/issues/504))
* Augment existing global object rather than replacing ([#493](https://github.com/rollup/rollup/issues/493))
* Don't fail on `export {}`, warn instead ([#486](https://github.com/rollup/rollup/issues/486))

## 0.25.3

* Handle non-objects and `null` in `_interopDefault` ([#474](https://github.com/rollup/rollup/issues/474))

## 0.25.2

* Skip dead branches of a conditional expression (#[465](https://github.com/rollup/rollup/pull/465))
* Allow globals to be exported ([#472](https://github.com/rollup/rollup/pull/472))
* Ensure reassigned exports are exported ([#484](https://github.com/rollup/rollup/issues/484))

## 0.25.1

* Throw error if namespace is called ([#446](https://github.com/rollup/rollup/issues/446))
* Prevent shadowing bug in ES6 output ([#441](https://github.com/rollup/rollup/pull/441))
* Prevent `var exports.foo` ([#426](https://github.com/rollup/rollup/issues/426))
* Prevent double export of aliased symbols ([#438](https://github.com/rollup/rollup/issues/438))
* Provide more informative error if Rollup is used in-browser without appropriate `resolveId`/`load` hooks ([#275](https://github.com/rollup/rollup/issues/275))
* Use `_interopDefault` function to DRY out code with many external dependencies, in CommonJS output ([#458](https://github.com/rollup/rollup/pull/458))

## 0.25.0

* **breaking** Module order is determined according to spec, rather than in a way designed to prevent runtime errors. Rollup will warn if it detects runtime errors are likely ([#435](https://github.com/rollup/rollup/issues/435))
* Prevent overly aggressive tree-shaking with complex call expressions ([#440](https://github.com/rollup/rollup/issues/440))

## 0.24.1

* Handle calls to default exports other that are not function expressions or references to function declarations ([#421](https://github.com/rollup/rollup/issues/421))
* Ensure namespace blocks are created for chained imports ([#430](https://github.com/rollup/rollup/issues/430))
* Include references in computed property keys ([#434](https://github.com/rollup/rollup/issues/434))
* Use CLI `--external` option correctly ([#417](https://github.com/rollup/rollup/pull/417))
* Allow relative imports to be treated as external, if absolute paths are provided in `options.external` ([#410](https://github.com/rollup/rollup/issues/410))
* Make IIFE output adhere to Crockford style ([#415](https://github.com/rollup/rollup/pull/415))

## 0.24.0

* No longer attempts to resolve IDs in `options.external` ([#407](https://github.com/rollup/rollup/issues/407))
* Fix broken sourcemap resolution in cases where some modules are transformed and others aren't ([#404](https://github.com/rollup/rollup/issues/404))

## 0.23.2

* Ensure `dest` or `sourceMapFile` is resolved against CWD for purposes of sourcemap generation ([#344](https://github.com/rollup/rollup/issues/344))
* Support `banner`, `footer`, `intro` and `outro` options via CLI ([#330](https://github.com/rollup/rollup/issues/330))
* Allow `options.global` to be a function rather than an object, and warn on missing names ([#293](https://github.com/rollup/rollup/issues/293))
* Ensure side-effects are captured in cyclical call expressions ([#397](https://github.com/rollup/rollup/issues/397))
* Fix parse error with body-less arrow function expressions ([#403](https://github.com/rollup/rollup/issues/403))

## 0.23.1

* Reinstate missing fix from ([#392](https://github.com/rollup/rollup/pull/392))

## 0.23.0

* Add `bundleTransform` plugin hook and option ([#387](https://github.com/rollup/rollup/pull/387))
* Correctly store names in sourcemaps, regardless of transformers
* Add `--environment` option to CLI ([#388](https://github.com/rollup/rollup/pull/388))
* Handle destructuring in exports ([#374](https://github.com/rollup/rollup/issues/374))
* Fix UMD global exports bug introduced in 0.22.1 ([#392](https://github.com/rollup/rollup/pull/392))

## 0.22.2

* Prevent lost `var` keywords ([#390](https://github.com/rollup/rollup/issues/390))

## 0.22.1

* Update expected option keys ([#379](https://github.com/rollup/rollup/issues/379))
* Handle transformers that return stringified sourcemaps ([#377](https://github.com/rollup/rollup/issues/377))
* Automatically create missing namespaces if `moduleName` contains dots ([#378](https://github.com/rollup/rollup/issues/378))
* Ignore external dependency warnings coming from config file ([#333](https://github.com/rollup/rollup/issues/333))
* Update to latest magic-string for performance boost

## 0.22.0

* Duplicate warnings are squelched ([#362](https://github.com/rollup/rollup/issues/362))
* Plugins can manipulate or override the `options` object ([#371](https://github.com/rollup/rollup/pull/371))

## 0.21.3

* Validate option keys ([#348](https://github.com/rollup/rollup/pull/348))
* Allow namespaces imports to sit alongside named imports ([#355](https://github.com/rollup/rollup/issues/355))
* Count references inside destructured objects ([#364](https://github.com/rollup/rollup/issues/364))
* Preserve top-level `delete` statements ([#352](https://github.com/rollup/rollup/issues/352))

## 0.21.2

* Missing relative imports are an error, not a warning ([#321](https://github.com/rollup/rollup/issues/321))
* Fixed incorrectly renamed default exports in ES6 bundles ([#339](https://github.com/rollup/rollup/issues/339))
* Fixed infinite recursion bug ([#341](https://github.com/rollup/rollup/issues/341))

## 0.21.1

* Remove `aggressive: true` (was too aggressive) ([#309](https://github.com/rollup/rollup/pull/309))
* Handle top-level block statements ([#326](https://github.com/rollup/rollup/issues/326))
* Optimise namespaces with default exports ([#314](https://github.com/rollup/rollup/issues/314))

## 0.21.0

* Only include statements whose side-effects are relevant (i.e. contribute to exports or affect global state) ([#253](https://github.com/rollup/rollup/pull/253)) ([#253](https://github.com/rollup/rollup/pull/253))
* Exclude dead branches from analysis and inclusion ([#249](https://github.com/rollup/rollup/pull/249))
* Add `aggressive: true` option to eliminate all side-effects outside entry module
* More informative error when re-exporting non-existent binding ([#274](https://github.com/rollup/rollup/issues/274))
* Fix infinite recursion bug ([#291](https://github.com/rollup/rollup/issues/291))
* Log errors when using `rollup --config` ([#288](https://github.com/rollup/rollup/pull/288))
* Return rejected promises on startup instead of throwing error, if options are invalid ([#303](https://github.com/rollup/rollup/pull/303))

## 0.20.5

* Ensure re-exports don't create a local binding ([#270](https://github.com/rollup/rollup/pull/270))

## 0.20.4

* Check file exists at resolve time, to allow filenames with non-extension dots in them ([#250](https://github.com/rollup/rollup/pull/250))
* Import `Promise` where used, for Node 0.10 support ([#254](https://github.com/rollup/rollup/issues/254))
* Allow asynchronous transformer plugins ([#260](https://github.com/rollup/rollup/issues/260))
* Don't assume re-exported bindings are globals when deconflicting ([#267](https://github.com/rollup/rollup/issues/267))


## 0.20.3

* Fix bug where multiple `export *` declarations caused error ([#244](https://github.com/rollup/rollup/pulls/244))
* Missing namespace exports are a warning, not an error ([#244](https://github.com/rollup/rollup/pulls/244))
* Plugins can provide `banner` and `footer` options (string, or function that returns a string) ([#235](https://github.com/rollup/rollup/issues/235))
* Warn on encountering `eval` ([#186](https://github.com/rollup/rollup/issues/186))

## 0.20.2

* Handle errors in build config file
* More robust deconflicting, in cases where e.g. `foo$1` already exists
* Use Rollup CLI for own build process

## 0.20.1

* Support `--config` file to enable plugins with CLI ([#226](https://github.com/rollup/rollup/pulls/226))
* Prevent `default` being used as variable name ([#215](https://github.com/rollup/rollup/issues/215))
* Update deps

## 0.20.0

* Support for [plugins](https://github.com/rollup/rollup/wiki/Plugins) ([#207](https://github.com/rollup/rollup/pulls/207))
* BREAKING – `options.transform`, `options.load`, `options.resolveId`, `options.resolveExternal` and `options.external` are no longer supported, and should be handled by plugins. [More info](https://github.com/rollup/rollup/wiki/Plugins)
* BREAKING – the .js extension is only added if it looks like there's no extension, allowing e.g. `import data from 'data.json'` (with the appropriate transformer). For safety, always include the file extension – import `./foo.js`, not `./foo`

## 0.19.2

* Fix exporting namespaces to include all of their exports ([#204](https://github.com/rollup/rollup/issues/204))
* Namespace exotic objects are frozen to ensure that its properties cannot be modified, reconfigured, redefined or deleted ([#203](https://github.com/rollup/rollup/pulls/203))
* Fix `ReferenceError: Promise is not defined` in node v0.10 ([#189](https://github.com/rollup/rollup/issues/189))

## 0.19.1

* Fix `module.basename()` when used with custom `resolveId` function
* Use [rollup-babel](https://github.com/rollup/rollup-babel) to build self
* Exposed the version string through the API: `require( 'rollup' ).VERSION`

## 0.19.0

* **breaking** The `transform` option is no longer passed through to custom loaders. Loaders should only concern themselves with providing source code; transformation will *always* take place
* `options.transform` functions can return a string, or a `{code, map, ast}` object. Where possible, sourcemap chains will be flattened ([#175](https://github.com/rollup/rollup/pull/175))
* `options.resolveId`, `options.resolveExternal` and `options.load` can each be a function or an array of functions. If an array, the first non-null/undefined return value is used. In both cases, failed resolution/loading will fall back to the defaults, unless an error is thrown. ([#174](https://github.com/rollup/rollup/pull/174))
* New `intro` and `outro` options – similar to `banner` and `footer` except inserted *inside* any format-specific wrapper
* Multiple var declarations in an export block (e.g. `export let a = 1, b = 2`) are split up to facilitate tree-shaking ([#171](https://github.com/rollup/rollup/issues/171))
* More informative error when using a missing namespace property  ([#169](https://github.com/rollup/rollup/pull/169))
* Update various dependencies

## 0.18.5

* Allow namespaces to be assigned to variables ([#168](https://github.com/rollup/rollup/issues/168))
* Promote `chalk` and `source-map-support` to `dependencies`, as they're used by the CLI ([#167](https://github.com/rollup/rollup/pull/167))

## 0.18.4

* Make external modules configurable (i.e. `external.config.foo = 'bar'`) without erroring

## 0.18.3

* Crop indent exclusion ranges to exclude enclosing quotes ([#166](https://github.com/rollup/rollup/issues/166))

## 0.18.2

* Include definitions of namespace members that are exported as defaults

## 0.18.1

* Include `acorn.parse` in bundle, remove `sander` from dependencies, simplify build

## 0.18.0

* Internal rewrite
* Reinstate statically-analysable namespace imports
* Avoid using getters in namespace blocks where possible ([#144](https://github.com/rollup/rollup/issues/144))
* Track variable aliases ([#96](https://github.com/rollup/rollup/issues/96))
* Prevent multiline strings being indented ([#164](https://github.com/rollup/rollup/issues/164))

## 0.17.4

* Allow imports from hidden directories (replay of [#133](https://github.com/rollup/rollup/issues/133))

## 0.17.3

* Handle parenthesised default exports ([#136](https://github.com/rollup/rollup/issues/136))

## 0.17.2

* Allow use of scoped npm packages ([#131](https://github.com/rollup/rollup/issues/131))

## 0.17.1

* Allow namespaces to be passed to a function ([#149](https://github.com/rollup/rollup/issues/149))

## 0.17.0

* Roll back to 0.15.0 and reapply subsequent fixes pending resolution of ([#132](https://github.com/rollup/rollup/issues/132)) and related issues

## 0.16.4

* Fix import paths with `.` ([#133](https://github.com/rollup/rollup/issues/133))
* Prevent sourceMappingURL confusion leading to broken sourcemap
* Add code coverage reporting [#130](https://github.com/rollup/rollup/pull/130))
* Add `modules` property to user-facing `bundle` – an array with `{id}` objects ([#128](https://github.com/rollup/rollup/issues/128))

## 0.16.3

* Prevent adjacent blocks of multiple var declarations causing magic-string failure ([#105](https://github.com/rollup/rollup/issues/105))

## 0.16.2

* Top-level function calls and assignments to globals are treated as side-effects, and always included
* Import files from subdirectories of external packages, e.g. `import mod from 'foo/sub/mod'` ([#126](https://github.com/rollup/rollup/issues/126))

## 0.16.1

* Handle assignment patterns, and destructured/rest parameters, when analysing scopes
* Fix bug preventing project from self-building (make base `Identifier` class markable)

## 0.16.0

* Internal refactoring ([#99](https://github.com/rollup/rollup/pull/99))
* Optimisation for statically-analysable namespace imports ([#99](https://github.com/rollup/rollup/pull/99))
* Windows support (theoretically!) ([#117](https://github.com/rollup/rollup/pull/117) / [#119](https://github.com/rollup/rollup/pull/119))

## 0.15.0

* Load all modules specified by `import` statements, and do tree-shaking synchronously once loading is complete. This results in simpler and faster code, and enables future improvements ([#97](https://github.com/rollup/rollup/pull/97))
* Only rewrite `foo` as `exports.foo` when it makes sense to ([#92](https://github.com/rollup/rollup/issues/92))
* Fix bug with shadowed variables that are eventually exported ([#91](https://github.com/rollup/rollup/issues/91))
* Exclude unused function declarations that happen to modify a used name ([#90](https://github.com/rollup/rollup/pull/90))
* Simplify internal `Scope` model – scopes always attach to blocks, never function expressions/declarations

## 0.14.1

* `export { name } from './other'` does not create a local binding ([#16](https://github.com/rollup/rollup/issues/16))
* A single binding can be exported under multiple names ([#18](https://github.com/rollup/rollup/issues/18))
* `useStrict` option exposed to CLI as `--strict`/`--no-strict` ([#81](https://github.com/rollup/rollup/issues/81))
* Neater exports from ES6 bundles

## 0.14.0

* Internal refactoring
* Correctly deconflict generated default export names ([#72](https://github.com/rollup/rollup/issues/72))
* Handle `export { x } from 'y'` declarations ([#74](https://github.com/rollup/rollup/issues/74))
* Dedupe named imports from external modules in ES6 bundles ([#77](https://github.com/rollup/rollup/issues/77))

## 0.13.0

* Support `banner` and `footer` options ([#66](https://github.com/rollup/rollup/pull/66))
* Remove pre-existing sourcemap comments ([#66](https://github.com/rollup/rollup/pull/66))
* Deconflict external imports ([#66](https://github.com/rollup/rollup/pull/66))
* Use existing AST, if provided ([#66](https://github.com/rollup/rollup/pull/66))
* Rename internal namespace exports as appropriate ([#66](https://github.com/rollup/rollup/pull/66))
* Remove uninitialised var declarations that get exported ([#66](https://github.com/rollup/rollup/pull/66))
* Rename variables named `exports` to avoid conflicts ([#66](https://github.com/rollup/rollup/pull/66))

## 0.12.1

* Don't attempt to mark statements belonging to external modules ([#68](https://github.com/rollup/rollup/issues/68))
* Correctly deshadow variables that conflict with imports ([#68](https://github.com/rollup/rollup/issues/68))

## 0.12.0

* Internal re-architecting, resulting in more efficient bundling with reduced memory usage
* Shorthand properties are expanded if necessary ([#61](https://github.com/rollup/rollup/issues/61))
* Fixed various bugs with bundle external dependencies, particularly when generating ES6 bundles ([#59](https://github.com/rollup/rollup/issues/59))
* Add `--globals` option to CLI ([#60](https://github.com/rollup/rollup/pull/60))
* Allow imports of external modules for side-effects ([#55](https://github.com/rollup/rollup/pull/55))
* Prevent Rollup hanging on non-existent external module ([#54](https://github.com/rollup/rollup/pull/54))

## 0.11.4

* Side-effect preservation applies to internal default exports ([#43](https://github.com/rollup/rollup/issues/43))

## 0.11.3

* Class methods are not incorrectly renamed ([#42](https://github.com/rollup/rollup/issues/42))
* External modules are assigned names before canonical names are determined ([#42](https://github.com/rollup/rollup/issues/42))

## 0.11.2

* Correctly handle computed properties (e.g. `foo[bar]`) when discovering dependencies ([#47](https://github.com/rollup/rollup/pull/47))

## 0.11.1

* Support for `export * from '..'` ([#46](https://github.com/rollup/rollup/pull/46))

## 0.11.0

* Experimental browser-friendly build (`dist/rollup.browser.js`) ([#25](https://github.com/rollup/rollup/issues/25))
* Internal re-architecting to make discovery process simpler and more performant
* Preservation of side-effects that happen in a separate module to the affected definition ([#39](https://github.com/rollup/rollup/issues/39))

## 0.10.0

* Better sorting algorithm – sorting happens at the module level, rather than the statement level. This avoids certain edge cases
* IIFEs are ignored for the purposes of distinguishing between 'strong' and 'weak' dependencies
* Empty `var` declarations for exported bindings are omitted

## 0.9.1

* Much faster statement insertion (fixes major 0.9.0 performance regression)

## 0.9.0

* BREAKING - `resolvePath` is now `resolveId`. The returned `id` (which by default is a filepath) is passed to the `load` function, which can optionally be overridden, and which is applied to all modules including the entry module. This allows custom resolver and loading logic for integration with third party systems (e.g. JSPM) or, eventually, in-browser usage ([#30](https://github.com/rollup/rollup/issues/30))
* A statement cannot appear after later statements from the same bundle ([#34](https://github.com/rollup/rollup/issues/34))
* Tricky cyclical dependencies are handled ([#36](https://github.com/rollup/rollup/issues/36))
* `sourcemap` option is used by CLI (was omitted previously)

## 0.8.3

* Correctly rename functions that have arguments with the same name ([#32](https://github.com/rollup/rollup/issues/32))
* Ensure unused default exports are given a legal name ([#33](https://github.com/rollup/rollup/issues/33))

## 0.8.2

* Support `moduleId` and `moduleName` via CLI ([#24](https://github.com/rollup/rollup/issues/24))

## 0.8.1

* Anonymous functions that are exported as default are converted to named function declarations for correct hoisting, rather than being bound to functions ([#29](https://github.com/rollup/rollup/issues/29))
* Automatically-generated default export names are deconflicted with local definitions ([#29](https://github.com/rollup/rollup/issues/29))

## 0.8.0

* Top-level variable declarations with multiple declarators are split up, to avoid unnecessary code importing and incorrectly-ordered statements ([#26](https://github.com/rollup/rollup/issues/26))
* `this` at the top level is `undefined` ([#28](https://github.com/rollup/rollup/issues/28))

## 0.7.8

* Avoid using `path.parse` - unsupported in node 0.10

## 0.7.7

* Promise `source-map-support` from `devDependencies` to `dependencies` ([#23](https://github.com/rollup/rollup/issues/23))

## 0.7.6

* Better placement of `export default` statements ([#21](https://github.com/rollup/rollup/issues/21))
* Prevent function calls and property assignments from being treated as rebinding for sake of unbound default exports
* Add `--external foo,bar,baz` option to CLI (equivalent to `external: ['foo', 'bar', 'baz']`)
* Add CLI tests

## 0.7.5

* Prevent accidental conflicts with the global namespace ([#20](https://github.com/rollup/rollup/issues/20))

## 0.7.4

* More precise statement re-ordering to satisfy `export default` constraint (fixes bug introduced in 0.7.3)

## 0.7.3

* Default exports are not bound. To enable this, statements within a module are sorted to retain their original order ([#15](https://github.com/rollup/rollup/issues/15))
* Better positioning of comments ([#14](https://github.com/rollup/rollup/issues/14))
* Various fixes to get Travis-CI rigged up

## 0.7.2

* Fix sourcemap paths on Windows ([#6](https://github.com/rollup/rollup/pull/6))

## 0.7.1

* Named functions can be used as default exports from a bundle
* Method calls are assumed to mutate the owner (i.e. `foo.bar()` mutates `foo`) ([#13](https://github.com/rollup/rollup/issues/13))
* `options.indent` can be used to control indentation of resulting bundle. `options.true` (default) means 'auto', `options.false` means empty string. Alternatively specify whitespace e.g. `'  '` or `'\t'` ([#5](https://github.com/rollup/rollup/issues/5))

## 0.7.0

* Ensure statements are always separated by a newline ([#9](https://github.com/rollup/rollup/pull/9))
* Use CommonJS `exports` correctly (UMD exports)
* Throw error if `moduleName` is required but missing (UMD exports)
* Attach IIFE global to `this` rather than `window`
* Allow names inside bundle to the the names of `Object.prototype` properties ([#12](https://github.com/rollup/rollup/pull/12))
* Keep exports live ([#11](https://github.com/rollup/rollup/pull/11))

## 0.6.5

* Add sourceMappingURL comment to code, as appropriate
* Higher resolution sourcemaps

## 0.6.4

* Fix CJS bundling with default export

## 0.6.3

* Fix exports and external module imports with some output formats
* Fix endless cycle bug on Windows ([#3](https://github.com/rollup/rollup/pull/3)) - thanks @Bobris

## 0.6.2

* Permit assignments to properties of imported bindings

## 0.6.1

* Support for basic transformers

## 0.6.0

* BREAKING - `rollup.rollup` and `bundle.write` both take a single options argument
* BREAKING - external modules must be declared upfront with `options.external: [...]`
* Non-relative module paths will be resolved by looking for `jsnext:main` fields in the appropriate `package.json` files. This behaviour can be overridden by passing an alternative `resolveExternal` function
* Fix sourcemap options
* Include CLI files in npm package (duh)

## 0.5.0

* Command line interface
* Sourcemap generation
* Correct behaviour with `export { x as y } from 'z'`

## 0.4.1

* More import name deconflicting

## 0.4.0

* Self-hosting! `rollup.rollup` now rolls up rollup
* Fix bug with comments inside a statement later being appended to it
* Prevent shadowing of external modules
* Rewrite computed property identifiers where necessary
* Preserve original statement order where possible
* Internal refactoring

## 0.3.1

* Saner deconflicting
* Rename namespace imports from external modules correctly

## 0.3.0

* Basic functionality present, mostly spec-compliant

## 0.2.1

* Include dist files in npm package (duh)

## 0.2.0

* First release capable of doing anything useful
* Still lots of basic functionality missing

## 0.1.0

* Initial experiment
