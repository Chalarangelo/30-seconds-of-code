# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

## [7.14.3] - 2019-07-23

### Fixed
* Fix [`prop-types`][] to ignore validation when Flow indexers are used ([#2330][] @yannickcr)
* Fix error being thrown after the first warning when react version cannot be detected ([#2336][] @abhishekdev)
* Fix component detection when `memo` and `forwardRef` are used together ([#2349][] @yannickcr)

### Changed
* Documentation improvements (@ljharb, [#2354][] @golopot)

[7.14.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.14.2...v7.14.3
[#2330]: https://github.com/yannickcr/eslint-plugin-react/issues/2330
[#2336]: https://github.com/yannickcr/eslint-plugin-react/pull/2336
[#2349]: https://github.com/yannickcr/eslint-plugin-react/issues/2349
[#2354]: https://github.com/yannickcr/eslint-plugin-react/pull/2354

## [7.14.2] - 2019-06-24

### Fixed
* Fix [`prop-types`][] crash on for...of destructuring ([#2326][] @yannickcr)

[7.14.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.14.1...v7.14.2
[#2326]: https://github.com/yannickcr/eslint-plugin-react/issues/2326

## [7.14.1] - 2019-06-24

### Fixed
* Fix [`prop-types`][] crash on multiple destructuring ([#2319][] @golopot)

[7.14.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.14.0...v7.14.1
[#2319]: https://github.com/yannickcr/eslint-plugin-react/issues/2319

## [7.14.0] - 2019-06-23

### Added
* Add [`jsx-curly-newline`][] rule ([#1493][] @golopot)
* Add support for nested destructuring to [`prop-types`][] ([#296][] [#1422][] @golopot)
* Add support for variables defined as props to [`prop-types`][] and [`no-unused-prop-types`][] ([#442][] [#833][] [#1002][] [#1116][] [#1257][] [#1764][] @golopot)
* Add `checkFragmentShorthand` option to [`jsx-key`][] ([#2316][] @kaykayehnn)

### Fixed
* Fix [`no-did-mount-set-state`][] and [`no-did-update-set-state`][] to handle cDU and cDM defined as class properties ([#1595][] @jaaberg)
* Fix [`sort-prop-types`][] cash when a shape PropType is defined in a variable ([#1749][] @alexzherdev)
* Fix [`no-unused-state`][] false positive when using state of non-lifecycle method ([#2274][] @golopot)
* Fix [`static-property-placement`][] false positive when accessing static property inside method ([#2283][] @dmason30)
* Fix [`prop-type`][] detection for annotated props with default value ([#2298][] @yannickcr)

### Changed
* Add ESLint 6.0.0 as valid peerDependency (@yannickcr)
* Improve [`no-render-return-value`][] performance ([#2259][] @golopot)
* Change [`jsx-sort-props`][] to report errors only on the identifier ([#2312][] @MrHen)
* Change to warn only once if react version cannot be detected ([#2276][] @ljharb)
* Documentation improvements ([#2263][] @dimitropoulos, [#2262][] @ybiquitous, [#2295][] @battaglr, [#2302][] @Jason-Cooke, [#2303][] @golopot)
* Code refactoring ([#2265][] [#2267][] [#2286][] [#2294][] @golopot, @ljharb)
* Tests improvements ([#2304][] [#1047][] @golopot, @yannickcr)

[7.14.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.13.0...v7.14.0
[#296]: https://github.com/yannickcr/eslint-plugin-react/issues/296
[#442]: https://github.com/yannickcr/eslint-plugin-react/issues/442
[#833]: https://github.com/yannickcr/eslint-plugin-react/issues/833
[#1002]: https://github.com/yannickcr/eslint-plugin-react/issues/1002
[#1047]: https://github.com/yannickcr/eslint-plugin-react/issues/1047
[#1116]: https://github.com/yannickcr/eslint-plugin-react/issues/1116
[#1257]: https://github.com/yannickcr/eslint-plugin-react/issues/1257
[#1422]: https://github.com/yannickcr/eslint-plugin-react/issues/1422
[#1493]: https://github.com/yannickcr/eslint-plugin-react/issues/1493
[#1595]: https://github.com/yannickcr/eslint-plugin-react/issues/1595
[#1749]: https://github.com/yannickcr/eslint-plugin-react/issues/1749
[#1764]: https://github.com/yannickcr/eslint-plugin-react/issues/1764
[#2259]: https://github.com/yannickcr/eslint-plugin-react/pull/2259
[#2262]: https://github.com/yannickcr/eslint-plugin-react/pull/2262
[#2263]: https://github.com/yannickcr/eslint-plugin-react/pull/2263
[#2265]: https://github.com/yannickcr/eslint-plugin-react/pull/2265
[#2267]: https://github.com/yannickcr/eslint-plugin-react/pull/2267
[#2274]: https://github.com/yannickcr/eslint-plugin-react/pull/2274
[#2276]: https://github.com/yannickcr/eslint-plugin-react/issues/2276
[#2283]: https://github.com/yannickcr/eslint-plugin-react/issues/2283
[#2286]: https://github.com/yannickcr/eslint-plugin-react/pull/2286
[#2294]: https://github.com/yannickcr/eslint-plugin-react/pull/2294
[#2295]: https://github.com/yannickcr/eslint-plugin-react/pull/2295
[#2298]: https://github.com/yannickcr/eslint-plugin-react/issues/2298
[#2302]: https://github.com/yannickcr/eslint-plugin-react/pull/2302
[#2303]: https://github.com/yannickcr/eslint-plugin-react/pull/2303
[#2304]: https://github.com/yannickcr/eslint-plugin-react/pull/2304
[#2312]: https://github.com/yannickcr/eslint-plugin-react/issues/2312
[#2316]: https://github.com/yannickcr/eslint-plugin-react/pull/2316

## [7.13.0] - 2019-05-03

### Added
* Make [`jsx-sort-props`][] fully fixable ([#2250][], @guliashvili)
* [`boolean-prop-naming`][]: add `validateNested` option to validate shape prop names ([#2234][], @pawelnvk)
* add [`static-property-placement`][] rule ([#2193][], @dmason30)
* add "detect" for flow version ([#2233][], @jedwards1211)
* [`jsx-indent`][]: Add `indentLogicalExpressions` option ([#2227][], @mdnsk)
* add [`jsx-props-no-spreading`][] ([#2191][], @ashbhir)
* [`no-string-refs`][]: Added `noTemplateLiteral` option ([#2167][], @jenil94)
* add `linkComponents` setting ([#2116][], @gbakernet)
* [`jsx-no-target-blank`][]: add support for `linkComponents` setting ([#2116][], @gbakernet)
* Add [`state-in-constructor`][] rule ([#1945][], @lukyth)
* Add [`prefer-read-only-props`][] rule ([#2110][], @golopot)
* [`no-unescaped-entities`][]: more friendly error message; add config to adjust ([#2016][], @stevemao)

### Fixed
* [`jsx-props-no-multi-spaces`][]: support generic components (ts) ([#2256][], @mateuszsokola)
* [`prop-types`][]: fix case with destructuring and default param ([#2246][], @golopot)
* [`prefer-stateless-function`][]: Ignoring pure components without props and context usage ([#2238][], @pawelnvk)
* `propTypes`: resolveSuperParameterPropsType: add null check ([#2232][], @jedwards1211)
* [`self-closing-comp`][]: stop reporting single-line spaces ([#2210][], @golopot)
* [`require-render-return`][]: more accurate report location ([#2229][], @golopot)
* [`sort-prop-types`][]: Fix sorting props with numeric keys ([#2230][], @pawelnvk)
* [`display-name`][]: fix false negative around nested functions ([#2225][], @dwelle)
* [`no-unknown-property`][]: fix case like `<Foo.bar>` ([#2207][], @golopot)
* [`jsx-curly-brace-presence`][]: accept multiline template string ([#2203][], @golopot)
* [`jsx-one-expression-per-line`][]: fix when using tabs ([#2198][], @Ohar)
* [`prop-types`][]: Fix false positive on computed member expression ([#2202][], @golopot)
* [`jsx-sort-default-props`][]: fix case with spread ([#2182][], @VincentLanglet)
* [`no-this-in-sfc`][]: Fix false positive on SFC defined as object property ([#2147][], @yannickcr)
* [`sort-comp`][]: correctly recognize instance variables declared without explicit value ([#2183][], @yannickcr)
* [`no-unused-state`][]: fix set state callback destructing & state use inside callback ([#2151][], @barakyosi)
* [`no-multi-comp`][]: correctly ignore wrapped stateless components: ([#2145][], @yannickcr)
* [`display-name`][]: avoid crash on for..of ([#2137][], @ljharb)

### Changed
* [Docs] [`no-access-state-in-setstate`][]: Use syntax highlighting for examples ([#2160][], @pReya)
* [Docs] [`jsx-fragments`][]: add "fixable" note ([#2143][], @joshunger)
* [Docs] Added shared settings info, React version default note ([#2180][], @samsch)
* [Tests] [`jsx-curly-spacing`][]: add regression test case ([#2206][], @ColCh)

[7.13.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.12.4...v7.13.0
[#2256]: https://github.com/yannickcr/eslint-plugin-react/pull/2256
[#2250]: https://github.com/yannickcr/eslint-plugin-react/pull/2250
[#2246]: https://github.com/yannickcr/eslint-plugin-react/pull/2246
[#2238]: https://github.com/yannickcr/eslint-plugin-react/pull/2238
[#2234]: https://github.com/yannickcr/eslint-plugin-react/pull/2234
[#2233]: https://github.com/yannickcr/eslint-plugin-react/pull/2233
[#2232]: https://github.com/yannickcr/eslint-plugin-react/pull/2232
[#2230]: https://github.com/yannickcr/eslint-plugin-react/pull/2230
[#2229]: https://github.com/yannickcr/eslint-plugin-react/pull/2229
[#2227]: https://github.com/yannickcr/eslint-plugin-react/pull/2227
[#2225]: https://github.com/yannickcr/eslint-plugin-react/pull/2225
[#2210]: https://github.com/yannickcr/eslint-plugin-react/pull/2210
[#2207]: https://github.com/yannickcr/eslint-plugin-react/pull/2207
[#2206]: https://github.com/yannickcr/eslint-plugin-react/pull/2206
[#2203]: https://github.com/yannickcr/eslint-plugin-react/pull/2203
[#2202]: https://github.com/yannickcr/eslint-plugin-react/pull/2202
[#2198]: https://github.com/yannickcr/eslint-plugin-react/pull/2198
[#2193]: https://github.com/yannickcr/eslint-plugin-react/pull/2193
[#2191]: https://github.com/yannickcr/eslint-plugin-react/pull/2191
[#2183]: https://github.com/yannickcr/eslint-plugin-react/issues/2183
[#2182]: https://github.com/yannickcr/eslint-plugin-react/pull/2182
[#2180]: https://github.com/yannickcr/eslint-plugin-react/pull/2180
[#2167]: https://github.com/yannickcr/eslint-plugin-react/pull/2167
[#2147]: https://github.com/yannickcr/eslint-plugin-react/issues/2147
[#2145]: https://github.com/yannickcr/eslint-plugin-react/issues/2145
[#2143]: https://github.com/yannickcr/eslint-plugin-react/pull/2143
[#2137]: https://github.com/yannickcr/eslint-plugin-react/issues/2137
[#2116]: https://github.com/yannickcr/eslint-plugin-react/pull/2116
[#2110]: https://github.com/yannickcr/eslint-plugin-react/pull/2110
[#2016]: https://github.com/yannickcr/eslint-plugin-react/pull/2016
[#1945]: https://github.com/yannickcr/eslint-plugin-react/pull/1945

## [7.12.4] - 2019-01-16

### Fixed
* [`no-unused-prop-types`][]: avoid a crash ([#2131][], @ljharb)
* [`prop-types`][]: avoid further crashes from nonexistent nodes in unusedPropTypes ([#2127][], @ljharb)
* [`prop-types`][]: Read name of callee object ([#2125][], @CrOrc)
* [`prop-types`][]: Ignore reassignments when matching props declarations with components ([#2051][], [#1957][], @yannickcr)
* [`prop-types`][], [`no-unused-prop-types`][], [`require-default-props`][]: Detect components with return statement in switch/case ([#2118][], @yannickcr)

### Changed
* [`prop-types`][], [`no-typos`][]: add passing test cases ([#2123][], [#2128][], [#2136][], [#2134][], @ljharb)

[7.12.4]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.12.3...v7.12.4
[#2136]: https://github.com/yannickcr/eslint-plugin-react/issues/2136
[#2134]: https://github.com/yannickcr/eslint-plugin-react/issues/2134
[#2131]: https://github.com/yannickcr/eslint-plugin-react/issues/2131
[#2128]: https://github.com/yannickcr/eslint-plugin-react/issues/2128
[#2127]: https://github.com/yannickcr/eslint-plugin-react/issues/2127
[#2125]: https://github.com/yannickcr/eslint-plugin-react/pull/2125
[#2123]: https://github.com/yannickcr/eslint-plugin-react/issues/2123
[#2118]: https://github.com/yannickcr/eslint-plugin-react/issues/2118
[#2051]: https://github.com/yannickcr/eslint-plugin-react/issues/2051
[#1957]: https://github.com/yannickcr/eslint-plugin-react/issues/1957

## [7.12.3] - 2019-01-04

### Fixed
* [`jsx-indent`][]: Prevent crash on valueless props ([#2120][], @jomasti)
* [`jsx-fragments`][]: avoid crashing on self-closing fragments ([#2113][], @alexzherdev)
* [`no-unused-prop-types`][]: Fix propType detection inside class bodies ([#2115][], @drx)
* [`no-unused-prop-types`][]: fix issue with propTypes misclassifying props ([#2111][], @drx)
* [`display-name`][]: fix false positive for `React.memo` ([#2109][], @jomasti)

### Changed
* [Docs] add a missing comma in the JSON settings ([#2117][], @haideralsh)
* [Docs] update README to document React version detection ([#2114][], @mohsinulhaq)

[7.12.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.12.2...v7.12.3
[#2120]: https://github.com/yannickcr/eslint-plugin-react/issues/2120
[#2117]: https://github.com/yannickcr/eslint-plugin-react/issues/2117
[#2115]: https://github.com/yannickcr/eslint-plugin-react/issues/2115
[#2114]: https://github.com/yannickcr/eslint-plugin-react/issues/2114
[#2113]: https://github.com/yannickcr/eslint-plugin-react/issues/2113
[#2111]: https://github.com/yannickcr/eslint-plugin-react/issues/2111
[#2109]: https://github.com/yannickcr/eslint-plugin-react/issues/2109

## [7.12.2] - 2019-01-02

### Fixed
* [`prop-types`][]: avoid crash on used prevProps ([#2095][], @ljharb)
* Version warning: Link does not end with '.' ([#2103][], @yoyo837))
* [`forbid-prop-types`][]: fix crash with propWrapper check on MemberExpressions ([#2104][], @ljharb)

[7.12.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.12.1...v7.12.2
[#2104]: https://github.com/yannickcr/eslint-plugin-react/issues/2104
[#2103]: https://github.com/yannickcr/eslint-plugin-react/pull/2103
[#2095]: https://github.com/yannickcr/eslint-plugin-react/issues/2095

## [7.12.1] - 2019-01-01

### Fixed
* [`no-unused-state`][]: Fix crash with class fields ([#2098][], @jomasti)
* [`prop-types`][]: Fix false positives inside lifecycle methods ([#2099][], @jomasti)
* [`jsx-max-depth`][]: avoid a crash ([#2102][], @ljharb)
* [`jsx-wrap-multilines`][]: avoid crash when no trailing newline ([#2100][], @ljharb)

### Changed
* Fix CHANGELOG.md ([#2097][], @alexzherdev)

[7.12.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.12.0...v7.12.1
[#2102]: https://github.com/yannickcr/eslint-plugin-react/issues/2102
[#2100]: https://github.com/yannickcr/eslint-plugin-react/issues/2100
[#2099]: https://github.com/yannickcr/eslint-plugin-react/pull/2099
[#2098]: https://github.com/yannickcr/eslint-plugin-react/pull/2098
[#2097]: https://github.com/yannickcr/eslint-plugin-react/pull/2097

## [7.12.0] - 2018-12-27

### Added
* [`no-typos`]: Support createClass ([#1828][], @alexzherdev)
* Support detecting React.forwardRef/React.memo ([#2089][], @jomasti)
* [`jsx-indent`][]: add `checkAttributes` option for JSX attribute indentation ([#2086][], @jomasti)
* Change allowed `propWrapperFunctions` setting values ([#2065][], @jomasti)
* add [`jsx-fragments`][] rule to enforce fragment syntax ([#1994][], @alexzherdev)
* Support "detect" option for React version setting ([#1978][], @alexzherdev)
* Support shorthand fragment syntax in many rules ([#1956][], @alexzherdev)
* [`jsx-no-literals`][]: print node value in warning message ([#2008][], @jlgonzalezdev)

### Fixed
* [`jsx-max-depth`][]: Fix depth of JSX siblings in a JSXEpressionContainer ([#1824][], @alexzherdev)
* [`no-array-index-key`][]: fix in React.Children methods ([#2085][], @himynameisdave)
* [`no-unused-state`][]: handle functional setState ([#2084][], @jomasti)
* version errors should log to stderr, not stdout ([#2082][], @ljharb)
* [`no-deprecated`][]: Disable legacy lifecycle methods linting for now ([#2069][], @sergei-startsev)
* ensure that react and flow versions can be numbers ([#2056][], @ljharb)
* [`forbid-foreign-prop-types`][]: ensure `allowInPropTypes` option applies to class fields ([#2040][], @Sheile)
* [`jsx-wrap-multilines`][]: catch single missing newlines ([#1984][], @MrHen)
* [`jsx-first-prop-new-line`][]: Fix for parsers (like TypeScript) ([#2026][], @HauptmannEck)
* [`sort-comp`][]: Fix fixer in case of more than 10 props ([#2012][], @tihonove)
* [`no-unused-state`][] Don't depend on state parameter name ([#1829][], @alexzherdev)
* [`no-this-in-sfc`][] fix for class properties ([#1995][], @sergei-startsev)
* [`no-this-in-sfc`][] fix rule behavior for arrow functions inside a class field ([#1989][], @sergei-startsev)
* [`destructuring-assignment`][]: handle nested props usage ([#1983][], @alexzherdev)
* [`sort-prop-types`][]: fix string property order ([#1977][], @metreniuk)
* [`jsx-no-target-blank`][]: don’t crash when there’s no value ([#1949][], @ljharb)
* [`prop-types`][], [`no-unused-prop-types`][]: better handle object spread ([#1939][], @alexzherdev)

### Changed
* [`jsx-fragments`][]: improve message text ([#2032][], @alexzherdev)
* [`no-unsafe`][]: handle all unsafe life-cycle methods ([#2075][], @sergei-startsev)
* [`require-default-props`][]: Change error message naming from singular defaultProp to plural defaultProps ([#2064][], @jseminck)
* [Refactor] Extract used `propTypes` detection ([#1946][], @alexzherdev)
* [Refactor] Extract `defaultProps` detection ([#1942][], @alexzherdev)
* [Refactor] Extract required `propTypes` detection ([#2001][], @alexzherdev)
* [Docs] [`no-did-mount-set-state`][], [`no-did-update-set-state`][], [`no-will-update-set-state`][]: fix docs URLs ([#2090][], @JBallin)
* [Docs] Remove statement on GC in jsx-no-bind ([#2067][], @rickhanlonii)
* [Docs] [`jsx-sort-props`][]: Fix small mistake ([#2044][], @dimitarnestorov)
* [Docs] [`no-unescaped-entities`][]: add more escape examples ([#2015][], @stevemao)
* [Docs] [`display-name`][]: mention default `ignoreTranspilerName` value ([#2002][], @OliverJAsh)
* [Docs] [`jsx-no-target-blank`][]: Add full example ([#1988][], @atomcorp)
* [Docs] Update [`jsx-no-target-blank`][].md ([#1953][], @brunocoelho)
* [Changelog] fix "Ignore class properties" contributor ([#1941][], @alexzherdev)
* [Tests] Remove redundant `require('babel-eslint')` from tests ([#2004][], @sergei-startsev)
* [Tests] [`prop-types`][]: Add tests for prop-types destructuring ([#2029][], @sstern6)
* [Tests] [`display-name`][]: add false positive component detection for destructured createElement ([#1098][], @arian)

[7.12.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.11.1...v7.12.0
[#2090]: https://github.com/yannickcr/eslint-plugin-react/pull/2090
[#2089]: https://github.com/yannickcr/eslint-plugin-react/pull/2089
[#2086]: https://github.com/yannickcr/eslint-plugin-react/pull/2086
[#2085]: https://github.com/yannickcr/eslint-plugin-react/pull/2085
[#2084]: https://github.com/yannickcr/eslint-plugin-react/pull/2084
[#2082]: https://github.com/yannickcr/eslint-plugin-react/issues/2082
[#2075]: https://github.com/yannickcr/eslint-plugin-react/pull/2075
[#2069]: https://github.com/yannickcr/eslint-plugin-react/pull/2069
[#2067]: https://github.com/yannickcr/eslint-plugin-react/pull/2067
[#2065]: https://github.com/yannickcr/eslint-plugin-react/pull/2065
[#2064]: https://github.com/yannickcr/eslint-plugin-react/pull/2064
[#2056]: https://github.com/yannickcr/eslint-plugin-react/issues/2056
[#2044]: https://github.com/yannickcr/eslint-plugin-react/pull/2044
[#2040]: https://github.com/yannickcr/eslint-plugin-react/pull/2040
[#2032]: https://github.com/yannickcr/eslint-plugin-react/pull/2032
[#2029]: https://github.com/yannickcr/eslint-plugin-react/pull/2029
[#2026]: https://github.com/yannickcr/eslint-plugin-react/pull/2026
[#2015]: https://github.com/yannickcr/eslint-plugin-react/pull/2015
[#2012]: https://github.com/yannickcr/eslint-plugin-react/pull/2012
[#2008]: https://github.com/yannickcr/eslint-plugin-react/pull/2008
[#2004]: https://github.com/yannickcr/eslint-plugin-react/pull/2004
[#2002]: https://github.com/yannickcr/eslint-plugin-react/pull/2002
[#2001]: https://github.com/yannickcr/eslint-plugin-react/pull/2001
[#1995]: https://github.com/yannickcr/eslint-plugin-react/pull/1995
[#1994]: https://github.com/yannickcr/eslint-plugin-react/pull/1994
[#1989]: https://github.com/yannickcr/eslint-plugin-react/pull/1989
[#1988]: https://github.com/yannickcr/eslint-plugin-react/pull/1988
[#1984]: https://github.com/yannickcr/eslint-plugin-react/pull/1984
[#1983]: https://github.com/yannickcr/eslint-plugin-react/pull/1983
[#1978]: https://github.com/yannickcr/eslint-plugin-react/pull/1978
[#1977]: https://github.com/yannickcr/eslint-plugin-react/pull/1977
[#1956]: https://github.com/yannickcr/eslint-plugin-react/pull/1956
[#1953]: https://github.com/yannickcr/eslint-plugin-react/pull/1953
[#1949]: https://github.com/yannickcr/eslint-plugin-react/issues/1949
[#1946]: https://github.com/yannickcr/eslint-plugin-react/pull/1946
[#1942]: https://github.com/yannickcr/eslint-plugin-react/pull/1942
[#1941]: https://github.com/yannickcr/eslint-plugin-react/pull/1941
[#1939]: https://github.com/yannickcr/eslint-plugin-react/pull/1939
[#1829]: https://github.com/yannickcr/eslint-plugin-react/pull/1829
[#1828]: https://github.com/yannickcr/eslint-plugin-react/pull/1828
[#1824]: https://github.com/yannickcr/eslint-plugin-react/pull/1824
[#1098]: https://github.com/yannickcr/eslint-plugin-react/pull/1098

## [7.11.1] - 2018-08-14
### Fixed
* stop crashing when assigning to propTypes ([#1932][], @alexzherdev)

### Changed
* Fix changelog links ([#1926][], @ferhatelmas)
* Fix changelog links ([#1929][], @alexzherdev)

[7.11.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.11.0...v7.11.1
[#1932]: https://github.com/yannickcr/eslint-plugin-react/pull/1932
[#1929]: https://github.com/yannickcr/eslint-plugin-react/pull/1929
[#1926]: https://github.com/yannickcr/eslint-plugin-react/pull/1926

## [7.11.0] - 2018-08-13
### Added
* [`jsx-one-expression-per-line`][]: add "allow" option ([#1924][], @alexzherdev)
* [`sort-prop-types`][]: add autofix ([#1891][], @finnp)
* [`jsx-no-bind`][]: Add ignoreDOMComponents option ([#1868][], @alexzherdev)
* Output a warning if React version is missing in settings ([#1857][], @alexzherdev)

### Fixed
* [`destructuring-assignment`][]: Ignore class properties ([#1909][], @alexandernanberg)
* [`destructuring-assignment`][], component detection: ignore components with confidence = 0 ([#1907][], @alexzherdev)
* [`boolean-prop-naming`][]: Handle inline Flow type ([#1905][], @alexzherdev)
* [`jsx-props-no-multi-spaces`][]: Handle member expressions ([#1890][], @alexzherdev)
* [`sort-comp`][]: Allow methods to belong to any matching group ([#1858][], @nosilleg)
* [`jsx-sort-props`][]: Fix `reservedFirst` ([#1883][], @fleischie)
* [`prop-types`][]: (flow) Stop crashing on undefined or null properties ([#1860][], @nicholas-l)
* [`no-unknown-property`][]: Make attribute "charset" valid ([#1863][], @silvenon)
* [`no-deprecated`][]: report identifier AST node instead of the class node ([#1854][], @jsnajdr)
* [`button-has-type`][]: Account for pragma ([#1851][], @alexzherdev)
* [`button-has-type`][]: improve error message when an identifier is used as the value ([#1874][], @ljharb)
* support JSXText nodes alongside Literal nodes (@ljharb)

### Changed
* Extract propTypes detection code ([#1911][], @alexzherdev)
* Fix broken links in changelog ([#1849][], @alexzherdev)
* [`no-unused-state`][]: combine spread visitors (@ljharb)
* [`jsx-one-expression-per-line`][]: Fix JSX Syntax in docs ([#1867][], @peter-mouland)
* [`jsx-max-depth`][], [`jsx-sort-default-props`][]: add missing docs urls ([#1880][], @flyerhzm)
* [`jsx-indent`][]: add test cases ([#1892][], @alexzherdev)
* [`prop-types`][]: add test cases ([#1898][], @alexzherdev)
* Add a helper function for determining function-like expressions ([#1914][], @alexzherdev)
* [`jsx-props-no-multi-spaces`][]: update docs ([#1918][], @BenRichter)

[7.11.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.10.0...v7.11.0
[#1924]: https://github.com/yannickcr/eslint-plugin-react/pull/1924
[#1918]: https://github.com/yannickcr/eslint-plugin-react/pull/1918
[#1914]: https://github.com/yannickcr/eslint-plugin-react/pull/1914
[#1911]: https://github.com/yannickcr/eslint-plugin-react/pull/1911
[#1909]: https://github.com/yannickcr/eslint-plugin-react/pull/1909
[#1907]: https://github.com/yannickcr/eslint-plugin-react/pull/1907
[#1905]: https://github.com/yannickcr/eslint-plugin-react/pull/1905
[#1898]: https://github.com/yannickcr/eslint-plugin-react/pull/1898
[#1892]: https://github.com/yannickcr/eslint-plugin-react/pull/1892
[#1891]: https://github.com/yannickcr/eslint-plugin-react/pull/1891
[#1890]: https://github.com/yannickcr/eslint-plugin-react/pull/1890
[#1883]: https://github.com/yannickcr/eslint-plugin-react/pull/1883
[#1880]: https://github.com/yannickcr/eslint-plugin-react/pull/1880
[#1874]: https://github.com/yannickcr/eslint-plugin-react/issues/1874
[#1868]: https://github.com/yannickcr/eslint-plugin-react/pull/1868
[#1867]: https://github.com/yannickcr/eslint-plugin-react/pull/1867
[#1863]: https://github.com/yannickcr/eslint-plugin-react/pull/1863
[#1860]: https://github.com/yannickcr/eslint-plugin-react/pull/1860
[#1858]: https://github.com/yannickcr/eslint-plugin-react/pull/1858
[#1857]: https://github.com/yannickcr/eslint-plugin-react/pull/1857
[#1854]: https://github.com/yannickcr/eslint-plugin-react/pull/1854
[#1851]: https://github.com/yannickcr/eslint-plugin-react/pull/1851
[#1849]: https://github.com/yannickcr/eslint-plugin-react/pull/1849

## [7.10.0] - 2018-06-24
### Added
* Allow eslint ^5 ([#1843][] @papandreou, @ljharb)
* [`no-unsafe`][] rule ([#1831][], [#1830][] @sergei-startsev)
* [`no-will-update-set-state`][]: Account for `UNSAFE_` methods ([#1845][], [#1844][] @alexzherdev)

### Fixed
* [`no-typos`][]: Fix static propTypes handling ([#1827][], [#1677][] @alexzherdev)
* [`destructuring-assignment`][]: Allow LHS ([#1825][], [#1728][] @alexzherdev)
* [`no-unused-prop-types`][]: Fix crash when encountering mixed union and intersection flow types ([#1806][] @yannickcr)

### Changed
* Typo fixes in [`jsx-no-target-blank`][] ([#1805][] @ferhatelmas))

[7.10.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.9.1...v7.10.0
[#1845]: https://github.com/yannickcr/eslint-plugin-react/pull/1845
[#1844]: https://github.com/yannickcr/eslint-plugin-react/issues/1844
[#1843]: https://github.com/yannickcr/eslint-plugin-react/pull/1843
[#1831]: https://github.com/yannickcr/eslint-plugin-react/pull/1831
[#1830]: https://github.com/yannickcr/eslint-plugin-react/issues/1830
[#1827]: https://github.com/yannickcr/eslint-plugin-react/pull/1827
[#1825]: https://github.com/yannickcr/eslint-plugin-react/pull/1825
[#1806]: https://github.com/yannickcr/eslint-plugin-react/issues/1806
[#1805]: https://github.com/yannickcr/eslint-plugin-react/pull/1805
[#1728]: https://github.com/yannickcr/eslint-plugin-react/issues/1728
[#1677]: https://github.com/yannickcr/eslint-plugin-react/issues/1677

## [7.9.1] - 2018-06-03
* Nothing was fixed; this is a republish with some updated deps. ([#1804][] @ljharb)

[7.9.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.9.0...v7.9.1
[#1804]: https://github.com/yannickcr/eslint-plugin-react/issues/1804

## [7.9.0] - 2018-06-03
### Added
* Add [`jsx-props-no-multi-spaces`][] rule ([#1755][] @ThiefMaster)
* Add `first` option to [`jsx-indent-props`][] ([#398][] @ThiefMaster)
* Add `enforceDynamicLinks` option to [`jsx-no-target-blank`][] ([#1737][] @kenearley)

### Fixed
* Fix static lifecycle methods validation in [`sort-comp`][] ([#1793][] @lynxtaa)
* Fix crash in [`no-typos`][] when encountering anonymous react imports ([#1796][] @jsg2021)
* Fix ESLint 3 support ([#1779][])

### Changed
* Documentation improvements ([#1794][] @lencioni)
* Update Travis CI configuration to test on multiple ESLint verions

[7.9.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.8.2...v7.9.0
[#1755]: https://github.com/yannickcr/eslint-plugin-react/pull/1755
[#398]: https://github.com/yannickcr/eslint-plugin-react/issues/398
[#1737]: https://github.com/yannickcr/eslint-plugin-react/issues/1737
[#1793]: https://github.com/yannickcr/eslint-plugin-react/issues/1793
[#1796]: https://github.com/yannickcr/eslint-plugin-react/pull/1796
[#1779]: https://github.com/yannickcr/eslint-plugin-react/issues/1779
[#1794]: https://github.com/yannickcr/eslint-plugin-react/pull/1794

## [7.8.2] - 2018-05-13
### Fixed
* Fix crash in [`boolean-prop-naming`][] when encountering a required shape prop type ([#1791][] @pcorpet)

[7.8.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.8.1...v7.8.2
[#1791]: https://github.com/yannickcr/eslint-plugin-react/issues/1791

## [7.8.1] - 2018-05-12
### Fixed
* Fix crash in [`no-deprecated`][] when encountering a class constructor ([#1785][] @taddei)

[7.8.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.8.0...v7.8.1
[#1785]: https://github.com/yannickcr/eslint-plugin-react/issues/1785

## [7.8.0] - 2018-05-11
### Added
* Add support for fragments to [`react-in-jsx-scope`][] ([#1758][])
* Add support for Flow generic PropType to [`require-default-props`][] ([#1724][] @Miziak)
* Add component whitelist option to [`forbid-component-props`][] ([#1732][] @ThiefMaster)
* Add support for React 16.3 lifecycle methods to [`no-unused-prop-types`][] ([#1681][] @bvaughn)
* Add support for React 16.3 lifecycle methods to [`sort-comp`][] ([#1767][] @joe-denea)
* Add support for React 16.3 lifecycle methods to [`no-typos`][]
* Add support for `prevState` and `nextState` to [`no-unused-state`][] ([#1759][])
* Add warnings for `componentWillMount`, `componentWillReceiveProps` and `componentWillUpdate` lifecycle methods in [`no-deprecated`][] ([#1750][] @sergei-startsev)

### Fixed
* Fix [`no-typos`][] false positive on custom `PropType` classes ([#1389][] @brettdh)
* Fix [`boolean-prop-naming`][] to handle required props ([#1389][] @louisscruz)
* Fix [`jsx-curly-brace-presence`][] to allow whitespace JSX container ([#1717][] @sharmilajesupaul)
* Fix [`jsx-no-bind`][] to handle ternary conditions ([#1722][] @gwenaellarmet)

### Changed
* Documentation improvements ([#1699][] @ronanmathew, [#1743][] @ybiquitous, [#1753][] @awthwathje, [#1783][] @chentsulin, [#1703][] @ferhatelmas)

[7.8.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.7.0...v7.8.0
[#1758]: https://github.com/yannickcr/eslint-plugin-react/issues/1758
[#1724]: https://github.com/yannickcr/eslint-plugin-react/issues/1724
[#1732]: https://github.com/yannickcr/eslint-plugin-react/issues/1732
[#1681]: https://github.com/yannickcr/eslint-plugin-react/pull/1681
[#1767]: https://github.com/yannickcr/eslint-plugin-react/issues/1767
[#1759]: https://github.com/yannickcr/eslint-plugin-react/issues/1759
[#1750]: https://github.com/yannickcr/eslint-plugin-react/pull/1750
[#1389]: https://github.com/yannickcr/eslint-plugin-react/issues/1389
[#1717]: https://github.com/yannickcr/eslint-plugin-react/issues/1717
[#1722]: https://github.com/yannickcr/eslint-plugin-react/issues/1722
[#1699]: https://github.com/yannickcr/eslint-plugin-react/pull/1699
[#1743]: https://github.com/yannickcr/eslint-plugin-react/pull/1743
[#1753]: https://github.com/yannickcr/eslint-plugin-react/issues/1753
[#1783]: https://github.com/yannickcr/eslint-plugin-react/pull/1783
[#1703]: https://github.com/yannickcr/eslint-plugin-react/pull/1703

## [7.7.0] - 2018-02-19
### Added
* [`forbid-foreign-prop-types`][]: add `allowInPropTypes` option ([#1655][] @iansu)
* Add [`jsx-max-depth`][] rule ([#1260][] @chriswong)

### Fixed
* [`no-access-state-in-setstate`][]: Exclude references to this.state in setState callback ([#1610][] @pfhayes)
* [`no-danger-with-children`][]: prevent infinite loop ([#1571][] @ljharb)
* [`sort-prop-types`][]: Fix sortShapeProp when shape is not an object literal ([#1669][] @justinanastos)
* [`jsx-child-element-spacing`][]: fix error location ([#1666][] @pfhayes)
* [`no-unused-prop-types`][]: fix for createClass ([#1675][] @yuri-sakharov)
* [`prop-types`][]: include nextProps checking in shouldComponentUpdate ([#1690][] @amerryma)
* [`jsx-curly-spacing`][]: refactor to fix start and end-braces in a single pass ([#1414][] @s-h-a-d-o-w)

### Changed
* [`jsx-child-element-spacing`][]: add missing docs ([#1665][] @pfhayes); fix docs ([#1670][] @SammyM)

[7.7.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.6.1...v7.7.0
[#1690]: https://github.com/yannickcr/eslint-plugin-react/pull/1690
[#1675]: https://github.com/yannickcr/eslint-plugin-react/pull/1675
[#1670]: https://github.com/yannickcr/eslint-plugin-react/pull/1670
[#1669]: https://github.com/yannickcr/eslint-plugin-react/pull/1669
[#1666]: https://github.com/yannickcr/eslint-plugin-react/pull/1666
[#1665]: https://github.com/yannickcr/eslint-plugin-react/pull/1665
[#1655]: https://github.com/yannickcr/eslint-plugin-react/pull/1655
[#1610]: https://github.com/yannickcr/eslint-plugin-react/pull/1610
[#1414]: https://github.com/yannickcr/eslint-plugin-react/pull/1414
[#1260]: https://github.com/yannickcr/eslint-plugin-react/pull/1260
[#1571]: https://github.com/yannickcr/eslint-plugin-react/issues/1571

## [7.6.1] - 2018-01-28
### Fixed
* Flow: fix crash in [`prop-types`][] with recursive type annotations ([#1653][] @jetpacmonkey)
* Fix [`no-unknown-property`][] to properly recognize `crossOrigin` instead of `crossorigin`, and allow it on `link` tags. ([#1659][] @jzDev)
* Fix [`no-access-state-in-setstate`][] to handle object spread ([#1657][] @ljharb)

[7.6.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.6.0...v7.6.1
[#1659]: https://github.com/yannickcr/eslint-plugin-react/pull/1659
[#1657]: https://github.com/yannickcr/eslint-plugin-react/issues/1657
[#1653]: https://github.com/yannickcr/eslint-plugin-react/pull/1653

## [7.6.0] - 2018-01-25
### Added
* Add [`forbid-dom-props`][] rule ([#1562][] @davazp)
* Add [`jsx-child-element-spacing`][] rule ([#1515][] @pfhayes)
* Add [`no-this-in-sfc`][] rule ([#1435][] @jomasti)
* Add [`jsx-sort-default-props`][] rule ([#281][] @b0gok)
* Add `message` option to [`boolean-prop-naming`][] ([#1588][] @louisscruz)
* Add `beforeClosing` option to [`jsx-tag-spacing`][] ([#1396][] @cjskillingstad)
* Add `instance-methods` and `instance-variables` to [`sort-comp`][] ([#599][] @RDGthree)
* Add `propWrapperFunctions` support for [`boolean-prop-naming`][] ([#1478][] @jomasti)
* Add warning for `React.addons.TestUtils` in [`no-deprecated`][] ([#1644][] @nirnaor)
* Add URL to rule documentation to the rules metadata ([#1635][] @Arcanemagus)

### Fixed
* Fix crashes in [`no-access-state-in-setstate`][] ([#1559][] @jomasti, [#1611][] @pfhayes)
* Fix crash in [`require-optimization`][] when encountering arrays with empty items as values in object ([#1621][] @kamataryo)
* Fix crash in [`no-unused-prop-types`][] when passing an empty function as a PropType ([#1542][] [#1581][] @kevinzwhuang)
* Fix crash in [`no-typos`][] when using `PropType.shape` without arguments ([#1471][] @mrichmond)
* Fix crash when using Unions in flow propTypes ([#1468][] @justinanastos)
* Fix missing meta in [`jsx-tag-spacing`][] ([#1650][] @flyerhzm)
* Fix [`no-unused-state`][] to detect usage of `this.state` as an object ([#1572][])
* Fix [`no-access-state-in-setstate`][] to detect when the `state` variable is destructured from `this.state` ([#1597][] @jaaberg)
* Fix [`jsx-no-literals`][] to correctly find string literals part of BinaryExpressions ([#1511][] @jaaberg)
* Fix [`no-typos`][] false positive on custom propTypes with isRequired ([#1607][] @lfades)
* Fix [`prop-types`][] to check for `nextProps` in `componentWillReceiveProps` ([#1636][] @xjmdoo)
* Fix [`no-unknown-property`][] to not pascal-casing `crossorigin` attribute and only allow it on script/img/video ([#1642][] @ljharb)

### Changed
* Improve [`jsx-wrap-multilines`][] auto fix ([#1576][] @sharmilajesupaul)
* Export `defaultConfig` from [`sort-comp`][] rule for programmatic use ([#1578][] @Andarist)
* Documentation improvements ([#1552][] @TSMMark, [#1566][] @lukeapage, [#1624][] @alexilyaev, @ljharb)
* Update dependencies (@ljharb)

[7.6.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.5.1...v7.6.0
[#1562]: https://github.com/yannickcr/eslint-plugin-react/pull/1562
[#1515]: https://github.com/yannickcr/eslint-plugin-react/issues/1515
[#1435]: https://github.com/yannickcr/eslint-plugin-react/issues/1435
[#281]: https://github.com/yannickcr/eslint-plugin-react/issues/281
[#1588]: https://github.com/yannickcr/eslint-plugin-react/pull/1588
[#1396]: https://github.com/yannickcr/eslint-plugin-react/issues/1396
[#599]: https://github.com/yannickcr/eslint-plugin-react/issues/599
[#1478]: https://github.com/yannickcr/eslint-plugin-react/pull/1478
[#1644]: https://github.com/yannickcr/eslint-plugin-react/issues/1644
[#1635]: https://github.com/yannickcr/eslint-plugin-react/pull/1635
[#1559]: https://github.com/yannickcr/eslint-plugin-react/issues/1559
[#1611]: https://github.com/yannickcr/eslint-plugin-react/pull/1611
[#1621]: https://github.com/yannickcr/eslint-plugin-react/pull/1621
[#1542]: https://github.com/yannickcr/eslint-plugin-react/issues/1542
[#1581]: https://github.com/yannickcr/eslint-plugin-react/issues/1581
[#1471]: https://github.com/yannickcr/eslint-plugin-react/issues/1471
[#1468]: https://github.com/yannickcr/eslint-plugin-react/issues/1468
[#1650]: https://github.com/yannickcr/eslint-plugin-react/pull/1650
[#1572]: https://github.com/yannickcr/eslint-plugin-react/issues/1572
[#1597]: https://github.com/yannickcr/eslint-plugin-react/issues/1597
[#1511]: https://github.com/yannickcr/eslint-plugin-react/issues/1511
[#1607]: https://github.com/yannickcr/eslint-plugin-react/issues/1607
[#1636]: https://github.com/yannickcr/eslint-plugin-react/issues/1636
[#1642]: https://github.com/yannickcr/eslint-plugin-react/issues/1642
[#1576]: https://github.com/yannickcr/eslint-plugin-react/pull/1576
[#1578]: https://github.com/yannickcr/eslint-plugin-react/pull/1578
[#1552]: https://github.com/yannickcr/eslint-plugin-react/pull/1552
[#1566]: https://github.com/yannickcr/eslint-plugin-react/pull/1566
[#1624]: https://github.com/yannickcr/eslint-plugin-react/pull/1624

## [7.5.1] - 2017-11-19
### Fixed
* Fix [`jsx-no-bind`][] crash ([#1543][] @jomasti)
* Fix [`no-unused-prop-types`][] crash ([#1542][] @jomasti)

### Changed
* Documentation improvements ([#1546][] @jseminck)

[7.5.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.5.0...v7.5.1
[#1543]: https://github.com/yannickcr/eslint-plugin-react/issues/1543
[#1542]: https://github.com/yannickcr/eslint-plugin-react/issues/1542
[#1546]: https://github.com/yannickcr/eslint-plugin-react/issues/1546

## [7.5.0] - 2017-11-18
### Added
* Add [`jsx-one-expression-per-line`][] rule ([#1497][] @TSMMark)
* Add [`destructuring-assignment`][] rule ([#1462][] @DianaSuvorova)
* Add [`no-access-state-in-setstate`][] rule ([#1374][] @jaaberg)
* Add [`button-has-type`][] rule ([#1525][] @Hypnosphi)
* Add warnings for `React.DOM` factories in [`no-deprecated`][] ([#1530][] @backjo)
* Add `sortShapeProp` option to [`sort-prop-types`][] ([#1476][] @jomasti)
* Add `parens-new-line` option to [`jsx-wrap-multilines`][] ([#1475][] @jomasti)
* Add `checkContextTypes` and `checkChildContextTypes` options to [`forbid-prop-types`][] ([#1533][] @jomasti)
* Add `forbidDefaultForRequired ` option to [`require-default-props`][] ([#1524][] @jomasti)
* Add new nodes support to [`jsx-wrap-multilines`][] ([#1384][] @evgeny-petukhov)

### Fixed
* Fix [`jsx-curly-brace-presence`][] auto fix by bailing out when some chars exist ([#1479][] [#1449][] @jackyho112)
* Fix [`boolean-prop-naming`][] crash with Object spread ([#1485][] @track0x1)
* Fix [`no-unused-state`][] to correctly handle arrow function class method ([#1363][] @jackyho112)
* Fix incompatibility with [`typescript-eslint-parser`](https://github.com/eslint/typescript-eslint-parser) ([#1496][] @timothykang)
* Fix [`jsx-no-bind`][] to only warn for props and account for variable declaration ([#1444][] [#1395][] [#1417][] @jackyho112)
* Fix [`no-unused-prop-types`][] to handle props usage in custom prop validators ([#1518][] @petersendidit)
* Fix [`prefer-stateless-function`][] to account for `contextTypes` and `defaultProps` ([#1521][] @jomasti)
* Fix [`jsx-no-comment-textnodes`][] to not warn when using two slashes via html entities at the beginning of a literal ([#1517][] @jomasti)
* Fix [`default-props-match-prop-types`][] crash ([#1499][] @jomasti)
* Fix [`no-unused-prop-types`][] to handle props used in the `setState` update callback ([#1507][] @petersendidit)
* Fix alignment bug in [`jsx-indent`][] ([#1246][] @jseminck)

### Changed
* Documentation improvements ([#1438][] @jseminck, [#1464][] @AlaaAttya, [#1494][] @piperchester, [#1467][] @felicio, [#1512][] @adam-golab)
* Code refactoring ([#1423][] [#1398][] @jseminck, [#1500][] [#1514][] @Aladdin-ADD, [#1502][] @SimenB, [#1508][] [#1526][] @jomasti, @ljharb)
* Update dependencies ([#1450][] @leebyron, @ljharb)

[7.5.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.4.0...v7.5.0
[#1497]: https://github.com/yannickcr/eslint-plugin-react/pull/1497
[#1462]: https://github.com/yannickcr/eslint-plugin-react/pull/1462
[#1374]: https://github.com/yannickcr/eslint-plugin-react/pull/1374
[#1525]: https://github.com/yannickcr/eslint-plugin-react/pull/1525
[#1530]: https://github.com/yannickcr/eslint-plugin-react/pull/1530
[#1476]: https://github.com/yannickcr/eslint-plugin-react/issues/1476
[#1475]: https://github.com/yannickcr/eslint-plugin-react/pull/1475
[#1533]: https://github.com/yannickcr/eslint-plugin-react/pull/1533
[#1524]: https://github.com/yannickcr/eslint-plugin-react/issues/1524
[#1384]: https://github.com/yannickcr/eslint-plugin-react/pull/1384
[#1479]: https://github.com/yannickcr/eslint-plugin-react/issues/1479
[#1449]: https://github.com/yannickcr/eslint-plugin-react/issues/1449
[#1485]: https://github.com/yannickcr/eslint-plugin-react/pull/1485
[#1363]: https://github.com/yannickcr/eslint-plugin-react/issues/1363
[#1496]: https://github.com/yannickcr/eslint-plugin-react/pull/1496
[#1444]: https://github.com/yannickcr/eslint-plugin-react/issues/1444
[#1395]: https://github.com/yannickcr/eslint-plugin-react/issues/1395
[#1417]: https://github.com/yannickcr/eslint-plugin-react/issues/1417
[#1518]: https://github.com/yannickcr/eslint-plugin-react/pull/1518
[#1521]: https://github.com/yannickcr/eslint-plugin-react/issues/1521
[#1517]: https://github.com/yannickcr/eslint-plugin-react/issues/1517
[#1499]: https://github.com/yannickcr/eslint-plugin-react/issues/1499
[#1507]: https://github.com/yannickcr/eslint-plugin-react/pull/1507
[#1246]: https://github.com/yannickcr/eslint-plugin-react/issues/1246
[#1438]: https://github.com/yannickcr/eslint-plugin-react/pull/1438
[#1464]: https://github.com/yannickcr/eslint-plugin-react/pull/1464
[#1494]: https://github.com/yannickcr/eslint-plugin-react/pull/1494
[#1467]: https://github.com/yannickcr/eslint-plugin-react/pull/1467
[#1512]: https://github.com/yannickcr/eslint-plugin-react/pull/1512
[#1423]: https://github.com/yannickcr/eslint-plugin-react/pull/1423
[#1500]: https://github.com/yannickcr/eslint-plugin-react/pull/1500
[#1514]: https://github.com/yannickcr/eslint-plugin-react/pull/1514
[#1502]: https://github.com/yannickcr/eslint-plugin-react/pull/1502
[#1508]: https://github.com/yannickcr/eslint-plugin-react/pull/1508
[#1526]: https://github.com/yannickcr/eslint-plugin-react/pull/1526
[#1398]: https://github.com/yannickcr/eslint-plugin-react/pull/1398
[#1450]: https://github.com/yannickcr/eslint-plugin-react/pull/1450

## [7.4.0] - 2017-09-24
### Added
* Add Flow 0.53 support ([#1376][] @jseminck)
* Add [`jsx-curly-brace-presence`][] rule ([#1310][] @jackyho112)
* Add support for Flow IntersectionTypeAnnotation to [`prop-types`][] and [`no-unused-prop-types`][] ([#1364][] [#1323][] @jseminck)
* Add support for Flow TypedArgument to [`no-unused-prop-types`][] ([#1412][] @jseminck)
* Add support for Flow ClassExpressions to [`prop-types`][] ([#1400][] @jseminck)
* Add support for Flow read-only props to [`no-unused-prop-types`][] ([#1388][] @jseminck)
* Add more tests for [`prop-types`][] and [`no-unused-prop-types`][] ([#1381][] @DianaSuvorova)
* Add support for increment and decrement operations to [`no-direct-mutation-state`][] ([#1386][] @zpao)

### Fixed
* Fix [`no-unused-state`][] to ignore computed property keys ([#1361][] @jackyho112)
* Fix [`no-typos`][] crash ([#1406][] @jseminck)
* Fix [`boolean-prop-naming`][] crash ([#1409][] @EvHaus)
* Fix [`prop-types`][] and [`no-unused-prop-types`][] crash with IntersectionTypeAnnotation ([#1413][] @jseminck)

### Changed
* Documentation improvements ([#1392][] @xcatliu, [#1403][] @piperchester, [#1432][] @jneuendorf)

[7.4.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.3.0...v7.4.0
[#1376]: https://github.com/yannickcr/eslint-plugin-react/issues/1376
[#1310]: https://github.com/yannickcr/eslint-plugin-react/issues/1310
[#1364]: https://github.com/yannickcr/eslint-plugin-react/issues/1364
[#1323]: https://github.com/yannickcr/eslint-plugin-react/issues/1323
[#1412]: https://github.com/yannickcr/eslint-plugin-react/pull/1412
[#1400]: https://github.com/yannickcr/eslint-plugin-react/pull/1400
[#1388]: https://github.com/yannickcr/eslint-plugin-react/issues/1388
[#1381]: https://github.com/yannickcr/eslint-plugin-react/pull/1381
[#1361]: https://github.com/yannickcr/eslint-plugin-react/issues/1361
[#1406]: https://github.com/yannickcr/eslint-plugin-react/pull/1406
[#1409]: https://github.com/yannickcr/eslint-plugin-react/pull/1409
[#1392]: https://github.com/yannickcr/eslint-plugin-react/pull/1392
[#1403]: https://github.com/yannickcr/eslint-plugin-react/pull/1403
[#1386]: https://github.com/yannickcr/eslint-plugin-react/issues/1386
[#1413]: https://github.com/yannickcr/eslint-plugin-react/issues/1413
[#1432]: https://github.com/yannickcr/eslint-plugin-react/pull/1432

## [7.3.0] - 2017-08-21
### Added
* Add checks for `propTypes`, `contextTypes` and `childContextTypes` to [`no-typos`][] ([#213][] @DianaSuvorova)

### Fixed
* Fix [`boolean-prop-naming`][] crash ([#1369][] @EvHaus)
* Fix [`no-typos`][] crash ([#1353][] @jseminck)
* Fix [`require-default-props`][] stopping when it finds a component without props ([#1380][] @brgibson)
* Fix [`no-direct-mutation-state`][] detection with nested components ([#1382][])

### Changed
* Documentation improvements ([#1383][] @mjomble)

[7.3.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.2.1...v7.3.0
[#213]: https://github.com/yannickcr/eslint-plugin-react/issues/213
[#1369]: https://github.com/yannickcr/eslint-plugin-react/issues/1369
[#1353]: https://github.com/yannickcr/eslint-plugin-react/issues/1353
[#1380]: https://github.com/yannickcr/eslint-plugin-react/pull/1380
[#1382]: https://github.com/yannickcr/eslint-plugin-react/issues/1382
[#1383]: https://github.com/yannickcr/eslint-plugin-react/pull/1383

## [7.2.1] - 2017-08-14
### Fixed
* Fix [`forbid-prop-types`][] crash on identifiers ([#1352][] @ljharb)
* Fix [`boolean-prop-naming`][] crash with propTypes wrapper ([#1354][] @dustinsoftware)
* Fix [`prop-types`][] false positive with local variable `props` ([#1288][] @DianaSuvorova)
* Fix wrapped propTypes detection ([#1366][])

### Changed
* Documentation improvements ([#1123][] @penx)

[7.2.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.2.0...v7.2.1
[#1352]: https://github.com/yannickcr/eslint-plugin-react/issues/1352
[#1354]: https://github.com/yannickcr/eslint-plugin-react/issues/1354
[#1288]: https://github.com/yannickcr/eslint-plugin-react/issues/1288
[#1366]: https://github.com/yannickcr/eslint-plugin-react/issues/1366
[#1123]: https://github.com/yannickcr/eslint-plugin-react/issues/1123

## [7.2.0] - 2017-08-09
### Added
* Add [`no-unused-state`][] rule ([#1103][] @wbinnssmith)
* Add [`boolean-prop-naming`][] rule ([#1264][] @EvHaus)
* Add [`no-typos`][] rule ([#1189][] @jseminck, [#1294][] @haridusenadeera)
* Add auto fix for [`jsx-sort-props`][] ([#1273][] @Overload119)
* Add `getters` and `setters` groups to [`sort-comp`][] ([#100][] @RDGthree)
* Add `noStrings` option to [`jsx-no-literals`][] ([#1202][] @deecewan)
* Add inverse option for `always`/`never` to [`jsx-boolean-value`][] ([#1249][] @ljharb)

### Fixed
* Fix [`no-direct-mutation-state`][] to disallow `this.state` mutation in constructor ([#832][] @burabure)
* Fix [`jsx-no-target-blank`][] crash on empty `rel` attribute ([#1269][] @dustinsoftware)
* Fix [`sort-comp`][] component detection with `ClassExpression` ([#1076][] @webOS101)
* Fix [`no-unused-prop-types`][] detection with async class properties and methods ([#1053][] @benstepp)
* Fix [`void-dom-elements-no-children`][] crash ([#1226][] @kokobeware)
* Fix [`no-danger-with-children`][] to ignore line breaks ([#1262][])
* Fix [`no-danger-with-children`][] crash with undefined ([#1287][])
* Fix [`jsx-no-target-blank`][] crash ([#1296][] @jseminck)
* Fix [`no-unused-prop-types`][] to no longer ignore components with no used props ([#1303][] @DianaSuvorova)
* Fix [`jsx-no-duplicate-props`][] crash ([#969][] @marcelmokos)
* Fix [`jsx-no-literals`][] false positives ([#1301][] @davidyorr)
* Fix [`no-find-dom-node`][] detection with named imports ([#785][] @Hypnosphi)
* Fix proTypes-related rules detection with wrapped propTypes ([#1266][] @dustinsoftware)
* Fix [`no-unused-prop-types`][] detection with propTypes wrapped in a function ([#1253][] @dustinsoftware)
* Fix [`no-unused-prop-types`][] detection with destructured use of properties ([#816][] @DianaSuvorova)
* Fix [`no-unused-prop-types`][] detection with inline functions ([#1309][] @DianaSuvorova)
* Fix [`no-unused-prop-types`][] `skipShapeProps` option with Flow annotations ([#1335][] @DianaSuvorova)
* Fix [`jsx-curly-spacing`][] schema incompatibility with ESLint 4.2.0 ([#1290][] @jseminck)

### Changed
* Documentation improvements ([#1261][] @mminer, [#1005][] @yooungt13, [#1289][] @konekoya, [#1308][] @xcatliu, [#1306][] @egberts, [#1329][] [#1344][] @DianaSuvorova)
* ES6-ify codebase ([#1274][] [#1277][] [#1281][] @dfilipidisz)
* Code refactoring (@ljharb)
* Update Travis CI and AppVeyor CI configurations (@lencioni)

[7.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.1.0...v7.2.0
[#1103]: https://github.com/yannickcr/eslint-plugin-react/pull/1103
[#1273]: https://github.com/yannickcr/eslint-plugin-react/pull/1273
[#1264]: https://github.com/yannickcr/eslint-plugin-react/pull/1264
[#1189]: https://github.com/yannickcr/eslint-plugin-react/issues/1189
[#1294]: https://github.com/yannickcr/eslint-plugin-react/pull/1294
[#100]: https://github.com/yannickcr/eslint-plugin-react/issues/100
[#1202]: https://github.com/yannickcr/eslint-plugin-react/pull/1202
[#1249]: https://github.com/yannickcr/eslint-plugin-react/issues/1249
[#832]: https://github.com/yannickcr/eslint-plugin-react/issues/832
[#1269]: https://github.com/yannickcr/eslint-plugin-react/issues/1269
[#1076]: https://github.com/yannickcr/eslint-plugin-react/issues/1076
[#1053]: https://github.com/yannickcr/eslint-plugin-react/issues/1053
[#1226]: https://github.com/yannickcr/eslint-plugin-react/pull/1226
[#1262]: https://github.com/yannickcr/eslint-plugin-react/issues/1262
[#1287]: https://github.com/yannickcr/eslint-plugin-react/issues/1287
[#1296]: https://github.com/yannickcr/eslint-plugin-react/issues/1296
[#1303]: https://github.com/yannickcr/eslint-plugin-react/pull/1303
[#969]: https://github.com/yannickcr/eslint-plugin-react/issues/969
[#1301]: https://github.com/yannickcr/eslint-plugin-react/issues/1301
[#785]: https://github.com/yannickcr/eslint-plugin-react/issues/785
[#1266]: https://github.com/yannickcr/eslint-plugin-react/issues/1266
[#1253]: https://github.com/yannickcr/eslint-plugin-react/pull/1253
[#816]: https://github.com/yannickcr/eslint-plugin-react/issues/816
[#1309]: https://github.com/yannickcr/eslint-plugin-react/issues/1309
[#1261]: https://github.com/yannickcr/eslint-plugin-react/pull/1261
[#1005]: https://github.com/yannickcr/eslint-plugin-react/pull/1005
[#1289]: https://github.com/yannickcr/eslint-plugin-react/pull/1289
[#1308]: https://github.com/yannickcr/eslint-plugin-react/pull/1308
[#1306]: https://github.com/yannickcr/eslint-plugin-react/issues/1306
[#1329]: https://github.com/yannickcr/eslint-plugin-react/pull/1329
[#1274]: https://github.com/yannickcr/eslint-plugin-react/pull/1274
[#1277]: https://github.com/yannickcr/eslint-plugin-react/pull/1277
[#1281]: https://github.com/yannickcr/eslint-plugin-react/pull/1281
[#1335]: https://github.com/yannickcr/eslint-plugin-react/issues/1335
[#1344]: https://github.com/yannickcr/eslint-plugin-react/pull/1344
[#1290]: https://github.com/yannickcr/eslint-plugin-react/pull/1290

## [7.1.0] - 2017-06-13
### Added
* Add [`default-props-match-prop-types`][] rule ([#1022][] @webOS101)
* Add [`no-redundant-should-component-update`][] rule ([#985][] @jomasti)
* Add [`jsx-closing-tag-location`][] rule ([#1206][] @rsolomon)
* Add auto fix for [`jsx-max-props-per-line`][] ([#949][] @snowypowers)
* Add support for lifecycle methods with `nextProps`/`prevProps` in [`no-unused-prop-types`][] ([#1213][] @jseminck)
* Add Flow SuperTypeParameters support to [`prop-types`][] ([#1236][] @gpeal)
* Add `children` option to [`jsx-curly-spacing`][] ([#857][] @fatfisz)

### Fixed
* Fix [`prefer-stateless-function`][] `ignorePureComponents` option when using class expressions ([#1122][] @dreid)
* Fix [`void-dom-elements-no-children`][] crash ([#1195][] @oliviertassinari)
* Fix [`require-default-props`][] quoted `defaultProps` detection ([#1201][])
* Fix [`jsx-sort-props`][] bug with `ignoreCase` and `callbacksLast` options set to `true` ([#1175][] @jseminck)
* Fix [`no-unused-prop-types`][] false positive ([#1183][] [#1135][] @jseminck)
* Fix [`jsx-no-target-blank`][] to not issue errors for non-external URLs ([#1216][] @gfx)
* Fix [`prop-types`][] quoted Flow types detection ([#1132][] @ethanjgoldberg)
* Fix [`no-array-index-key`][] crash with `key` without value ([#1242][] @jseminck)

### Changed
* Set ESLint 4.0.0 as valid peerDependency
* Dead code removal ([#1227][] @jseminck)
* Update dependencies (@ljharb)
* Documentation improvements ([#1071][] @adnasa, [#1199][] @preco21, [#1222][] @alexilyaev, [#1231][] @vonovak, [#1239][] @webOS101, [#1241][] @102)

[7.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.0.1...v7.1.0
[#1022]: https://github.com/yannickcr/eslint-plugin-react/issues/1022
[#949]: https://github.com/yannickcr/eslint-plugin-react/pull/949
[#985]: https://github.com/yannickcr/eslint-plugin-react/issues/985
[#1213]: https://github.com/yannickcr/eslint-plugin-react/issues/1213
[#1236]: https://github.com/yannickcr/eslint-plugin-react/pull/1236
[#1206]: https://github.com/yannickcr/eslint-plugin-react/issues/1206
[#857]: https://github.com/yannickcr/eslint-plugin-react/issues/857
[#1122]: https://github.com/yannickcr/eslint-plugin-react/pull/1122
[#1195]: https://github.com/yannickcr/eslint-plugin-react/pull/1195
[#1201]: https://github.com/yannickcr/eslint-plugin-react/issues/1201
[#1175]: https://github.com/yannickcr/eslint-plugin-react/issues/1175
[#1183]: https://github.com/yannickcr/eslint-plugin-react/issues/1183
[#1135]: https://github.com/yannickcr/eslint-plugin-react/issues/1135
[#1216]: https://github.com/yannickcr/eslint-plugin-react/pull/1216
[#1132]: https://github.com/yannickcr/eslint-plugin-react/pull/1132
[#1242]: https://github.com/yannickcr/eslint-plugin-react/issues/1242
[#1227]: https://github.com/yannickcr/eslint-plugin-react/pull/1227
[#1071]: https://github.com/yannickcr/eslint-plugin-react/pull/1071
[#1199]: https://github.com/yannickcr/eslint-plugin-react/pull/1199
[#1222]: https://github.com/yannickcr/eslint-plugin-react/pull/1222
[#1231]: https://github.com/yannickcr/eslint-plugin-react/pull/1231
[#1239]: https://github.com/yannickcr/eslint-plugin-react/pull/1239
[#1241]: https://github.com/yannickcr/eslint-plugin-react/pull/1241

## [7.0.1] - 2017-05-13
### Fixed
* Fix [`jsx-curly-spacing`][] `allowMultiline` option being undefined in some cases ([#1179][] @fatfisz)
* Fix [`jsx-curly-spacing`][] newline with object literals bug ([#1180][] @fatfisz)
* Fix [`prop-types`][] to not mark class static function as valid propTypes definition ([#1174][])
* Fix [`prop-types`][] crash with Flow spread operator ([#1178][])
* Fix [`void-dom-elements-no-children`][] crash on faulty `createElement` detection ([#1101][])
* Fix [`require-default-props`][] error message for quoted props ([#1161][])

### Changed
* Update dependencies
* Documentation improvements ([#1173][] @luftywiranda13, [#1192][] @markus-willems)

[7.0.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v7.0.0...v7.0.1
[#1179]: https://github.com/yannickcr/eslint-plugin-react/pull/1179
[#1180]: https://github.com/yannickcr/eslint-plugin-react/pull/1180
[#1174]: https://github.com/yannickcr/eslint-plugin-react/issues/1174
[#1178]: https://github.com/yannickcr/eslint-plugin-react/issues/1178
[#1101]: https://github.com/yannickcr/eslint-plugin-react/issues/1101
[#1161]: https://github.com/yannickcr/eslint-plugin-react/issues/1161
[#1173]: https://github.com/yannickcr/eslint-plugin-react/pull/1173
[#1192]: https://github.com/yannickcr/eslint-plugin-react/pull/1192

## [7.0.0] - 2017-05-06
### Added
* Add [`no-will-update-set-state`][] rule ([#1139][] @ManThursday)
* Add import and destructuring support to [`no-deprecated`][]
* Add `reservedFirst` option to [`jsx-sort-props`][] ([#1134][] @MatthewHerbst)

### Breaking
* Update rules for React 15.5.0:
  * Add warnings for `React.PropTypes` and `React.createClass` in [`no-deprecated`][] ([#1148][] @Calyhre)
  * Update `createClass` component factory to `createReactClass`. This is used for React component detection, if you still using `React.createClass` use the [shared settings](README.md#configuration) to specify `createClass` as component factory
* Drop Node.js < 4 support ([#1038][] @ljharb)
* Add [`no-danger-with-children`][] rule to recommended rules ([#748][] @ljharb)
* Add [`no-string-refs`][] rule to recommended rules ([#749][] @ljharb)
* Add [`jsx-key`][] rule to recommended rules ([#750][] @ljharb)
* Add [`jsx-no-comment-textnodes`][] rule to recommended rules ([#751][] @ljharb)
* Add [`jsx-no-target-blank`][] rule to recommended rules ([#752][] @ljharb)
* Add [`no-unescaped-entities`][] rule to recommended rules ([#841][] @ljharb)
* Add [`no-children-prop`][] rule to recommended rules ([#842][] @ljharb)
* Remove deprecated [`wrap-multilines`][] rule, use [`jsx-wrap-multilines`][] instead
* Remove deprecated [`no-comment-textnodes`][] rule, use [`jsx-no-comment-textnodes`][] instead
* Remove deprecated [`require-extension`][] rule, use the [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) [`extensions`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md) rule instead
* Deprecate [`jsx-space-before-closing`][] rule, use the [`jsx-tag-spacing`][] rule instead. [`jsx-space-before-closing`][] still works but will trigger a warning ([#1070][] @afairb)
* [`jsx-first-prop-new-line`][] default is now `multiline-multiprop` ([#802][] @kokarn)
* [`jsx-wrap-multilines`][] now checks arrow functions without block body. It can be deactivated in [rule options](docs/rules/jsx-wrap-multilines.md#rule-details) ([#790][] @ColCh)
* [`jsx-no-undef`][] will not check the global scope by default. You can force it with the [`allowGlobals`](docs/rules/jsx-no-undef.md#allowglobals) option ([#1013][] @jomasti)

### Fixed
* Fix [`no-unused-prop-types`][] false positive with `nextProps` ([#1079][] @Kerumen)
* Fix [`prefer-stateless-function`][] to not warn on classes with decorators ([#1034][] @benstepp)

### Changed
* Update dependencies ([#1119][] @danez)
* Documentation improvements ([#1121][] @omerzach, [#1130][] @dreid, [#1131][] @shoesandsocks, [#1149][] @Adzz, [#1151][] @MatthewHerbst, [#1167][] @Slumber86)

[7.0.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.10.3...v7.0.0
[#1134]: https://github.com/yannickcr/eslint-plugin-react/pull/1134
[#1038]: https://github.com/yannickcr/eslint-plugin-react/pull/1038
[#802]: https://github.com/yannickcr/eslint-plugin-react/pull/802
[#790]: https://github.com/yannickcr/eslint-plugin-react/issues/790
[#1013]: https://github.com/yannickcr/eslint-plugin-react/pull/1013
[#1070]: https://github.com/yannickcr/eslint-plugin-react/pull/1070
[#748]: https://github.com/yannickcr/eslint-plugin-react/issues/748
[#749]: https://github.com/yannickcr/eslint-plugin-react/issues/749
[#750]: https://github.com/yannickcr/eslint-plugin-react/issues/750
[#751]: https://github.com/yannickcr/eslint-plugin-react/issues/751
[#752]: https://github.com/yannickcr/eslint-plugin-react/issues/752
[#841]: https://github.com/yannickcr/eslint-plugin-react/issues/841
[#842]: https://github.com/yannickcr/eslint-plugin-react/issues/842
[#1139]: https://github.com/yannickcr/eslint-plugin-react/pull/1139
[#1148]: https://github.com/yannickcr/eslint-plugin-react/pull/1148
[#1079]: https://github.com/yannickcr/eslint-plugin-react/issues/1079
[#1034]: https://github.com/yannickcr/eslint-plugin-react/issues/1034
[#1119]: https://github.com/yannickcr/eslint-plugin-react/pull/1119
[#1121]: https://github.com/yannickcr/eslint-plugin-react/pull/1121
[#1130]: https://github.com/yannickcr/eslint-plugin-react/pull/1130
[#1131]: https://github.com/yannickcr/eslint-plugin-react/pull/1131
[#1149]: https://github.com/yannickcr/eslint-plugin-react/pull/1149
[#1151]: https://github.com/yannickcr/eslint-plugin-react/pull/1151
[#1167]: https://github.com/yannickcr/eslint-plugin-react/pull/1167

## [6.10.3] - 2017-03-20
### Fixed
* Revert [#1057][] due to issues with [`jsx-indent`][] ([#1117][])

[6.10.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.10.2...v6.10.3

## [6.10.2] - 2017-03-19
### Fixed
* Fix [`jsx-indent`][] indentation calculation with nested JSX ([#1117][])

[6.10.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.10.1...v6.10.2
[#1117]: https://github.com/yannickcr/eslint-plugin-react/issues/1117

## [6.10.1] - 2017-03-19
### Fixed
* Fix [`jsx-indent`][] auto fix with tabs ([#1057][] @kentcdodds @webOS101)
* Fix [`jsx-indent`][] crash ([#1061][] @iancmyers)
* Fix [`void-dom-elements-no-children`][] crash and fix it to only checks for a createElement call from
React ([#1073][] @jomasti)
* Fix component detection that caused a false positive in [`no-multi-comp`][] ([#1088][] @benstepp)

[6.10.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.10.0...v6.10.1
[#1057]: https://github.com/yannickcr/eslint-plugin-react/issues/1057
[#1061]: https://github.com/yannickcr/eslint-plugin-react/issues/1061
[#1073]: https://github.com/yannickcr/eslint-plugin-react/issues/1073
[#1088]: https://github.com/yannickcr/eslint-plugin-react/issues/1088

## [6.10.0] - 2017-02-16
### Added
* Add [`forbid-foreign-prop-types`][] rule ([#696][] @iancmyers)
* Add [`void-dom-elements-no-children`][] rule ([#709][] @lencioni)
* Add [`forbid-elements`][] rule ([#887][] @kentor)
* Add `noSortAlphabetically` option to [`jsx-sort-props`][] ([#541][] [#786][] @markus101)
* Add `when` option to [`jsx-max-props-per-line`][] ([#878][] @kentor)
* Add support for `nextProps` to [`prop-types`][] ([#814][])

### Fixed
* Fix [`require-default-props`][] crash ([#1029][])
* Fix [`require-default-props`][] rule when using Flow type from assignment ([#1043][] @wyze @CarlRosell)
* Fix [`style-prop-object`][] to not warn with explicit `null` or `undefined` ([#812][] @ljharb)
* Fix [`no-unused-prop-types`][] props detection in stateless components ([#885][] @BarryThePenguin)
* Fix [`display-name`] false positive with `document.createElement` ([#996][] @jomasti)
* Fix ESLint 2 compatibility (@ljharb)

### Changed
* Tests improvements (@ljharb)
* Documentation improvements ([#958][] @Jorundur, [#1010][] @amilajack, [#1041][] @EvNaverniouk, [#1050][] @lencioni, [#1062][] @dguo)

[6.10.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.9.0...v6.10.0
[#696]: https://github.com/yannickcr/eslint-plugin-react/issues/696
[#709]: https://github.com/yannickcr/eslint-plugin-react/issues/709
[#887]: https://github.com/yannickcr/eslint-plugin-react/issues/887
[#541]: https://github.com/yannickcr/eslint-plugin-react/issues/541
[#786]: https://github.com/yannickcr/eslint-plugin-react/issues/786
[#878]: https://github.com/yannickcr/eslint-plugin-react/issues/878
[#814]: https://github.com/yannickcr/eslint-plugin-react/issues/814
[#1029]: https://github.com/yannickcr/eslint-plugin-react/issues/1029
[#1043]: https://github.com/yannickcr/eslint-plugin-react/issues/1043
[#812]: https://github.com/yannickcr/eslint-plugin-react/issues/812
[#885]: https://github.com/yannickcr/eslint-plugin-react/issues/885
[#996]: https://github.com/yannickcr/eslint-plugin-react/issues/996
[#958]: https://github.com/yannickcr/eslint-plugin-react/pull/958
[#1010]: https://github.com/yannickcr/eslint-plugin-react/pull/1010
[#1041]: https://github.com/yannickcr/eslint-plugin-react/pull/1041
[#1050]: https://github.com/yannickcr/eslint-plugin-react/pull/1050
[#1062]: https://github.com/yannickcr/eslint-plugin-react/pull/1062

## [6.9.0] - 2017-01-08
### Added
* Add support for variable reference to [`sort-prop-types`][] ([#622][])

### Fixed
* Fix Node.js 0.10 support ([#1000][] @ljharb)
* Fix [`prop-types`][] to correctly assign props to components ([#991][])

### Changed
* Documentation improvements ([#995][] @rutsky)

[6.9.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.8.0...v6.9.0
[#622]: https://github.com/yannickcr/eslint-plugin-react/issues/622
[#1000]: https://github.com/yannickcr/eslint-plugin-react/pull/1000
[#991]: https://github.com/yannickcr/eslint-plugin-react/issues/991
[#995]: https://github.com/yannickcr/eslint-plugin-react/pull/995

## [6.8.0] - 2016-12-05
### Added
* Add [`no-array-index-key`][] rule ([#978][] @lencioni)
* Add [`require-default-props`][] rule ([#528][]  @vitorbal)
* Add support for flow variance syntax to [`prop-types`][] ([#961][] @ajhyndman)

### Fixed
* Fix [`jsx-indent`][] with multiline jsx in ternaries ([#966][])
* Fix component detection to ignore async functions ([#989][] @taion)
* Fix [`jsx-curly-spacing`][] autofix to not delete comments ([#648][])
* Fix auto-enabling of `eslint-plugin-react` in exported configurations ([#984][] @jamischarles)

### Changed
* Update dependencies
* Documentation improvements ([#960][] @evilebottnawi, [#973][] @JamesWatling, [#982][] @captbaritone)

[6.8.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.7.1...v6.8.0
[#978]: https://github.com/yannickcr/eslint-plugin-react/pull/978
[#528]: https://github.com/yannickcr/eslint-plugin-react/issues/528
[#961]: https://github.com/yannickcr/eslint-plugin-react/issues/961
[#966]: https://github.com/yannickcr/eslint-plugin-react/issues/966
[#989]: https://github.com/yannickcr/eslint-plugin-react/pull/989
[#648]: https://github.com/yannickcr/eslint-plugin-react/issues/648
[#984]: https://github.com/yannickcr/eslint-plugin-react/pull/984
[#960]: https://github.com/yannickcr/eslint-plugin-react/pull/960
[#973]: https://github.com/yannickcr/eslint-plugin-react/pull/973
[#982]: https://github.com/yannickcr/eslint-plugin-react/pull/982

## [6.7.1] - 2016-11-15
### Fixed
* Fix [`jsx-tag-spacing`][] crash when options object isn't passed ([#955][] @daltones)

[6.7.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.7.0...v6.7.1
[#955]: https://github.com/yannickcr/eslint-plugin-react/issues/955

## [6.7.0] - 2016-11-14
### Added
* Add [`jsx-tag-spacing`][] rule ([#693][] @Kovensky)

### Fixed
* Fix [`jsx-indent`][] for parenthesized ternaries ([#945][] @voxpelli)
* Fix [`jsx-indent`][] for multiline ternaries
* Fix [`jsx-indent`][] for arrays in jsx ([#947][])
* Fix [`no-danger-with-children`][] crash with spread on global variables ([#921][])
* Fix [`jsx-wrap-multilines`][] ternaries handling ([#916][])

### Changed
* Enable [`no-unused-prop-types`][] `skipShapeProps` option by default to limit false positive ([#953][] @everdimension)

[6.7.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.6.0...v6.7.0
[#693]: https://github.com/yannickcr/eslint-plugin-react/issues/693
[#945]: https://github.com/yannickcr/eslint-plugin-react/issues/945
[#947]: https://github.com/yannickcr/eslint-plugin-react/issues/947
[#921]: https://github.com/yannickcr/eslint-plugin-react/issues/921
[#916]: https://github.com/yannickcr/eslint-plugin-react/issues/916
[#953]: https://github.com/yannickcr/eslint-plugin-react/pull/953

## [6.6.0] - 2016-11-06
### Added
* Add [`jsx-first-prop-new-line`][] auto fix ([#886][] @snowypowers)

### Fixed
* Fix [`no-unused-prop-types`][] crash with destructured prop-types ([#938][])
* Fix [`jsx-indent`][] in multi-line conditional expressions ([#901][], [#907][])
* Fix [`sort-comp`][] bad error message if 2 methods in the same group must be moved ([#507][])

### Changed
* Documentation improvements ([#941][] @pwmckenna)

[6.6.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.5.0...v6.6.0
[#886]: https://github.com/yannickcr/eslint-plugin-react/pull/886
[#938]: https://github.com/yannickcr/eslint-plugin-react/issues/938
[#901]: https://github.com/yannickcr/eslint-plugin-react/issues/901
[#907]: https://github.com/yannickcr/eslint-plugin-react/issues/907
[#507]: https://github.com/yannickcr/eslint-plugin-react/issues/507
[#941]: https://github.com/yannickcr/eslint-plugin-react/pull/941

## [6.5.0] - 2016-11-01
### Added
* Add tab support to [`jsx-closing-bracket-location`][] auto fixer ([#909][] @arperry)
* Add tab and space support to [`jsx-indent`][] auto fixer ([#608][] @jayphelps)
* Add `multiline-multiprop` option to [`jsx-first-prop-new-line`][] ([#883][] @kentor)

### Fixed
* Fix [`forbid-component-props`][] crash with self reference JSX element ([#839][] @xeodou)
* Fix [`jsx-indent`][] to ignore lines starting by literals ([#900][])
* Fix [`no-set-state`][] to correctly detect `setState` in arrow functions ([#931][])

### Changed
* Update dependencies
* Add `deprecated` metadata to deprecated rules ([#911][] @randycoulman)
* Auto-enable `eslint-plugin-react` in exported configurations ([#925][] @MoOx)
* Documentation improvements ([#910][] @Wilfred, [#932][] @gnarf)

[6.5.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.4.1...v6.5.0
[#909]: https://github.com/yannickcr/eslint-plugin-react/pull/909
[#608]: https://github.com/yannickcr/eslint-plugin-react/pull/608
[#883]: https://github.com/yannickcr/eslint-plugin-react/pull/883
[#839]: https://github.com/yannickcr/eslint-plugin-react/pull/839
[#900]: https://github.com/yannickcr/eslint-plugin-react/issues/900
[#931]: https://github.com/yannickcr/eslint-plugin-react/issues/931
[#911]: https://github.com/yannickcr/eslint-plugin-react/pull/911
[#925]: https://github.com/yannickcr/eslint-plugin-react/pull/925
[#910]: https://github.com/yannickcr/eslint-plugin-react/pull/910
[#932]: https://github.com/yannickcr/eslint-plugin-react/pull/932

## [6.4.1] - 2016-10-10
### Fixed
* Fix [`jsx-indent`][] for arrays ([#897][], [#898][])
* Fix [`jsx-indent`][] to allow multi-line logical expressions with one level of indent ([#896][])

[6.4.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.4.0...v6.4.1
[#897]: https://github.com/yannickcr/eslint-plugin-react/issues/897
[#898]: https://github.com/yannickcr/eslint-plugin-react/issues/898
[#896]: https://github.com/yannickcr/eslint-plugin-react/pull/896

## [6.4.0] - 2016-10-09
### Added
* Add `skipUndeclared` option to [`prop-types`][] ([#846][] @pfhayes)

### Fixed
* Fix [`jsx-no-bind`][] crash on arrow functions ([#854][])
* Fix [`display-name`][] false negative on es6-style method in `React.createClass` ([#852][])
* Fix [`prefer-stateless-function`][] to allow components with `childContextTypes` ([#853][])
* Fix [`no-children-prop`][] spread support ([#862][] @randycoulman)
* Fix [`no-unused-prop-types`][] to ignore validation when spread is used ([#840][])
* Fix [`jsx-closing-bracket-location`][] for multi-line prop ([#889][])
* Fix [`jsx-indent`][] in multi-line function calls ([#895][])
* Fix [`jsx-indent`][] in multi-line logical expressions ([#540][])

### Changed
* Update dependencies
* Documentation improvements ([#860][] @fson, [#863][] @corydolphin, [#830][] @eelyafi, [#876][] @manovotny, [#877][] @gaearon)

[6.4.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.3.0...v6.4.0
[#846]: https://github.com/yannickcr/eslint-plugin-react/pull/846
[#854]: https://github.com/yannickcr/eslint-plugin-react/issues/854
[#852]: https://github.com/yannickcr/eslint-plugin-react/issues/852
[#853]: https://github.com/yannickcr/eslint-plugin-react/issues/853
[#862]: https://github.com/yannickcr/eslint-plugin-react/pull/862
[#840]: https://github.com/yannickcr/eslint-plugin-react/issues/840
[#889]: https://github.com/yannickcr/eslint-plugin-react/issues/889
[#895]: https://github.com/yannickcr/eslint-plugin-react/issues/895
[#540]: https://github.com/yannickcr/eslint-plugin-react/issues/540
[#860]: https://github.com/yannickcr/eslint-plugin-react/pull/860
[#863]: https://github.com/yannickcr/eslint-plugin-react/pull/863
[#830]: https://github.com/yannickcr/eslint-plugin-react/pull/830
[#876]: https://github.com/yannickcr/eslint-plugin-react/pull/876
[#877]: https://github.com/yannickcr/eslint-plugin-react/pull/877

## [6.3.0] - 2016-09-20
### Added
* Add [`no-children-prop`][] rule ([#720][] @benstepp)
* Add [`no-unescaped-entities`][] rule ([#681][] @pfhayes)
* Add JSXExpressionContainer support to [`jsx-indent`][] rule ([#838][] @eelyafi)

### Fixed
* Fix [`style-prop-object`][] crash ([#834][])
* Fix [`style-prop-object`][] false positive on computed properties ([#820][])
* Fix [`style-prop-object`][] to deal with null and spread props that can't be resolved ([#809][] [#812][] @petersendidit)

[6.3.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.2.2...v6.3.0
[#720]: https://github.com/yannickcr/eslint-plugin-react/issues/720
[#681]: https://github.com/yannickcr/eslint-plugin-react/pull/681
[#838]: https://github.com/yannickcr/eslint-plugin-react/pull/838
[#834]: https://github.com/yannickcr/eslint-plugin-react/issues/834
[#820]: https://github.com/yannickcr/eslint-plugin-react/issues/820
[#809]: https://github.com/yannickcr/eslint-plugin-react/issues/809
[#812]: https://github.com/yannickcr/eslint-plugin-react/issues/812

## [6.2.2] - 2016-09-15
### Fixed
* Fix [`no-unused-prop-types`][] crash ([#825][] @EvNaverniouk)
* Fix [`jsx-no-target-blank`][] crash ([#821][])

[6.2.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.2.1...v6.2.2
[#821]: https://github.com/yannickcr/eslint-plugin-react/issues/821
[#825]: https://github.com/yannickcr/eslint-plugin-react/pull/825

## [6.2.1] - 2016-09-13
### Fixed
* Fix false positive in [`no-unused-prop-types`][] ([#792][] @EvNaverniouk)
* Fix [`jsx-no-target-blank`][] to target only anchor elements ([#793][] @aduth)
* Fix [`jsx-no-target-blank`][] to be case insensitive [#796][] @dmnd)
* Fix [`jsx-uses-vars`][] shadowed variables handling ([#799][])

### Changed
* Update dependencies
* Documentation improvements (@ljharb, [#794][] @dougshamoo, [#813][] @AndiDog, [#815][] @chris-vaszauskas)

[6.2.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.2.0...v6.2.1
[#792]: https://github.com/yannickcr/eslint-plugin-react/pull/792
[#793]: https://github.com/yannickcr/eslint-plugin-react/pull/793
[#794]: https://github.com/yannickcr/eslint-plugin-react/pull/794
[#796]: https://github.com/yannickcr/eslint-plugin-react/pull/796
[#799]: https://github.com/yannickcr/eslint-plugin-react/issues/799
[#813]: https://github.com/yannickcr/eslint-plugin-react/pull/813
[#815]: https://github.com/yannickcr/eslint-plugin-react/pull/815

## [6.2.0] - 2016-08-28
### Added
* Add [`no-unused-prop-types`][] rule ([#226][] @EvNaverniouk)
* Add [`style-prop-object`][] rule ([#715][] @petersendidit)
* Add auto fix for [`self-closing-comp`][] ([#770][] @pl12133)
* Add support for `typeAnnotations` in [`sort-comp`][] ([#235][] @dozoisch)
* Add support for `PureComponent` in [`prefer-stateless-function`][] ([#781][] @tiemevanveen)

### Fixed
* Fix [`jsx-uses-vars`][] to work better with [`prefer-const`](http://eslint.org/docs/rules/prefer-const). You'll need to upgrade to ESLint 3.4.0 to completely fix the compatibility issue ([#716][])
* Fix [`require-render-return`][] crash ([#784][])
* Fix related components detection in [`prop-types`][] ([#735][])
* Fix component detection to ignore functions expression without a parent component

### Changed
* Update dependencies
* Documentation improvements (@lencioni)

[6.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.1.2...v6.2.0
[#226]: https://github.com/yannickcr/eslint-plugin-react/issues/226
[#715]: https://github.com/yannickcr/eslint-plugin-react/issues/715
[#770]: https://github.com/yannickcr/eslint-plugin-react/pull/770
[#235]: https://github.com/yannickcr/eslint-plugin-react/issues/235
[#781]: https://github.com/yannickcr/eslint-plugin-react/pull/781
[#716]: https://github.com/yannickcr/eslint-plugin-react/issues/716
[#784]: https://github.com/yannickcr/eslint-plugin-react/issues/784
[#735]: https://github.com/yannickcr/eslint-plugin-react/issues/735

## [6.1.2] - 2016-08-17
### Fixed
* Fix nested spread handling in [`no-danger-with-children`][] ([#771][] @petersendidit)

### Changed
* Documentation improvements

[6.1.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.1.1...v6.1.2
[#771]: https://github.com/yannickcr/eslint-plugin-react/issues/771

## [6.1.1] - 2016-08-16
### Fixed
* Fix [`prop-types`][] on annotated components ([#766][])
* Fix [`no-danger-with-children`][] spread support ([#767][] @petersendidit)

### Changed
* Documentation improvements ([#769][] @daltones)

[6.1.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.1.0...v6.1.1
[#766]: https://github.com/yannickcr/eslint-plugin-react/issues/766
[#767]: https://github.com/yannickcr/eslint-plugin-react/issues/767
[#769]: https://github.com/yannickcr/eslint-plugin-react/pull/769

## [6.1.0] - 2016-08-14
### Added
* Add `React.PureComponent` support ([#737][])
* Add [`forbid-component-props`][] rule ([#314][] @lencioni)
* Add [`no-danger-with-children`][] rule ([#710][] @petersendidit)
* Add pragma for `createClass` factory method ([#725][] @zurawiki)

### Fixed
* Fix Node.js 0.10 support ([#746][])
* Fix [`prop-types`][] on annotated components ([#729][])
* Fix [`require-optimization`][] test for function declaration ([#744][] @Tom910)
* Fix [`jsx-uses-vars`][] to handle nested object properties ([#761][] @yayalice)
* Fix rules metadata

### Changed
* Update dependencies
* Documentation improvements ([#759][] @embrown, [#703][] [#753][] @lencioni, [#739][] @ljharb, [#731][] @wKich, [#745][] @petersendidit, [#659][] @dguo)

[6.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v6.0.0...v6.1.0
[#737]: https://github.com/yannickcr/eslint-plugin-react/issues/737
[#710]: https://github.com/yannickcr/eslint-plugin-react/issues/710
[#725]: https://github.com/yannickcr/eslint-plugin-react/pull/725
[#746]: https://github.com/yannickcr/eslint-plugin-react/issues/746
[#729]: https://github.com/yannickcr/eslint-plugin-react/issues/729
[#744]: https://github.com/yannickcr/eslint-plugin-react/pull/744
[#761]: https://github.com/yannickcr/eslint-plugin-react/pull/761
[#759]: https://github.com/yannickcr/eslint-plugin-react/pull/759
[#703]: https://github.com/yannickcr/eslint-plugin-react/pull/703
[#753]: https://github.com/yannickcr/eslint-plugin-react/pull/753
[#739]: https://github.com/yannickcr/eslint-plugin-react/issues/739
[#731]: https://github.com/yannickcr/eslint-plugin-react/pull/731
[#745]: https://github.com/yannickcr/eslint-plugin-react/pull/745
[#659]: https://github.com/yannickcr/eslint-plugin-react/pull/659
[#314]: https://github.com/yannickcr/eslint-plugin-react/pull/314

## [6.0.0] - 2016-08-01
### Added
* Add an `all` shareable configuration with all rules enabled ([#674][] @pfhayes)
* Add [`no-find-dom-node`][] rule ([#678][])
* Add `shorthandLast` option to [`jsx-sort-props`][] ([#391][] @mathieumg)
* Add `allowDecorators` option to [`require-optimization`][] ([#669][] @Tom910)

### Breaking
* Deprecate [`require-extension`][] rule, use the [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) [`extensions`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md) rule instead. [`require-extension`][] still works but will trigger a warning
* Enable `allow-in-func` mode by default in [`no-did-mount-set-state`][] and [`no-did-update-set-state`][] rules ([#702][] @lencioni)
* Enable html tags check by default in `self-closing-comp`
* Remove `pragma` option from `jsx-uses-react`, use the [shared settings](README.md#configuration) to specify a custom pragma ([#700][] @lencioni)
* Remove `react` option from [`no-deprecated`][] rule, use the [shared settings](README.md#configuration) to specify the React version ([#700][] @lencioni)
* Add [`require-render-return`][] rule to recommended rules
* Remove [`no-danger`][] from recommended rules ([#636][] @mjackson)
* Remove [`no-did-mount-set-state`][] and [`no-did-update-set-state`][] from recommended rules ([#596][])
* Remove deprecated [`jsx-sort-prop-types`][] rule, use [`sort-prop-types`][] instead ([#549][] @lencioni)
* Rename [`no-comment-textnodes`][] to [`jsx-no-comment-textnodes`][]. [`no-comment-textnodes`][] still works but will trigger a warning ([#668][] @lencioni)
* Rename [`wrap-multilines`][] to [`jsx-wrap-multilines`][]. [`wrap-multilines`][] still works but will trigger a warning ([#668][] @lencioni)
* Add ESLint as peerDependency ([#657][] @jokeyrhyme)
* Add Node.js 0.10 as minimum required version ([#657][] @jokeyrhyme)

### Fixed
* Fix [`jsx-handler-names`][] incorrectly flagging `only` ([#571][] @lencioni)
* Fix spread props cash in [`jsx-no-target-blank`][] ([#679][] @randycoulman)
* Fix [`require-optimization`][] warning on stateless components ([#687][])
* Fix [`jsx-uses-vars`][] that incorrectly marked some variables as used ([#694][] @lencioni)
* Fix [`no-unknown-property`][] check on SVG attributes ([#718][])
* Fix [`jsx-no-bind`][] reporting errors on render functions that don't return JSX ([#663][] @petersendidit)
* Fix [`jsx-closing-bracket-location`][] autofix when `location` is set to `props-aligned` ([#684][] @pfhayes)
* Fix [`prop-types`][] for destructured arguments being assigned to the parent stateless component in some cases ([#698][])
* Fix [`prop-types`][] for JSX return being assigned to the parent function in some cases ([#504][])
* Fix [`jsx-curly-spacing`][] for reporting on JSX content by mistake ([#671][])
* Fix [`prop-types`][] crash when accessing constructor on props ([#654][])
* Fix [`jsx-filename-extension`][] to not check filenames on text input ([#662][] @ljharb)
* Fix [`jsx-no-comment-textnodes`][] incorrectly catching urls ([#664][] @petersendidit)

### Changed
* Only report [`jsx-filename-extension`][] warning once per file ([#660][] @mathieumg)
* Update SVG and DOM attribute list for `no-unknown-property`
* Update rules to use the new ESLint rule format ([#661][] @petersendidit)
* Update dependencies
* Documentation improvements ([#724][] @lencioni)
* Update Travis CI and AppVeyor CI configurations (@ljharb)

[6.0.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.2.2...v6.0.0
[#571]: https://github.com/yannickcr/eslint-plugin-react/issues/571
[#728]: https://github.com/yannickcr/eslint-plugin-react/pull/728
[#679]: https://github.com/yannickcr/eslint-plugin-react/pull/679
[#687]: https://github.com/yannickcr/eslint-plugin-react/issues/687
[#694]: https://github.com/yannickcr/eslint-plugin-react/issues/694
[#718]: https://github.com/yannickcr/eslint-plugin-react/issues/718
[#723]: https://github.com/yannickcr/eslint-plugin-react/pull/723
[#702]: https://github.com/yannickcr/eslint-plugin-react/pull/702
[#700]: https://github.com/yannickcr/eslint-plugin-react/pull/700
[#636]: https://github.com/yannickcr/eslint-plugin-react/pull/636
[#596]: https://github.com/yannickcr/eslint-plugin-react/issues/596
[#661]: https://github.com/yannickcr/eslint-plugin-react/issues/661
[#724]: https://github.com/yannickcr/eslint-plugin-react/pull/724
[#674]: https://github.com/yannickcr/eslint-plugin-react/issues/674
[#678]: https://github.com/yannickcr/eslint-plugin-react/issues/678
[#391]: https://github.com/yannickcr/eslint-plugin-react/issues/391
[#669]: https://github.com/yannickcr/eslint-plugin-react/pull/669
[#663]: https://github.com/yannickcr/eslint-plugin-react/issues/663
[#684]: https://github.com/yannickcr/eslint-plugin-react/pull/684
[#698]: https://github.com/yannickcr/eslint-plugin-react/issues/698
[#504]: https://github.com/yannickcr/eslint-plugin-react/issues/504
[#671]: https://github.com/yannickcr/eslint-plugin-react/issues/671
[#549]: https://github.com/yannickcr/eslint-plugin-react/issues/549
[#668]: https://github.com/yannickcr/eslint-plugin-react/issues/668
[#660]: https://github.com/yannickcr/eslint-plugin-react/pull/660
[#654]: https://github.com/yannickcr/eslint-plugin-react/issues/654
[#662]: https://github.com/yannickcr/eslint-plugin-react/issues/662
[#664]: https://github.com/yannickcr/eslint-plugin-react/issues/664
[#657]: https://github.com/yannickcr/eslint-plugin-react/pull/657

## [5.2.2] - 2016-06-17
### Fixed
* Fix [`jsx-no-bind`][] crash ([#641][])

[5.2.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.2.1...v5.2.2
[#641]: https://github.com/yannickcr/eslint-plugin-react/issues/641

## [5.2.1] - 2016-06-17
### Fixed
* Fix [`jsx-pascal-case`][] for namespaced components ([#637][] @evcohen)

[5.2.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.2.0...v5.2.1
[#637]: https://github.com/yannickcr/eslint-plugin-react/issues/637

## [5.2.0] - 2016-06-17
### Added
* Add [`require-optimization`][] rule ([#240][] @EvNaverniouk)
* Add [`jsx-filename-extension`][] rule  ([#495][] @lencioni)
* Add [`no-render-return-value`][] rule ([#531][] @iamdustan)
* Add [`no-comment-textnodes`][] rule ([#616][] @benvinegar)
* Add `objectLiterals` option to [`jsx-curly-spacing`][] ([#388][], [#211][] @casesandberg @ljharb)
* Add option to [`self-closing-comp`][] to check html tags ([#572][] @gitim)
* Add `ignore` option to [`no-unknown-property`][] rule ([#631][] @insin)
* Add support for ES7 bind operator to [`jsx-handler-names`][] ([#630][])
* Add support for explicit declaration that class extends React.Component ([#68][] @gausie)

### Fixed
* Fix [`jsx-closing-bracket-location`][] multiline prop support ([#493][] @tuures)
* Fix [`prop-types`][] for props that where not assigned to the right component ([#591][])
* Fix [`display-name`][] when JSON style is used for defining components ([#590][] @gitim)
* Fix [`jsx-no-bind`][] for bind detection in render when assigned to a variable ([#474][] @petersendidit)
* Fix [`jsx-curly-spacing`][] for spread operator ([#606][] @gitim)
* Fix [`sort-comp`][] crash on spread operator ([#624][])
* Fix [`prop-types`][] crash when destructuring props with spread only

### Changed
* Update dependencies
* Add [doctrine](https://github.com/eslint/doctrine) as a dependency ([#68][] @gausie)
* Add [jsx-ast-utils](https://github.com/evcohen/jsx-ast-utils) as a dependency ([#634][] @evcohen)
* Documentation improvements ([#594][] @lencioni, [#598][] @mLuby, [#633][] @appsforartists)

[5.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.1.1...v5.2.0
[#68]: https://github.com/yannickcr/eslint-plugin-react/issues/68
[#211]: https://github.com/yannickcr/eslint-plugin-react/issues/211
[#240]: https://github.com/yannickcr/eslint-plugin-react/issues/240
[#388]: https://github.com/yannickcr/eslint-plugin-react/issues/388
[#474]: https://github.com/yannickcr/eslint-plugin-react/issues/474
[#493]: https://github.com/yannickcr/eslint-plugin-react/pull/493
[#495]: https://github.com/yannickcr/eslint-plugin-react/issues/495
[#531]: https://github.com/yannickcr/eslint-plugin-react/issues/531
[#572]: https://github.com/yannickcr/eslint-plugin-react/issues/572
[#590]: https://github.com/yannickcr/eslint-plugin-react/issues/590
[#591]: https://github.com/yannickcr/eslint-plugin-react/issues/591
[#594]: https://github.com/yannickcr/eslint-plugin-react/pull/594
[#598]: https://github.com/yannickcr/eslint-plugin-react/pull/598
[#606]: https://github.com/yannickcr/eslint-plugin-react/issues/606
[#616]: https://github.com/yannickcr/eslint-plugin-react/pull/616
[#624]: https://github.com/yannickcr/eslint-plugin-react/issues/624
[#630]: https://github.com/yannickcr/eslint-plugin-react/issues/630
[#631]: https://github.com/yannickcr/eslint-plugin-react/pull/631
[#633]: https://github.com/yannickcr/eslint-plugin-react/pull/633
[#634]: https://github.com/yannickcr/eslint-plugin-react/pull/634

## [5.1.1] - 2016-05-10
### Fixed
* Fix [`require-render-return`][] crash ([#589][])

[5.1.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.1.0...v5.1.1
[#589]: https://github.com/yannickcr/eslint-plugin-react/issues/589

## [5.1.0] - 2016-05-10
### Added
* Add [`jsx-no-target-blank`][] rule ([#582][] @Gasparila)
* Add `allowAllCaps` and `ignore` options to [`jsx-pascal-case`][] ([#575][])
* Add class properties support to [`require-render-return`][] ([#564][])

### Fixed
* Fix [`jsx-closing-bracket-location`][] fixer ([#533][] @dtinth)
* Fix [`require-render-return`][] to only check valid render methods ([#563][])
* Fix detection to allow simple `this` usage in fonctional components ([#576][])
* Fix [`forbid-prop-types`][] crash ([#579][])
* Fix comment handling in [`jsx-curly-spacing`][] ([#584][])

### Changed
* Update dependencies
* Documentation improvements (@coryhouse, [#581][] @scurker, [#588][])

[5.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.0.1...v5.1.0
[#582]: https://github.com/yannickcr/eslint-plugin-react/pull/582
[#575]: https://github.com/yannickcr/eslint-plugin-react/issues/575
[#564]: https://github.com/yannickcr/eslint-plugin-react/issues/564
[#533]: https://github.com/yannickcr/eslint-plugin-react/issues/533
[#563]: https://github.com/yannickcr/eslint-plugin-react/issues/563
[#576]: https://github.com/yannickcr/eslint-plugin-react/issues/576
[#579]: https://github.com/yannickcr/eslint-plugin-react/issues/579
[#584]: https://github.com/yannickcr/eslint-plugin-react/pull/584
[#559]: https://github.com/yannickcr/eslint-plugin-react/pull/559
[#581]: https://github.com/yannickcr/eslint-plugin-react/pull/581
[#588]: https://github.com/yannickcr/eslint-plugin-react/issues/588

## [5.0.1] - 2016-04-18
### Fixed
* Fix [`require-render-return`][] to not check stateless functions ([#550][])

[5.0.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v5.0.0...v5.0.1
[#550]: https://github.com/yannickcr/eslint-plugin-react/issues/550

## [5.0.0] - 2016-04-17
### Added
* Add [`jsx-first-prop-new-line`][] rule ([#410][] @jseminck)

### Breaking
* Update rules for React 15:
  * Add warnings for `LinkedStateMixin`, `ReactPerf.printDOM` and `ReactPerf.getMeasurementsSummaryMap` in `no-deprecated`
  * Allow stateless components to return `null` in [`prefer-stateless-function`][]
  * Remove SVG attributes warnings ([#490][])

If you're still not using React 15 you can keep the old behavior by setting the React version to `0.14` in the [shared settings](README.md#configuration).

### Fixed
* Rewrite [`require-render-return`][] rule ([#542][], [#543][])
* Fix [`prefer-stateless-function`][] crash ([#544][])
* Fix external propTypes handling ([#545][])
* Do not mark inline functions in JSX as components ([#546][])

### Changed
* Update dependencies
* Documentation improvements

[5.0.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.3.0...v5.0.0
[#410]: https://github.com/yannickcr/eslint-plugin-react/issues/410
[#490]: https://github.com/yannickcr/eslint-plugin-react/issues/490
[#542]: https://github.com/yannickcr/eslint-plugin-react/issues/542
[#543]: https://github.com/yannickcr/eslint-plugin-react/issues/543
[#544]: https://github.com/yannickcr/eslint-plugin-react/issues/544
[#545]: https://github.com/yannickcr/eslint-plugin-react/issues/545
[#546]: https://github.com/yannickcr/eslint-plugin-react/issues/546

## [4.3.0] - 2016-04-07
### Added
* Add [`require-render-return`][] rule ([#482][] @shmuga)
* Add auto fix for [`jsx-equals-spacing`][] ([#506][] @peet)
* Add auto fix for [`jsx-closing-bracket-location`][] ([#511][] @KevinGrandon)

### Fixed
* Fix [`prefer-stateless-function`][] for conditional JSX ([#516][])
* Fix [`jsx-pascal-case`][] to support single letter component names ([#505][] @dthielman)

### Changed
* Update dependencies
* Documentation improvements ([#509][] @coryhouse, [#526][] @ahoym)

[4.3.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.2.3...v4.3.0
[#482]: https://github.com/yannickcr/eslint-plugin-react/issues/482
[#506]: https://github.com/yannickcr/eslint-plugin-react/pull/506
[#511]: https://github.com/yannickcr/eslint-plugin-react/pull/511
[#516]: https://github.com/yannickcr/eslint-plugin-react/issues/516
[#505]: https://github.com/yannickcr/eslint-plugin-react/issues/505
[#509]: https://github.com/yannickcr/eslint-plugin-react/pull/509
[#526]: https://github.com/yannickcr/eslint-plugin-react/pull/526

## [4.2.3] - 2016-03-15
### Fixed
* Fix class properties retrieval in [`prefer-stateless-function`][] ([#499][])

[4.2.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.2.2...v4.2.3
[#499]: https://github.com/yannickcr/eslint-plugin-react/issues/499

## [4.2.2] - 2016-03-14
### Fixed
* Rewrite [`prefer-stateless-function`][] rule ([#491][])
* Fix [`self-closing-comp`][] to treat non-breaking spaces as content ([#496][])
* Fix detection for direct props in [`prop-types`][] ([#497][])
* Fix annotated function detection in [`prop-types`][] ([#498][])
* Fix `this` usage in [`jsx-no-undef`][] ([#489][])

### Changed
* Update dependencies
* Add shared setting for React version

[4.2.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.2.1...v4.2.2
[#491]: https://github.com/yannickcr/eslint-plugin-react/issues/491
[#496]: https://github.com/yannickcr/eslint-plugin-react/issues/496
[#497]: https://github.com/yannickcr/eslint-plugin-react/issues/497
[#498]: https://github.com/yannickcr/eslint-plugin-react/issues/498
[#489]: https://github.com/yannickcr/eslint-plugin-react/issues/489

## [4.2.1] - 2016-03-08
### Fixed
* Fix [`sort-prop-types`][] crash with spread operator ([#478][])
* Fix stateless components detection when conditionally returning JSX ([#486][])
* Fix case where props were not assigned to the right component ([#485][])
* Fix missing `getChildContext` lifecycle method in [`prefer-stateless-function`][] ([#492][])

[4.2.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.2.0...v4.2.1
[#478]: https://github.com/yannickcr/eslint-plugin-react/issues/478
[#486]: https://github.com/yannickcr/eslint-plugin-react/issues/486
[#485]: https://github.com/yannickcr/eslint-plugin-react/issues/485
[#492]: https://github.com/yannickcr/eslint-plugin-react/issues/492

## [4.2.0] - 2016-03-05
### Added
* Add support for Flow annotations on stateless components ([#467][])
* Add [`prefer-stateless-function`][] rule ([#214][])
* Add auto fix for [`jsx-indent-props`][] ([#483][] @shioju)

### Fixed
* Fix [`jsx-no-undef`][] crash on objects ([#469][])
* Fix propTypes detection when declared before the component ([#472][])

### Changed
* Update dependencies
* Documentation improvements ([#464][] @alex-tan, [#466][] @awong-dev, [#470][] @Gpx; [#462][] @thaggie)

[4.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.1.0...v4.2.0
[#467]: https://github.com/yannickcr/eslint-plugin-react/issues/467
[#214]: https://github.com/yannickcr/eslint-plugin-react/issues/214
[#483]: https://github.com/yannickcr/eslint-plugin-react/pull/483
[#469]: https://github.com/yannickcr/eslint-plugin-react/issues/469
[#472]: https://github.com/yannickcr/eslint-plugin-react/issues/472
[#464]: https://github.com/yannickcr/eslint-plugin-react/pull/464
[#466]: https://github.com/yannickcr/eslint-plugin-react/pull/466
[#470]: https://github.com/yannickcr/eslint-plugin-react/pull/470
[#462]: https://github.com/yannickcr/eslint-plugin-react/pull/462

## [4.1.0] - 2016-02-23
### Added
* Add component detection for class expressions
* Add displayName detection for class expressions in [`display-name`][] ([#419][])

### Fixed
* Fix used props detection in components for which we are not confident in [`prop-types`][] ([#420][])
* Fix false positive in [`jsx-key`][] ([#456][] @jkimbo)

### Changed
* Documentation improvements ([#457][] @wyze)

[4.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v4.0.0...v4.1.0
[#419]: https://github.com/yannickcr/eslint-plugin-react/issues/419
[#420]: https://github.com/yannickcr/eslint-plugin-react/issues/420
[#456]: https://github.com/yannickcr/eslint-plugin-react/pull/456
[#457]: https://github.com/yannickcr/eslint-plugin-react/pull/457

## [4.0.0] - 2016-02-19
### Added
* Add [`jsx-space-before-closing`][] rule ([#244][] @ryym)
* Add support for destructing in function signatures to [`prop-types`][] ([#354][] @lencioni)

### Breaking
* Add support for static methods to `sort-comp`. Static methods must now be declared first, see [rule documentation](docs/rules/sort-comp.md) ([#128][] @lencioni)
* Add shareable config in place of default configuration. [`jsx-uses-vars`][] is not enabled by default anymore, see [documentation](README.md#recommended-configuration) ([#192][])
* Rename `jsx-sort-prop-types` to [`sort-prop-types`][]. `jsx-sort-prop-types` still works but will trigger a warning ([#87][] @lencioni)
* Remove deprecated `jsx-quotes` rule ([#433][] @lencioni)
* [`display-name`][] now accept the transpiler name by default. You can use the `ignoreTranspilerName` option to get the old behavior, see [rule documentation](docs/rules/display-name.md#ignoretranspilername) ([#440][] @lencioni)

### Fixed
* Only ignore lowercase JSXIdentifier in [`jsx-no-undef`][] ([#435][])
* Fix [`jsx-handler-names`][] regex ([#425][])
* Fix destructured props detection in [`prop-types`][] ([#443][])

### Changed
* Update dependencies ([#426][] @quentin-)
* Documentation improvements ([#414][] @vkrol, [#370][] @tmcw, [#441][] [#429][] @lencioni, [#432][] @note89, [#438][] @jmann6)

[4.0.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.16.1...v4.0.0
[#244]: https://github.com/yannickcr/eslint-plugin-react/issues/244
[#354]: https://github.com/yannickcr/eslint-plugin-react/issues/354
[#128]: https://github.com/yannickcr/eslint-plugin-react/issues/128
[#192]: https://github.com/yannickcr/eslint-plugin-react/issues/192
[#87]: https://github.com/yannickcr/eslint-plugin-react/issues/87
[#440]: https://github.com/yannickcr/eslint-plugin-react/pull/440
[#435]: https://github.com/yannickcr/eslint-plugin-react/issues/435
[#425]: https://github.com/yannickcr/eslint-plugin-react/issues/425
[#443]: https://github.com/yannickcr/eslint-plugin-react/issues/443
[#426]: https://github.com/yannickcr/eslint-plugin-react/pull/426
[#414]: https://github.com/yannickcr/eslint-plugin-react/pull/414
[#370]: https://github.com/yannickcr/eslint-plugin-react/pull/370
[#441]: https://github.com/yannickcr/eslint-plugin-react/pull/441
[#429]: https://github.com/yannickcr/eslint-plugin-react/pull/429
[#432]: https://github.com/yannickcr/eslint-plugin-react/pull/432
[#438]: https://github.com/yannickcr/eslint-plugin-react/pull/438
[#433]: https://github.com/yannickcr/eslint-plugin-react/pull/433

## [3.16.1] - 2016-01-24
### Fixed
* Fix [`jsx-sort-prop-types`][] issue with custom propTypes ([#408][] @alitaheri)

[3.16.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.16.0...v3.16.1
[#408]: https://github.com/yannickcr/eslint-plugin-react/issues/408

## [3.16.0] - 2016-01-24
### Added
* Add [`jsx-equals-spacing`][] rule ([#394][] @ryym)
* Add auto fix for `wrap-multiline`
* Add auto fix for `jsx-boolean-value`
* Add auto fix for `no-unknown-property`
* Add auto fix for [`jsx-curly-spacing`][] ([#407][] @ewendel)
* Add `requiredFirst` option to [`jsx-sort-prop-types`][] ([#392][] @chrislaskey)
* Add `ignoreRefs` option to [`jsx-no-bind`][] ([#330][] @silvenon)

### Fixed
* Ignore `ref` in [`jsx-handler-names`][] (again) ([#396][])

### Changed
* Update dependencies

[3.16.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.15.0...v3.16.0
[#394]: https://github.com/yannickcr/eslint-plugin-react/issues/394
[#407]: https://github.com/yannickcr/eslint-plugin-react/pull/407
[#392]: https://github.com/yannickcr/eslint-plugin-react/pull/392
[#330]: https://github.com/yannickcr/eslint-plugin-react/issues/330
[#396]: https://github.com/yannickcr/eslint-plugin-react/issues/396

## [3.15.0] - 2016-01-12
### Added
* Add support for flow annotations to [`prop-types`][] ([#382][] @phpnode)

### Fixed
* Fix [`prop-types`][] crash when initializing class variable with an empty object ([#383][])
* Fix [`prop-types`][] crash when propTypes are using the spread operator ([#389][])

### Changed
* Improve [`sort-comp`][] error messages ([#372][] @SystemParadox)
* Update dependencies

[3.15.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.14.0...v3.15.0
[#382]: https://github.com/yannickcr/eslint-plugin-react/pull/382
[#383]: https://github.com/yannickcr/eslint-plugin-react/issues/383
[#389]: https://github.com/yannickcr/eslint-plugin-react/issues/389
[#372]: https://github.com/yannickcr/eslint-plugin-react/pull/372

## [3.14.0] - 2016-01-05
### Added
* Add [`jsx-indent`][] rule ([#342][])
* Add shared setting for pragma configuration ([#228][] @NickStefan)

### Fixed
* Fix crash in [`jsx-key`][] ([#380][] @nfcampos)
* Fix crash in [`forbid-prop-types`][] ([#377][] @nfcampos)
* Ignore `ref` in [`jsx-handler-names`][] ([#375][])

### Changed
* Add AppVeyor CI to run tests on a Windows platform
* Add [`sort-comp`][] codemod to [`sort-comp`][] documentation ([#381][] @turadg)

[3.14.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.13.1...v3.14.0
[#342]: https://github.com/yannickcr/eslint-plugin-react/issues/342
[#228]: https://github.com/yannickcr/eslint-plugin-react/issues/228
[#380]: https://github.com/yannickcr/eslint-plugin-react/pull/380
[#377]: https://github.com/yannickcr/eslint-plugin-react/pull/377
[#375]: https://github.com/yannickcr/eslint-plugin-react/issues/375
[#381]: https://github.com/yannickcr/eslint-plugin-react/pull/381

## [3.13.1] - 2015-12-26
### Fixed
* Fix crash in [`jsx-key`][] ([#373][] @lukekarrys)

[3.13.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.13.0...v3.13.1
[#373]: https://github.com/yannickcr/eslint-plugin-react/issues/373

## [3.13.0] - 2015-12-24
### Added
* Add [`no-string-refs`][] rule ([#341][] @Intellicode)
* Add support for propTypes assigned via a variable in [`prop-types`][] ([#355][])

### Fixed
* Fix `never` option in [`prefer-es6-class`][]
* Fix [`jsx-key`][] false-positives ([#320][] @silvenon)

### Changed
* Documentation improvements ([#368][] @lencioni, [#370][] @tmcw, [#371][])
* Update dependencies

[3.13.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.12.0...v3.13.0
[#341]: https://github.com/yannickcr/eslint-plugin-react/issues/341
[#355]: https://github.com/yannickcr/eslint-plugin-react/issues/355
[#320]: https://github.com/yannickcr/eslint-plugin-react/issues/320

[#368]: https://github.com/yannickcr/eslint-plugin-react/pull/368
[#370]: https://github.com/yannickcr/eslint-plugin-react/pull/370
[#371]: https://github.com/yannickcr/eslint-plugin-react/issues/371

## [3.12.0] - 2015-12-20
### Added
* Add [`no-deprecated`][] rule ([#356][] @graue)
* Add [`no-is-mounted`][] rule ([#37][] @lencioni)
* Add `never` option to [`prefer-es6-class`][] rule ([#359][] @pwmckenna)

### Fixed
* Fix [`jsx-pascal-case`][] to stop checking lower cased components ([#329][])
* Fix crash in component detection class ([#364][])

### Changed
* Add link to [eslint-plugin-react-native](https://github.com/Intellicode/eslint-plugin-react-native) in Readme
* Update dependencies

[3.12.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.11.3...v3.12.0
[#356]: https://github.com/yannickcr/eslint-plugin-react/pull/356
[#37]: https://github.com/yannickcr/eslint-plugin-react/issues/37
[#359]: https://github.com/yannickcr/eslint-plugin-react/pull/359
[#329]: https://github.com/yannickcr/eslint-plugin-react/issues/329
[#364]: https://github.com/yannickcr/eslint-plugin-react/issues/364

## [3.11.3] - 2015-12-05
### Fixed
* Fix crash in [`prop-types`][] when reassigning props ([#345][])
* Fix [`jsx-handler-names`][] for stateless components ([#346][])

### Changed
* Update [`jsx-handler-names`][] error messages to be less specific ([#348][] @jakemmarsh)

[3.11.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.11.2...v3.11.3
[#345]: https://github.com/yannickcr/eslint-plugin-react/issues/345
[#346]: https://github.com/yannickcr/eslint-plugin-react/issues/346
[#348]: https://github.com/yannickcr/eslint-plugin-react/pull/348

## [3.11.2] - 2015-12-01
### Fixed
* Allow numbers in [`jsx-pascal-case`][] ([#339][])
* Fix [`jsx-handler-names`][] crash with arrays ([#340][])

### Changed
* Add `allow-in-func` option to [`no-did-update-set-state`][] documentation

[3.11.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.11.1...v3.11.2
[#339]: https://github.com/yannickcr/eslint-plugin-react/issues/339
[#340]: https://github.com/yannickcr/eslint-plugin-react/issues/340

## [3.11.1] - 2015-11-29
### Fixed
* Fix SVG attributes support for [`no-unknown-property`][] ([#338][])

[3.11.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.11.0...v3.11.1
[#338]: https://github.com/yannickcr/eslint-plugin-react/issues/338

## [3.11.0] - 2015-11-29
### Added
* Add [`jsx-handler-names`][] rule ([#315][] @jakemmarsh)
* Add SVG attributes support to [`no-unknown-property`][] ([#318][])
* Add shorthandFirst option to [`jsx-sort-props`][] ([#336][] @lucasmotta)

### Fixed
* Fix destructured props detection in stateless components ([#326][])
* Fix props validation for nested stateless components ([#331][])
* Fix [`require-extension`][] to ignore extension if it's part of the package name ([#319][])

### Changed
* Allow consecutive uppercase letters in [`jsx-pascal-case`][] ([#328][] @lencioni)
* Update dependencies

[3.11.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.10.0...v3.11.0
[#315]: https://github.com/yannickcr/eslint-plugin-react/pull/315
[#318]: https://github.com/yannickcr/eslint-plugin-react/issues/318
[#336]: https://github.com/yannickcr/eslint-plugin-react/pull/336
[#326]: https://github.com/yannickcr/eslint-plugin-react/issues/326
[#331]: https://github.com/yannickcr/eslint-plugin-react/issues/331
[#319]: https://github.com/yannickcr/eslint-plugin-react/issues/319
[#328]: https://github.com/yannickcr/eslint-plugin-react/issues/328

## [3.10.0] - 2015-11-21
### Added
* Add [`jsx-pascal-case`][] rule ([#306][] @jakemmarsh)

### Fixed
* Fix crash on incomplete class property declaration ([#317][] @dapetcu21)
* Fix crash with ESLint 1.10.0 ([#323][] @lukekarrys)

[3.10.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.9.0...v3.10.0
[#306]: https://github.com/yannickcr/eslint-plugin-react/pull/306
[#317]: https://github.com/yannickcr/eslint-plugin-react/issues/317
[#323]: https://github.com/yannickcr/eslint-plugin-react/issues/323

## [3.9.0] - 2015-11-17
### Added
* Add [`jsx-key`][] rule ([#293][] @benmosher)
* Add `allow-in-func` option to [`no-did-update-set-state`][] ([#300][])
* Add option to only enforce [`jsx-closing-bracket-location`][] rule to one type of tag (nonEmpty or selfClosing) ([#307][])

### Fixed
* Fix crash when destructuring with only the rest spread ([#269][])
* Fix variables detection when searching for related components ([#303][])
* Fix [`no-unknown-property`][] to not check custom elements ([#308][] @zertosh)

### Changed
* Improve [`jsx-closing-bracket-location`][] error message ([#301][] @alopatin)
* Update dependencies

[3.9.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.8.0...v3.9.0
[#293]: https://github.com/yannickcr/eslint-plugin-react/pull/293
[#300]: https://github.com/yannickcr/eslint-plugin-react/issues/300
[#307]: https://github.com/yannickcr/eslint-plugin-react/issues/307
[#269]: https://github.com/yannickcr/eslint-plugin-react/issues/269
[#303]: https://github.com/yannickcr/eslint-plugin-react/issues/303
[#308]: https://github.com/yannickcr/eslint-plugin-react/pull/308
[#301]: https://github.com/yannickcr/eslint-plugin-react/pull/301

## [3.8.0] - 2015-11-07
### Added
* Add ignoreStateless option to [`no-multi-comp`][] ([#290][])

### Fixed
* Fix classes with properties to always be marked as components ([#291][])
* Fix ES5 class detection when using `createClass` by itself ([#297][])
* Fix direct props detection ([#298][])
* Ignore functions containing the keyword `this` during component detection

[3.8.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.7.1...v3.8.0
[#290]: https://github.com/yannickcr/eslint-plugin-react/issues/290
[#291]: https://github.com/yannickcr/eslint-plugin-react/issues/291
[#297]: https://github.com/yannickcr/eslint-plugin-react/issues/297
[#298]: https://github.com/yannickcr/eslint-plugin-react/issues/298

## [3.7.1] - 2015-11-05
### Fixed
* Fix [`sort-comp`][] crash on stateless components ([#285][])
* Fix crash in ES5 components detection ([#286][])
* Fix ES5 components detection from nested functions ([#287][])

[3.7.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.7.0...v3.7.1
[#285]: https://github.com/yannickcr/eslint-plugin-react/issues/285
[#286]: https://github.com/yannickcr/eslint-plugin-react/issues/286
[#287]: https://github.com/yannickcr/eslint-plugin-react/issues/287

## [3.7.0] - 2015-11-05
### Added
* Add [`jsx-no-bind`][] rule ([#184][] @Daniel15)
* Add line-aligned option to [`jsx-closing-bracket-location`][] ([#243][] @alopatin)

### Fixed
* Fix a lot of issues about components detection, mostly related to stateless components ([#264][], [#267][], [#268][], [#276][], [#277][], [#280][])

### Changed
* Update dependencies

[3.7.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.6.3...v3.7.0
[#184]: https://github.com/yannickcr/eslint-plugin-react/issues/184
[#243]: https://github.com/yannickcr/eslint-plugin-react/issues/243
[#264]: https://github.com/yannickcr/eslint-plugin-react/issues/264
[#267]: https://github.com/yannickcr/eslint-plugin-react/issues/267
[#268]: https://github.com/yannickcr/eslint-plugin-react/issues/268
[#276]: https://github.com/yannickcr/eslint-plugin-react/issues/276
[#277]: https://github.com/yannickcr/eslint-plugin-react/issues/277
[#280]: https://github.com/yannickcr/eslint-plugin-react/issues/280

## [3.6.3] - 2015-10-20
### Fixed
* Fix [`display-name`][] for stateless components ([#256][])
* Fix [`prop-types`][] props validation in constructor ([#259][])
* Fix typo in README ([#261][] @chiedojohn)

[3.6.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.6.2...v3.6.3
[#256]: https://github.com/yannickcr/eslint-plugin-react/issues/256
[#259]: https://github.com/yannickcr/eslint-plugin-react/issues/259
[#261]: https://github.com/yannickcr/eslint-plugin-react/pull/261

## [3.6.2] - 2015-10-18
### Fixed
* Fix wrong prop-types detection ([#255][])

[3.6.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.6.1...v3.6.2
[#255]: https://github.com/yannickcr/eslint-plugin-react/issues/255

## [3.6.1] - 2015-10-18
### Fixed
* Fix props validation in constructor ([#254][])

[3.6.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.6.0...v3.6.1
[#254]: https://github.com/yannickcr/eslint-plugin-react/issues/254

## [3.6.0] - 2015-10-18
### Added
* Add support for stateless function components to [`display-name`][] and [`prop-types`][] ([#237][])
* Add callbacksLast option to [`jsx-sort-props`][] and [`jsx-sort-prop-types`][] ([#242][] @Daniel15)
* Add [`prefer-es6-class`][] rule ([#247][] @hamiltondanielb)

### Fixed
* Fix [`forbid-prop-types`][] crash with destructured PropTypes ([#230][] @epmatsw)
* Fix [`forbid-prop-types`][] to do not modify AST directly ([#249][] @rhysd)
* Fix [`prop-types`][] crash with empty destructuring ([#251][])
* Fix [`prop-types`][] to not validate computed keys in destructuring ([#236][])

### Changed
* Update dependencies
* Improve components detection ([#233][])
* Documentation improvements ([#248][] @dguo)

[3.6.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.5.1...v3.6.0
[#237]: https://github.com/yannickcr/eslint-plugin-react/issues/237
[#242]: https://github.com/yannickcr/eslint-plugin-react/pull/242
[#247]: https://github.com/yannickcr/eslint-plugin-react/issues/247
[#230]: https://github.com/yannickcr/eslint-plugin-react/issues/230
[#249]: https://github.com/yannickcr/eslint-plugin-react/issues/249
[#251]: https://github.com/yannickcr/eslint-plugin-react/issues/251
[#236]: https://github.com/yannickcr/eslint-plugin-react/issues/236
[#233]: https://github.com/yannickcr/eslint-plugin-react/issues/233
[#248]: https://github.com/yannickcr/eslint-plugin-react/pull/248

## [3.5.1] - 2015-10-01
### Fixed
* Fix [`no-direct-mutation-state`][] to report only in React components ([#229][])
* Fix [`forbid-prop-types`][] for arrayOf and instanceOf ([#230][])

### Changed
* Documentation improvements ([#232][] @edge)

[3.5.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.5.0...v3.5.1
[#229]: https://github.com/yannickcr/eslint-plugin-react/issues/229
[#230]: https://github.com/yannickcr/eslint-plugin-react/issues/230
[#232]: https://github.com/yannickcr/eslint-plugin-react/pull/232

## [3.5.0] - 2015-09-28
### Added
* Add [`no-direct-mutation-state`][] rule ([#133][], [#201][] @petersendidit)
* Add [`forbid-prop-types`][] rule ([#215][] @pwmckenna)

### Fixed
* Fix no-did-mount/update-set-state rules, these rules were not working on ES6 classes

### Changed
* Update dependencies
* Documentation improvements ([#222][] @Andersos)

[3.5.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.4.2...v3.5.0
[#133]: https://github.com/yannickcr/eslint-plugin-react/issues/133
[#201]: https://github.com/yannickcr/eslint-plugin-react/issues/201
[#215]: https://github.com/yannickcr/eslint-plugin-react/issues/215
[#222]: https://github.com/yannickcr/eslint-plugin-react/pull/222

## [3.4.2] - 2015-09-18
### Fixed
* Only display the `jsx-quotes` deprecation warning with the default formatter ([#221][])

[3.4.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.4.1...v3.4.2
[#221]: https://github.com/yannickcr/eslint-plugin-react/issues/221

## [3.4.1] - 2015-09-17
### Fixed
* Fix `jsx-quotes` rule deprecation message ([#220][])

[3.4.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.4.0...v3.4.1
[#220]: https://github.com/yannickcr/eslint-plugin-react/issues/220

## [3.4.0] - 2015-09-16
### Added
* Add namespaced JSX support to [`jsx-no-undef`][] ([#219][] @zertosh)
* Add option to [`jsx-closing-bracket-location`][] to configure different styles for self-closing and non-empty tags ([#208][] @evocateur)

### Deprecated
* Deprecate `jsx-quotes` rule, will now trigger a warning if used ([#217][])

[3.4.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.3.2...v3.4.0
[#219]: https://github.com/yannickcr/eslint-plugin-react/pull/219
[#208]: https://github.com/yannickcr/eslint-plugin-react/pull/208
[#217]: https://github.com/yannickcr/eslint-plugin-react/issues/217

## [3.3.2] - 2015-09-10
### Changed
* Add `state` in lifecycle methods for [`sort-comp`][] rule ([#197][] @mathieudutour)
* Treat component with render which returns `createElement` as valid ([#206][] @epmatsw)

### Fixed
* Fix allowed methods on arrayOf in [`prop-types`][] ([#146][])
* Fix default configuration for [`jsx-boolean-value`][] ([#210][])

[3.3.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.3.1...v3.3.2
[#146]: https://github.com/yannickcr/eslint-plugin-react/issues/146
[#197]: https://github.com/yannickcr/eslint-plugin-react/pull/197
[#206]: https://github.com/yannickcr/eslint-plugin-react/pull/206
[#210]: https://github.com/yannickcr/eslint-plugin-react/issues/210

## [3.3.1] - 2015-09-01
### Changed
* Update dependencies
* Update changelog to follow the Keep a CHANGELOG standards
* Documentation improvements ([#198][] @lencioni)

### Fixed
* Fix [`jsx-closing-bracket-location`][] for multiline props ([#199][])

[3.3.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.3.0...v3.3.1
[#198]: https://github.com/yannickcr/eslint-plugin-react/pull/198
[#199]: https://github.com/yannickcr/eslint-plugin-react/issues/199

## [3.3.0] - 2015-08-26
### Added
* Add [`jsx-indent-props`][] rule ([#15][], [#181][])
* Add `no-set-state rule` ([#197][] @markdalgleish)
* Add [`jsx-closing-bracket-location`][] rule ([#14][], [#64][])

### Changed
* Update dependencies

### Fixed
* Fix crash on propTypes declarations with an empty body ([#193][] @mattyod)

[3.3.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.2.3...v3.3.0
[#15]: https://github.com/yannickcr/eslint-plugin-react/issues/15
[#181]: https://github.com/yannickcr/eslint-plugin-react/issues/181
[#197]: https://github.com/yannickcr/eslint-plugin-react/pull/197
[#14]: https://github.com/yannickcr/eslint-plugin-react/issues/14
[#64]: https://github.com/yannickcr/eslint-plugin-react/issues/64
[#193]: https://github.com/yannickcr/eslint-plugin-react/pull/193

## [3.2.3] - 2015-08-16
### Changed
* Update dependencies

### Fixed
* Fix object rest/spread handling ([#187][] @xjamundx, [#189][] @Morantron)

[3.2.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.2.2...v3.2.3
[#187]: https://github.com/yannickcr/eslint-plugin-react/pull/187
[#189]: https://github.com/yannickcr/eslint-plugin-react/pull/189

## [3.2.2] - 2015-08-11
### Changed
* Remove peerDependencies ([#178][])

[3.2.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.2.1...v3.2.2
[#178]: https://github.com/yannickcr/eslint-plugin-react/issues/178

## [3.2.1] - 2015-08-08
### Fixed
* Fix crash when propTypes don't have any parent ([#182][])
* Fix jsx-no-literals reporting errors outside JSX ([#183][] @CalebMorris)

[3.2.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.2.0...v3.2.1
[#182]: https://github.com/yannickcr/eslint-plugin-react/issues/182
[#183]: https://github.com/yannickcr/eslint-plugin-react/pull/183

## [3.2.0] - 2015-08-04
### Added
* Add [`jsx-max-props-per-line`][] rule ([#13][])
* Add [`jsx-no-literals`][] rule ([#176][] @CalebMorris)

### Changed
* Update dependencies

### Fixed
* Fix object access in [`jsx-no-undef`][] ([#172][])

[3.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.1.0...v3.2.0
[#13]: https://github.com/yannickcr/eslint-plugin-react/issues/13
[#176]: https://github.com/yannickcr/eslint-plugin-react/pull/176
[#172]: https://github.com/yannickcr/eslint-plugin-react/issues/172

## [3.1.0] - 2015-07-28
### Added
* Add event handlers to [`no-unknown-property`][] ([#164][] @mkenyon)
* Add customValidators option to [`prop-types`][] ([#145][] @CalebMorris)

### Changed
* Update dependencies
* Documentation improvements ([#167][] @ngbrown)

### Fixed
* Fix comment handling in [`jsx-curly-spacing`][] ([#165][])

[3.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v3.0.0...v3.1.0
[#164]: https://github.com/yannickcr/eslint-plugin-react/pull/164
[#145]: https://github.com/yannickcr/eslint-plugin-react/issues/145
[#165]: https://github.com/yannickcr/eslint-plugin-react/issues/165
[#167]: https://github.com/yannickcr/eslint-plugin-react/pull/167

## [3.0.0] - 2015-07-21
### Added
* Add jsx-no-duplicate-props rule ([#161][] @hummlas)
* Add allowMultiline option to the [`jsx-curly-spacing`][] rule ([#156][] @mathieumg)

### Breaking
* In [`jsx-curly-spacing`][] braces spanning multiple lines are now allowed with `never` option ([#156][] @mathieumg)

### Fixed
* Fix multiple var and destructuring handling in [`prop-types`][] ([#159][])
* Fix crash when retrieving propType name ([#163][])

[3.0.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.7.1...v3.0.0
[#161]: https://github.com/yannickcr/eslint-plugin-react/pull/161
[#156]: https://github.com/yannickcr/eslint-plugin-react/pull/156
[#159]: https://github.com/yannickcr/eslint-plugin-react/issues/159
[#163]: https://github.com/yannickcr/eslint-plugin-react/issues/163

## [2.7.1] - 2015-07-16
### Changed
* Update peerDependencies requirements ([#154][])
* Update codebase for ESLint v1.0.0
* Change oneOfType to actually keep the child types ([#148][] @CalebMorris)
* Documentation improvements ([#147][] @lencioni)

[2.7.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.7.0...v2.7.1
[#154]: https://github.com/yannickcr/eslint-plugin-react/issues/154
[#148]: https://github.com/yannickcr/eslint-plugin-react/issues/148
[#147]: https://github.com/yannickcr/eslint-plugin-react/pull/147

## [2.7.0] - 2015-07-11
### Added
* Add [`no-danger`][] rule ([#138][] @scothis)
* Add [`jsx-curly-spacing`][] rule ([#142][])

### Fixed
* Fix properties limitations on propTypes ([#139][])
* Fix component detection ([#144][])

[2.7.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.6.4...v2.7.0
[#138]: https://github.com/yannickcr/eslint-plugin-react/pull/138
[#142]: https://github.com/yannickcr/eslint-plugin-react/issues/142
[#139]: https://github.com/yannickcr/eslint-plugin-react/issues/139
[#144]: https://github.com/yannickcr/eslint-plugin-react/issues/144

## [2.6.4] - 2015-07-02
### Fixed
* Fix simple destructuring handling ([#137][])

[2.6.4]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.6.3...v2.6.4
[#137]: https://github.com/yannickcr/eslint-plugin-react/issues/137

## [2.6.3] - 2015-06-30
### Fixed
* Fix ignore option for [`prop-types`][] rule ([#135][])
* Fix nested props destructuring ([#136][])

[2.6.3]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.6.2...v2.6.3
[#135]: https://github.com/yannickcr/eslint-plugin-react/issues/135
[#136]: https://github.com/yannickcr/eslint-plugin-react/issues/136

## [2.6.2] - 2015-06-28
### Fixed
* Fix props validation when using a prop as an object key ([#132][])

[2.6.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.6.1...v2.6.2
[#132]: https://github.com/yannickcr/eslint-plugin-react/issues/132

## [2.6.1] - 2015-06-28
### Fixed
* Fix crash in [`prop-types`][] when encountering an empty variable declaration ([#130][])

[2.6.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.6.0...v2.6.1
[#130]: https://github.com/yannickcr/eslint-plugin-react/issues/130

## [2.6.0] - 2015-06-28
### Added
* Add support for nested propTypes ([#62][] [#105][] @Cellule)
* Add [`require-extension`][] rule ([#117][] @scothis)
* Add support for computed string format in [`prop-types`][] ([#127][] @Cellule)
* Add ES6 methods to [`sort-comp`][] default configuration ([#97][] [#122][])
* Add support for props destructuring directly on the this keyword
* Add `acceptTranspilerName` option to [`display-name`][] rule ([#75][])
* Add schema to validate rules options

### Changed
* Update dependencies

### Fixed
* Fix test command for Windows ([#114][] @Cellule)
* Fix detection of missing displayName and propTypes when `ecmaFeatures.jsx` is false ([#119][] @rpl)
* Fix propTypes destructuring with properties as string ([#118][] @Cellule)
* Fix [`jsx-sort-prop-types`][] support for keys as string ([#123][] @Cellule)
* Fix crash if a ClassProperty has only one token ([#125][])
* Fix invalid class property handling in [`jsx-sort-prop-types`][] ([#129][])

[2.6.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.5.2...v2.6.0
[#62]: https://github.com/yannickcr/eslint-plugin-react/issues/62
[#105]: https://github.com/yannickcr/eslint-plugin-react/issues/105
[#114]: https://github.com/yannickcr/eslint-plugin-react/pull/114
[#117]: https://github.com/yannickcr/eslint-plugin-react/pull/117
[#119]: https://github.com/yannickcr/eslint-plugin-react/pull/119
[#118]: https://github.com/yannickcr/eslint-plugin-react/issues/118
[#123]: https://github.com/yannickcr/eslint-plugin-react/pull/123
[#125]: https://github.com/yannickcr/eslint-plugin-react/issues/125
[#127]: https://github.com/yannickcr/eslint-plugin-react/pull/127
[#97]: https://github.com/yannickcr/eslint-plugin-react/issues/97
[#122]: https://github.com/yannickcr/eslint-plugin-react/issues/122
[#129]: https://github.com/yannickcr/eslint-plugin-react/issues/129
[#75]: https://github.com/yannickcr/eslint-plugin-react/issues/75

## [2.5.2] - 2015-06-14
### Fixed
* Fix regression in [`jsx-uses-vars`][] with `babel-eslint` ([#110][])

[2.5.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.5.1...v2.5.2
[#110]: https://github.com/yannickcr/eslint-plugin-react/issues/110

## [2.5.1] - 2015-06-14
### Changed
* Update dependencies
* Documentation improvements ([#99][] @morenoh149)

### Fixed
* Fix [`prop-types`][] crash when propTypes definition is invalid ([#95][])
* Fix [`jsx-uses-vars`][] for ES6 classes ([#96][])
* Fix hasOwnProperty that is taken for a prop ([#102][])

[2.5.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.5.0...v2.5.1
[#95]: https://github.com/yannickcr/eslint-plugin-react/issues/95
[#96]: https://github.com/yannickcr/eslint-plugin-react/issues/96
[#102]: https://github.com/yannickcr/eslint-plugin-react/issues/102
[#99]: https://github.com/yannickcr/eslint-plugin-react/pull/99

## [2.5.0] - 2015-06-04
### Added
* Add option to make [`wrap-multilines`][] more granular ([#94][] @PiPeep)

### Changed
* Update dependencies
* Documentation improvements ([#92][] [#93][] @lencioni)

[2.5.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.4.0...v2.5.0
[#94]: https://github.com/yannickcr/eslint-plugin-react/pull/94
[#92]: https://github.com/yannickcr/eslint-plugin-react/pull/92
[#93]: https://github.com/yannickcr/eslint-plugin-react/pull/93

## [2.4.0] - 2015-05-30
### Added
* Add pragma option to [`jsx-uses-react`][] ([#82][] @dominicbarnes)
* Add context props to [`sort-comp`][] ([#89][] @zertosh)

### Changed
* Update dependencies
* Documentation improvement ([#91][] @matthewwithanm)

### Fixed
* Fix itemID in [`no-unknown-property`][] rule ([#85][] @cody)
* Fix license field in package.json ([#90][] @zertosh)
* Fix usage of contructor in [`sort-comp`][] options ([#88][])

[2.4.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.3.0...v2.4.0
[#82]: https://github.com/yannickcr/eslint-plugin-react/pull/82
[#89]: https://github.com/yannickcr/eslint-plugin-react/pull/89
[#85]: https://github.com/yannickcr/eslint-plugin-react/pull/85
[#90]: https://github.com/yannickcr/eslint-plugin-react/pull/90
[#88]: https://github.com/yannickcr/eslint-plugin-react/issues/88
[#91]: https://github.com/yannickcr/eslint-plugin-react/pull/91

## [2.3.0] - 2015-05-14
### Added
* Add [`sort-comp`][] rule ([#39][])
* Add `allow-in-func` option to [`no-did-mount-set-state`][] ([#56][])

### Changed
* Update dependencies
* Improve errors locations for `prop-types`

### Fixed
* Fix quoted propTypes in ES6 ([#77][])

[2.3.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.2.0...v2.3.0
[#39]: https://github.com/yannickcr/eslint-plugin-react/issues/39
[#77]: https://github.com/yannickcr/eslint-plugin-react/issues/77
[#56]: https://github.com/yannickcr/eslint-plugin-react/issues/56

## [2.2.0] - 2015-04-22
### Added
* Add [`jsx-sort-prop-types`][] rule ([#38][] @AlexKVal)

### Changed
* Documentation improvements ([#71][] @AlexKVal)

### Fixed
* Fix variables marked as used when a prop has the same name ([#69][] @burnnat)

[2.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.1.1...v2.2.0
[#38]: https://github.com/yannickcr/eslint-plugin-react/issues/38
[#69]: https://github.com/yannickcr/eslint-plugin-react/pull/69
[#71]: https://github.com/yannickcr/eslint-plugin-react/pull/71

## [2.1.1] - 2015-04-17
### Added
* Add support for classes static properties ([#43][])
* Add tests for the `babel-eslint` parser
* Add ESLint as peerDependency ([#63][] @AlexKVal)

### Changed
* Documentation improvements ([#55][] @AlexKVal, [#60][] @chriscalo)

[2.1.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.1.0...v2.1.1
[#43]: https://github.com/yannickcr/eslint-plugin-react/issues/43
[#63]: https://github.com/yannickcr/eslint-plugin-react/pull/63
[#55]: https://github.com/yannickcr/eslint-plugin-react/pull/55
[#60]: https://github.com/yannickcr/eslint-plugin-react/pull/60

## [2.1.0] - 2015-04-06
### Added
* Add [`jsx-boolean-value`][] rule ([#11][])
* Add support for static methods in [`display-name`][] and [`prop-types`][] ([#48][])

### Changed
* Update [`jsx-sort-props`][] to reset the alphabetical verification on spread ([#47][] @zertosh)
* Update [`jsx-uses-vars`][] to be enabled by default ([#49][] @banderson)

### Fixed
* Fix describing comment for hasSpreadOperator() method ([#53][] @AlexKVal)

[2.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.0.2...v2.1.0
[#47]: https://github.com/yannickcr/eslint-plugin-react/pull/47
[#49]: https://github.com/yannickcr/eslint-plugin-react/pull/49
[#11]: https://github.com/yannickcr/eslint-plugin-react/issues/11
[#48]: https://github.com/yannickcr/eslint-plugin-react/issues/48
[#53]: https://github.com/yannickcr/eslint-plugin-react/pull/53

## [2.0.2] - 2015-03-31
### Fixed
* Fix ignore rest spread when destructuring props ([#46][])
* Fix component detection in [`prop-types`][] and [`display-name`][] ([#45][])
* Fix spread handling in [`jsx-sort-props`][] ([#42][] @zertosh)

[2.0.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.0.1...v2.0.2
[#46]: https://github.com/yannickcr/eslint-plugin-react/issues/46
[#45]: https://github.com/yannickcr/eslint-plugin-react/issues/45
[#42]: https://github.com/yannickcr/eslint-plugin-react/pull/42

## [2.0.1] - 2015-03-30
### Fixed
* Fix props detection when used in an object ([#41][])

[2.0.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v2.0.0...v2.0.1
[#41]: https://github.com/yannickcr/eslint-plugin-react/issues/41

## [2.0.0] - 2015-03-29
### Added
* Add [`jsx-sort-props`][] rule ([#16][])
* Add [`no-unknown-property`][] rule ([#28][])
* Add ignore option to [`prop-types`][] rule

### Changed
* Update dependencies

### Breaking
* In [`prop-types`][] the children prop is no longer ignored

### Fixed
* Fix components are now detected when using ES6 classes ([#24][])
* Fix [`prop-types`][] now return the right line/column ([#33][])
* Fix props are now detected when destructuring ([#27][])
* Fix only check for computed property names in [`prop-types`][] ([#36][] @burnnat)

[2.0.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.6.1...v2.0.0
[#16]: https://github.com/yannickcr/eslint-plugin-react/issues/16
[#28]: https://github.com/yannickcr/eslint-plugin-react/issues/28
[#24]: https://github.com/yannickcr/eslint-plugin-react/issues/24
[#33]: https://github.com/yannickcr/eslint-plugin-react/issues/33
[#27]: https://github.com/yannickcr/eslint-plugin-react/issues/27
[#36]: https://github.com/yannickcr/eslint-plugin-react/pull/36

## [1.6.1] - 2015-03-25
### Changed
* Update `jsx-quotes` documentation

### Fixed
* Fix [`jsx-no-undef`][] with `babel-eslint` ([#30][])
* Fix `jsx-quotes` on Literal childs ([#29][])

[1.6.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.6.0...v1.6.1
[#30]: https://github.com/yannickcr/eslint-plugin-react/issues/30
[#29]: https://github.com/yannickcr/eslint-plugin-react/issues/29

## [1.6.0] - 2015-03-22
### Added
* Add [`jsx-no-undef`][] rule
* Add `jsx-quotes` rule ([#12][])
* Add `@jsx` pragma support ([#23][])

### Changed
* Allow `this.getState` references (not calls) in lifecycle methods ([#22][] @benmosher)
* Update dependencies

### Fixed
* Fix [`react-in-jsx-scope`][] in Node.js env
* Fix usage of propTypes with an external object ([#9][])

[1.6.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.5.0...v1.6.0
[#12]: https://github.com/yannickcr/eslint-plugin-react/issues/12
[#23]: https://github.com/yannickcr/eslint-plugin-react/issues/23
[#9]: https://github.com/yannickcr/eslint-plugin-react/issues/9
[#22]: https://github.com/yannickcr/eslint-plugin-react/pull/22

## [1.5.0] - 2015-03-14
### Added
* Add [`jsx-uses-vars`][] rule

### Fixed
* Fix [`jsx-uses-react`][] for ESLint 0.17.0

[1.5.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.4.1...v1.5.0

## [1.4.1] - 2015-03-03
### Fixed
* Fix `this.props.children` marked as missing in props validation ([#7][])
* Fix usage of `this.props` without property ([#8][])

[1.4.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.4.0...v1.4.1
[#7]: https://github.com/yannickcr/eslint-plugin-react/issues/7
[#8]: https://github.com/yannickcr/eslint-plugin-react/issues/8

## [1.4.0] - 2015-02-24
### Added
* Add [`react-in-jsx-scope`][] rule ([#5][] @glenjamin)
* Add [`jsx-uses-react`][] rule ([#6][] @glenjamin)

### Changed
* Update [`prop-types`][] to check props usage insead of propTypes presence ([#4][])

[1.4.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.3.0...v1.4.0
[#4]: https://github.com/yannickcr/eslint-plugin-react/issues/4
[#5]: https://github.com/yannickcr/eslint-plugin-react/pull/5
[#6]: https://github.com/yannickcr/eslint-plugin-react/pull/6

## [1.3.0] - 2015-02-24
### Added
* Add [`no-did-mount-set-state`][] rule
* Add [`no-did-update-set-state`][] rule

### Changed
* Update dependencies

[1.3.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.2.2...v1.3.0

## [1.2.2] - 2015-02-09
### Changed
* Update dependencies

### Fixed
* Fix childs detection in [`self-closing-comp`][] ([#3][])

[1.2.2]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.2.1...v1.2.2
[#3]: https://github.com/yannickcr/eslint-plugin-react/issues/3

## [1.2.1] - 2015-01-29
### Changed
* Update Readme
* Update dependencies
* Update [`wrap-multilines`][] and [`self-closing-comp`][] rules for ESLint 0.13.0

[1.2.1]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.2.0...v1.2.1

## [1.2.0] - 2014-12-29
### Added
* Add [`self-closing-comp`][] rule

### Fixed
* Fix [`display-name`][] and [`prop-types`][] rules

[1.2.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.1.0...v1.2.0

## [1.1.0] - 2014-12-28
### Added
 * Add [`display-name`][] rule
 * Add [`wrap-multilines`][] rule
 * Add rules documentation
 * Add rules tests

[1.1.0]: https://github.com/yannickcr/eslint-plugin-react/compare/v1.0.0...v1.1.0

## 1.0.0 - 2014-12-16
### Added
 * First revision

[`display-name`]: docs/rules/display-name.md
[`forbid-component-props`]: docs/rules/forbid-component-props.md
[`forbid-elements`]: docs/rules/forbid-elements.md
[`forbid-foreign-prop-types`]: docs/rules/forbid-foreign-prop-types.md
[`forbid-prop-types`]: docs/rules/forbid-prop-types.md
[`no-array-index-key`]: docs/rules/no-array-index-key.md
[`no-children-prop`]: docs/rules/no-children-prop.md
[`no-danger`]: docs/rules/no-danger.md
[`no-danger-with-children`]: docs/rules/no-danger-with-children.md
[`no-deprecated`]: docs/rules/no-deprecated.md
[`no-did-mount-set-state`]: docs/rules/no-did-mount-set-state.md
[`no-did-update-set-state`]: docs/rules/no-did-update-set-state.md
[`no-direct-mutation-state`]: docs/rules/no-direct-mutation-state.md
[`no-find-dom-node`]: docs/rules/no-find-dom-node.md
[`no-is-mounted`]: docs/rules/no-is-mounted.md
[`no-multi-comp`]: docs/rules/no-multi-comp.md
[`no-render-return-value`]: docs/rules/no-render-return-value.md
[`no-set-state`]: docs/rules/no-set-state.md
[`no-string-refs`]: docs/rules/no-string-refs.md
[`no-unescaped-entities`]: docs/rules/no-unescaped-entities.md
[`no-unknown-property`]: docs/rules/no-unknown-property.md
[`no-unused-prop-types`]: docs/rules/no-unused-prop-types.md
[`no-will-update-set-state`]: docs/rules/no-will-update-set-state.md
[`prefer-es6-class`]: docs/rules/prefer-es6-class.md
[`prefer-stateless-function`]: docs/rules/prefer-stateless-function.md
[`prop-types`]: docs/rules/prop-types.md
[`react-in-jsx-scope`]: docs/rules/react-in-jsx-scope.md
[`require-optimization`]: docs/rules/require-optimization.md
[`require-render-return`]: docs/rules/require-render-return.md
[`self-closing-comp`]: docs/rules/self-closing-comp.md
[`sort-comp`]: docs/rules/sort-comp.md
[`sort-prop-types`]: docs/rules/sort-prop-types.md
[`style-prop-object`]: docs/rules/style-prop-object.md
[`jsx-boolean-value`]: docs/rules/jsx-boolean-value.md
[`jsx-closing-bracket-location`]: docs/rules/jsx-closing-bracket-location.md
[`jsx-curly-spacing`]: docs/rules/jsx-curly-spacing.md
[`jsx-equals-spacing`]: docs/rules/jsx-equals-spacing.md
[`jsx-filename-extension`]: docs/rules/jsx-filename-extension.md
[`jsx-first-prop-new-line`]: docs/rules/jsx-first-prop-new-line.md
[`jsx-handler-names`]: docs/rules/jsx-handler-names.md
[`jsx-indent`]: docs/rules/jsx-indent.md
[`jsx-indent-props`]: docs/rules/jsx-indent-props.md
[`jsx-key`]: docs/rules/jsx-key.md
[`jsx-max-props-per-line`]: docs/rules/jsx-max-props-per-line.md
[`jsx-no-bind`]: docs/rules/jsx-no-bind.md
[`jsx-no-comment-textnodes`]: docs/rules/jsx-no-comment-textnodes.md
[`jsx-no-duplicate-props`]: docs/rules/jsx-no-duplicate-props.md
[`jsx-no-literals`]: docs/rules/jsx-no-literals.md
[`jsx-no-target-blank`]: docs/rules/jsx-no-target-blank.md
[`jsx-no-undef`]: docs/rules/jsx-no-undef.md
[`jsx-pascal-case`]: docs/rules/jsx-pascal-case.md
[`require-default-props`]: docs/rules/require-default-props.md
[`jsx-sort-props`]: docs/rules/jsx-sort-props.md
[`jsx-space-before-closing`]: docs/rules/jsx-space-before-closing.md
[`jsx-tag-spacing`]: docs/rules/jsx-tag-spacing.md
[`jsx-uses-react`]: docs/rules/jsx-uses-react.md
[`jsx-uses-vars`]: docs/rules/jsx-uses-vars.md
[`jsx-wrap-multilines`]: docs/rules/jsx-wrap-multilines.md
[`void-dom-elements-no-children`]: docs/rules/void-dom-elements-no-children.md
[`default-props-match-prop-types`]: docs/rules/default-props-match-prop-types.md
[`no-redundant-should-component-update`]: docs/rules/no-redundant-should-component-update.md
[`jsx-closing-tag-location`]: docs/rules/jsx-closing-tag-location.md
[`no-unused-state`]: docs/rules/no-unused-state.md
[`boolean-prop-naming`]: docs/rules/boolean-prop-naming.md
[`no-typos`]: docs/rules/no-typos.md
[`jsx-sort-prop-types`]: docs/rules/sort-prop-types.md
[`require-extension`]: docs/rules/require-extension.md
[`no-comment-textnodes`]: docs/rules/jsx-no-comment-textnodes.md
[`wrap-multilines`]: docs/rules/jsx-wrap-multilines.md
[`jsx-curly-brace-presence`]: docs/rules/jsx-curly-brace-presence.md
[`jsx-one-expression-per-line`]: docs/rules/jsx-one-expression-per-line.md
[`destructuring-assignment`]: docs/rules/destructuring-assignment.md
[`no-access-state-in-setstate`]: docs/rules/no-access-state-in-setstate.md
[`button-has-type`]: docs/rules/button-has-type.md
[`forbid-dom-props`]: docs/rules/forbid-dom-props.md
[`jsx-child-element-spacing`]: docs/rules/jsx-child-element-spacing.md
[`no-this-in-sfc`]: docs/rules/no-this-in-sfc.md
[`jsx-sort-default-props`]: docs/rules/jsx-sort-default-props.md
[`jsx-max-depth`]: docs/rules/jsx-max-depth.md
[`jsx-props-no-multi-spaces`]: docs/rules/jsx-props-no-multi-spaces.md
[`no-unsafe`]: docs/rules/no-unsafe.md
[`jsx-fragments`]: docs/rules/jsx-fragments.md
[`jsx-props-no-spreading`]: docs/rules/jsx-props-no-spreading.md
[`prefer-read-only-props`]: docs/rules/prefer-read-only-props.md
[`state-in-constructor`]: docs/rules/state-in-constructor.md
[`jsx-props-no-spreading`]: docs/rules/jsx-props-no-spreading.md
[`static-property-placement`]: docs/rules/static-property-placement.md
[`jsx-curly-newline`]: docs/rules/jsx-curly-newline.md
