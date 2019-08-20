# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## 7.0.17
* Fix TypeScript type definitions (by Bob Matcuk and Jan Buschtöns).

## 7.0.16
* Revert Custom Properties fix until PostCSS 8.0.

## 7.0.15
* Fix Custom Properties support (by Ivan Solovev).

## 7.0.14
* Fix tokenizer for `postcss-less` (by Matt Lyons).

## 7.0.13
* Fix parsing regression in 7.0.12 for comments between property and value.

## 7.0.12
* Fix parsing broken CSS with two words in declaration property.

## 7.0.11
* Fix source maps on declaration semicolon (by Niklas Mischkulnig).

## 7.0.10
* Fix source maps (by Niklas Mischkulnig).

## 7.0.9
* Increase stringifing performance for non-raws AST.

## 7.0.8
* Fix TypeScript definitions (by Ankur Oberoi).
* Use `support-colors` 6.0.

## 7.0.7
* Extend `Error` in `CssSyntaxError`.

## 7.0.6
* Fix parsing files with BOM (by Veniamin Krol).

## 7.0.5
* Reduce npm package size (by Gilad Peleg).

## 7.0.4
* Fix safe parser regression.

## 7.0.3
* Fix tokenizer extendability (by Andrew Powell).
* Reduce npm package size.

## 7.0.2
* Fix warning text (by Rui Pedro M Lima).

## 7.0.1
* Fix JSDoc (by Steven Lambert).

## 7.0 “President Amy”
* Remove Node.js 9 and Node.js 4 support.
* Remove IE and “dead” browsers support for client-side Babel transpiling.
* Add CSS position on error happened inside `walk()` (by Nikhil Gaba).
* Add `LazyResult#finally` (by Igor Kamyshev).
* Add warning on calling PostCSS without plugins and syntax options.
* Reduce client-side size.

## 6.0.23
* Fix parsing nested at-rules without semicolon, params, and spaces.
* Fix docs (by Kevin Schiffer and Pat Cavit).

## 6.0.22
* Fix `Node#prev` and `Node#next` on missed parent.

## 6.0.21
* Rename Chinese docs to fix `yarnpkg.com` issue.

## 6.0.20
* Better error message on `null` as input CSS.

## 6.0.19
* Fix TypeScript definitions for source maps (by Oleh Kuchuk).
* Fix `source` field in TypeScript definitions (by Sylvain Pollet-Villard).

## 6.0.18
* Use primitive object in TypeScript definitions (by Sylvain Pollet-Villard).

## 6.0.17
* Fix parsing comment in selector between word tokens (by Oleh Kuchuk).

## 6.0.16
* Fix warning text (by Michael Keller).

## 6.0.15
* Add warning about missed `from` option on `process().then()` call.
* Add IE 10 support.

## 6.0.14
* Fix TypeScript definitions (by Jed Mao).

## 6.0.13
* Fix TypeScript definitions for case of multiple PostCSS versions
  in `node_modules` (by Chris Eppstein).
* Use `source-map` 0.6.

## 6.0.12
* Don’t copy `*` hack to declaration indent.

## 6.0.11
* Add upper case `!IMPORTANT` support.

## 6.0.10
* Reduce PostCSS size in webpack bundle.

## 6.0.9
* Improve error message for plugin with old PostCSS (by Igor Adamenko).

## 6.0.8
* Fix Node.js 4.2.2 support.

## 6.0.7
* Fix base64 decoding for old Node.js and browser.

## 6.0.6
* Fix `end` position in at-rule without semicolon (by Oleh Kuchuk).

## 6.0.5
* Move Babel config from `package.json` for `node_modules` compiling cases.

## 6.0.4
* Fix parsing `;;` after rules.
* Use Chalk 2.0.

## 6.0.3
* Fix escape sequences parsing (by Oleh Kuchuk).
* Added ability to force disable colors with an environment variable.
* Improved color detection of some terminal apps.

## 6.0.2
* Keep `raws.before` on moving `Root` children to new `Root`.

## 6.0.1
* Fix parser extensibility to use it in Safe Parser.

## 6.0 “Marquis Orias”
* Remove node.js 0.12 support.
* Remove deprecated method from PostCSS 4.
* Insert methods remove child from previous parent, instead of closing.
* Insert methods and cloning doesn’t clean `raws` anymore.
* Methods `moveTo`, `moveAfter`, `moveBefore` were deprecated.
* Options was changed in `Plugin#process(css, processOptions, pluginOptions)`.
* Add stream parser to reduce memory usage (by Oleh Kuchuk).
* Add `before()`/`after()` shortcuts for `node.parent.insertBefore(node, x)`.
* Add `Rule#raws.ownSemicolon` for semicolon after templates for `@apply`.
* Use `babel-preset-env` to compile npm package.
* Remove `js-base64` from dependencies (by Roman Dvornov).
* Fix error message on single `:` in CSS.
* Move tests to Jest.
* Clean up test (by Gabriel Kalani).

## 5.2.18
* Fix TypeScript definitions for case of multiple PostCSS versions
  in `node_modules` (by Chris Eppstein).

## 5.2.17
* Add `postcss-sass` suggestion to syntax error on `.sass` input.

## 5.2.16
* Better error on wrong argument in node constructor.

## 5.2.15
* Fix TypeScript definitions (by bumbleblym).

## 5.2.14
* Fix browser bundle building in webpack (by janschoenherr).

## 5.2.13
* Do not add comment to important raws.
* Fix JSDoc (by Dmitry Semigradsky).

## 5.2.12
* Fix typo in deprecation message (by Garet McKinley).

## 5.2.11
* Fix TypeScript definitions (by Jed Mao).

## 5.2.10
* Fix TypeScript definitions (by Jed Mao).

## 5.2.9
* Update TypeScript definitions (by Jed Mao).

## 5.2.8
* Fix error message (by Ben Briggs).

## 5.2.7
* Better error message on syntax object in plugins list.

## 5.2.6
* Fix `postcss.vendor` for values with spaces (by 刘祺).

## 5.2.5
* Better error message on unclosed string (by Ben Briggs).

## 5.2.4
* Improve terminal CSS syntax highlight (by Simon Lydell).

## 5.2.3
* Better color highlight in syntax error code frame.
* Fix color highlight support in old systems.

## 5.2.2
* Update `Processor#version`.

## 5.2.1
* Fix source map path for CSS without `from` option (by Michele Locati).

## 5.2 “Duke Vapula”
* Add syntax highlight to code frame in syntax error (by Andrey Popp).
* Use Babel code frame style and size in syntax error.
* Add `[` and `]` tokens to parse `[attr=;] {}` correctly.
* Add `ignoreErrors` options to tokenizer (by Andrey Popp).
* Fix error position on tab indent (by Simon Lydell).

## 5.1.2
* Suggests SCSS/Less parsers on parse errors depends on file extension.

## 5.1.1
* Fix TypeScript definitions (by Efremov Alexey).

## 5.1 “King and President Zagan”
* Add URI in source map support (by Mark Finger).
* Add `map.from` option (by Mark Finger).
* Add `<no source>` mappings for nodes without source (by Bogdan Chadkin).
* Add function value support to `map.prev` option (by Chris Montoro).
* Add declaration value type check in shortcut creating (by 刘祺).
* `Result#warn` now returns new created warning.
* Don’t call plugin creator in `postcss.plugin` call.
* Add source maps to PostCSS ES5 build.
* Add JSDoc to PostCSS classes.
* Clean npm package from unnecessary docs.

## 5.0.21
* Fix support with input source mao with `utf8` encoding name.

## 5.0.20
* Fix between raw value parsing (by David Clark).
* Update TypeScript definitions (by Jed Mao).
* Clean fake node.source after `append(string)`.

## 5.0.19
* Fix indent-based syntaxes support.

## 5.0.18
* Parse new lines according W3C CSS syntax specification.

## 5.0.17
* Fix options argument in `Node#warn` (by Ben Briggs).
* Fix TypeScript definitions (by Jed Mao).

## 5.0.16
* Fix CSS syntax error position on unclosed quotes.

## 5.0.15
* Fix `Node#clone()` on `null` value somewhere in node.

## 5.0.14
* Allow to use PostCSS in webpack bundle without JSON loader.

## 5.0.13
* Fix `index` and `word` options in `Warning#toString` (by Bogdan Chadkin).
* Fix input source content loading in errors.
* Fix map options on using `LazyResult` as input CSS.
* 100% test coverage.
* Use Babel 6.

## 5.0.12
* Allow passing a previous map with no mappings (by Andreas Lind).

## 5.0.11
* Increase plugins performance by 1.5 times.

## 5.0.10
* Fix warning from nodes without source.

## 5.0.9
* Fix source map type detection (by @asan).

## 5.0.8
* Fixed a missed step in `5.0.7` that caused the module to be published as
  ES6 code.

## 5.0.7
* PostCSS now requires that node 0.12 is installed via the engines property
  in package.json (by Howard Zuo).

## 5.0.6
* Fix parsing nested at-rule without semicolon (by Matt Drake).
* Trim `Declaration#value` (by Bogdan Chadkin).

## 5.0.5
* Fix multi-tokens property parsing (by Matt Drake).

## 5.0.4
* Fix start position in `Root#source`.
* Fix source map annotation, when CSS uses `\r\n` (by Mohammad Younes).

## 5.0.3
* Fix `url()` parsing.
* Fix using `selectors` in `Rule` constructor.
* Add start source to `Root` node.

## 5.0.2
* Fix `remove(index)` to be compatible with 4.x plugin.

## 5.0.1
* Fix PostCSS 4.x plugins compatibility.
* Fix type definition loading (by Jed Mao).

## 5.0 “President Valac”
* Remove `safe` option. Move Safe Parser to separate project.
* `Node#toString` does not include `before` for root nodes.
* Remove plugin returning `Root` API.
* Remove Promise polyfill for node.js 0.10.
* Deprecate `eachInside`, `eachDecl`, `eachRule`, `eachAtRule` and `eachComment`
  in favor of `walk`, `walkDecls`, `walkRules`, `walkAtRules` and `walkComments`
  (by Jed Mao).
* Deprecate `Container#remove` and `Node#removeSelf`
  in favor of `Container#removeChild` and `Node#remove` (by Ben Briggs).
* Deprecate `Node#replace` in favor of `replaceWith` (by Ben Briggs).
* Deprecate raw properties in favor of `Node#raws` object.
* Deprecate `Node#style` in favor of `raw`.
* Deprecate `CssSyntaxError#generated` in favor of `input`.
* Deprecate `Node#cleanStyles` in favor of `cleanRaws`.
* Deprecate `Root#prevMap` in favor of `Root.source.input.map`.
* Add `syntax`, `parser` and `stringifier` options for Custom Syntaxes.
* Add stringifier option to `Node#toString`.
* Add `Result#content` alias for non-CSS syntaxes.
* Add `plugin.process(css)` shortcut to every plugin function (by Ben Briggs).
* Add multiple nodes support to insert methods (by Jonathan Neal).
* Add `Node#warn` shortcut (by Ben Briggs).
* Add `word` and `index` options to errors and warnings (by David Clark).
* Add `line`, `column` properties to `Warning`.
* Use `supports-color` library to detect color support in error output.
* Add type definitions for TypeScript plugin developers (by Jed Mao).
* `Rule#selectors` setter detects separators.
* Add `postcss.stringify` method.
* Throw descriptive errors for incorrectly formatted plugins.
* Add docs to npm release.
* Fix `url()` parsing.
* Fix Windows support (by Jed Mao).

## 4.1.16
* Fix errors without stack trace.

## 4.1.15
* Allow asynchronous plugins to change processor plugins list (by Ben Briggs).

## 4.1.14
* Fix for plugins packs defined by `postcss.plugin`.

## 4.1.13
* Fix input inlined source maps with UTF-8 encoding.

## 4.1.12
* Update Promise polyfill.

## 4.1.11
* Fix error message on wrong plugin format.

## 4.1.10
* Fix Promise behavior on sync plugin errors.
* Automatically fill `plugin` field in `CssSyntaxError`.
* Fix warning message (by Ben Briggs).

## 4.1.9
* Speed up `node.clone()`.

## 4.1.8
* Accepts `Processor` instance in `postcss()` constructor too.

## 4.1.7
* Speed up `postcss.list` (by Bogdan Chadkin).

## 4.1.6
* Fix Promise behavior on parsing error.

## 4.1.5
* Parse at-words in declaration values.

## 4.1.4
* Fix Promise polyfill dependency (by Anton Yakushev and Matija Marohnić).

## 4.1.3
* Add Promise polyfill for node.js 0.10 and IE.

## 4.1.2
* List helpers can be accessed independently `var space = postcss.list.space`.

## 4.1.1
* Show deprecated message only once.

## 4.1 “Marquis Andras”
* Asynchronous plugin support.
* Add warnings from plugins and `Result#messages`.
* Add `postcss.plugin()` to create plugins with a standard API.
* Insert nodes by CSS string.
* Show version warning message on error from an outdated plugin.
* Send `Result` instance to plugins as the second argument.
* Add `CssSyntaxError#plugin`.
* Add `CssSyntaxError#showSourceCode()`.
* Add `postcss.list` and `postcss.vendor` aliases.
* Add `Processor#version`.
* Parse wrong closing bracket.
* Parse `!important` statement with spaces and comments inside (by Ben Briggs).
* Throw an error on declaration without `prop` or `value` (by Philip Peterson).
* Fix source map mappings position.
* Add indexed source map support.
* Always set `error.generated`.
* Clean all source map annotation comments.

## 4.0.6
* Remove `babel` from released package dependencies (by Andres Suarez).

## 4.0.5
* Fix error message on double colon in declaration.

## 4.0.4
* Fix indent detection in some rare cases.

## 4.0.3
* Faster API with 6to5 Loose mode.
* Fix indexed source maps support.

## 4.0.2
* Do not copy IE hacks to code style.

## 4.0.1
* Add `source.input` to `Root` too.

## 4.0 “Duke Flauros”
* Rename `Container#childs` to `nodes`.
* Rename `PostCSS#processors` to `plugins`.
* Add `Node#replaceValues()` method.
* Add `Node#moveTo()`, `moveBefore()` and `moveAfter()` methods.
* Add `Node#cloneBefore()` and `cloneAfter()` shortcuts.
* Add `Node#next()`, `prev()` and `root()` shortcuts.
* Add `Node#replaceWith()` method.
* Add `Node#error()` method.
* Add `Container#removeAll()` method.
* Add filter argument to `eachDecl()` and `eachAtRule()`.
* Add `Node#source.input` and move `source.file` or `source.id` to `input`.
* Change code indent, when node was moved.
* Better fix code style on `Rule`, `AtRule` and `Comment` nodes changes.
* Allow to create rules and at-rules by hash shortcut in append methods.
* Add class name to CSS syntax error output.

## 3.0.7
* Fix IE filter parsing with multiple commands.
* Safer way to consume PostCSS object as plugin (by Maxime Thirouin).

## 3.0.6
* Fix missing semicolon when comment comes after last declaration.
* Fix Safe Mode declaration parsing on unclosed blocks.

## 3.0.5
* Fix parser to support difficult cases with backslash escape and brackets.
* Add `CssSyntaxError#stack` (by Maxime Thirouin).

## 3.0.4
* Fix Safe Mode on unknown word before declaration.

## 3.0.3
* Increase tokenizer speed (by Roman Dvornov).

## 3.0.2
* Fix empty comment parsing.
* Fix `Root#normalize` in some inserts.

## 3.0.1
* Fix Rhino JS runtime support.
* Typo in deprecated warning (by Maxime Thirouin).

## 3.0 “Marquis Andrealphus”
* New parser, which become the fastest ever CSS parser written in JavaScript.
* Parser can now parse declarations and rules in one parent (like in `@page`)
  and nested declarations for plugins like `postcss-nested`.
* Child nodes array is now in `childs` property, instead of `decls` and `rules`.
* `map.inline` and `map.sourcesContent` options are now `true` by default.
* Fix iterators (`each`, `insertAfter`) on children array changes.
* Use previous source map to show origin source of CSS syntax error.
* Use 6to5 ES6 compiler, instead of ES6 Transpiler.
* Use code style for manually added rules from existing rules.
* Use `from` option from previous source map `file` field.
* Set `to` value to `from` if `to` option is missing.
* Use better node source name when missing `from` option.
* Show a syntax error when `;` is missed between declarations.
* Allow to pass `PostCSS` instance or list of plugins to `use()` method.
* Allow to pass `Result` instance to `process()` method.
* Trim Unicode BOM on source maps parsing.
* Parse at-rules without spaces like `@import"file"`.
* Better previous `sourceMappingURL` annotation comment cleaning.
* Do not remove previous `sourceMappingURL` comment on `map.annotation: false`.
* Parse nameless at-rules in Safe Mode.
* Fix source map generation for nodes without source.
* Fix next child `before` if `Root` first child got removed.

## 2.2.6
* Fix map generation for nodes without source (by Josiah Savary).

## 2.2.5
* Fix source map with BOM marker support (by Mohammad Younes).
* Fix source map paths (by Mohammad Younes).

## 2.2.4
* Fix `prepend()` on empty `Root`.

## 2.2.3
* Allow to use object shortcut in `use()` with functions like `autoprefixer`.

## 2.2.2
* Add shortcut to set processors in `use()` via object with `.postcss` property.

## 2.2.1
* Send `opts` from `Processor#process(css, opts)` to processors.

## 2.2 “Marquis Cimeies”
* Use GNU style syntax error messages.
* Add `Node#replace` method.
* Add `CssSyntaxError#reason` property.

## 2.1.2
* Fix UTF-8 support in inline source map.
* Fix source map `sourcesContent` if there is no `from` and `to` options.

## 2.1.1
* Allow to miss `to` and `from` options for inline source maps.
* Add `Node#source.id` if file name is unknown.
* Better detect splitter between rules in CSS concatenation tools.
* Automatically clone node in insert methods.

## 2.1 “King Amdusias”
* Change Traceur ES6 compiler to ES6 Transpiler.
* Show broken CSS line in syntax error.

## 2.0 “King Belial”
* Project was rewritten from CoffeeScript to ES6.
* Add Safe Mode to works with live input or with hacks from legacy code.
* More safer parser to pass all hacks from Browserhacks.com.
* Use real properties instead of magic getter/setter for raw properties.

## 1.0 “Marquis Decarabia”
* Save previous source map for each node to support CSS concatenation
  with multiple previous maps.
* Add `map.sourcesContent` option to add origin content to `sourcesContent`
  inside map.
* Allow to set different place of output map in annotation comment.
* Allow to use arrays and `Root` in `Container#append` and same methods.
* Add `Root#prevMap` with information about previous map.
* Allow to use latest PostCSS from GitHub by npm.
* `Result` now is lazy and it will generate output CSS only if you use `css`
  or `map` property.
* Use separated `map.prev` option to set previous map.
* Rename `inlineMap` option to `map.inline`.
* Rename `mapAnnotation` option to `map.annotation`.
* `Result#map` now return `SourceMapGenerator` object, instead of string.
* Run previous map autodetect only if input CSS contains annotation comment.
* Add `map: 'inline'` shortcut for `map: { inline: true }` option.
* `Node#source.file` now will contains absolute path.
* Clean `Declaration#between` style on node clone.

## 0.3.5
* Allow to use `Root` or `Result` as first argument in `process()`.
* Save parsed AST to `Result#root`.

## 0.3.4
* Better space symbol detect to read UTF-8 BOM correctly.

## 0.3.3
* Remove source map hacks by using new Mozilla’s `source-map` (by Simon Lydell).

## 0.3.2
* Add URI encoding support for inline source maps.

## 0.3.1
* Fix relative paths from previous source map.
* Safer space split in `Rule#selectors` (by Simon Lydell).

## 0.3 “Prince Seere”
* Add `Comment` node for comments between declarations or rules.
* Add source map annotation comment to output CSS.
* Allow to inline source map to annotation comment by data:uri.
* Fix source maps on Windows.
* Fix source maps for subdirectory (by Dmitry Nikitenko and Simon Lydell).
* Autodetect previous source map.
* Add `first` and `last` shortcuts to container nodes.
* Parse `!important` to separated property in `Declaration`.
* Allow to break iteration by returning `false`.
* Copy code style to new nodes.
* Add `eachInside` method to recursively iterate all nodes.
* Add `selectors` shortcut to get selectors array.
* Add `toResult` method to `Rule` to simplify work with several input files.
* Clean declaration’s `value`, rule’s `selector` and at-rule’s `params`
  by storing spaces in `between` property.

## 0.2 “Duke Dantalion”
* Add source map support.
* Add shortcuts to create nodes.
* Method `process()` now returns object with `css` and `map` keys.
* Origin CSS file option was renamed from `file` to `from`.
* Rename `Node#remove()` method to `removeSelf()` to fix name conflict.
* Node source was moved to `source` property with origin file
  and node end position.
* You can set own CSS generate function.

## 0.1 “Count Andromalius”
* Initial release.
