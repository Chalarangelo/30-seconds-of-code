# 3.1.1

* Fix: typescript definitions weren't in the published package.

# 3.1.0

* Fixed numerous bugs in attribute nodes relating to the handling of comments
  and whitespace. There's significant changes to `attrNode.spaces` and `attrNode.raws` since the `3.0.0` release.
* Added `Attribute#offsetOf(part)` to get the offset location of
  attribute parts like `"operator"` and `"value"`. This is most
  often added to `Attribute#sourceIndex` for error reporting.

# 3.0.0

## Breaking changes

* Some tweaks to the tokenizer/attribute selector parsing mean that whitespace
  locations might be slightly different to the 2.x code.
* Better attribute selector parsing with more validation; postcss-selector-parser
  no longer uses regular expressions to parse attribute selectors.
* Added an async API (thanks to @jacobp100); the default `process` API is now
  async, and the sync API is now accessed through `processSync` instead.
* `process()` and `processSync()` now return a string instead of the Processor
  instance.
* Tweaks handling of Less interpolation (thanks to @jwilsson).
* Removes support for Node 0.12.

## Other changes

* `ast()` and `astSync()` methods have been added to the `Processor`. These
  return the `Root` node of the selectors after processing them.
* `transform()` and `transformSync()` methods have been added to the
  `Processor`. These return the value returned by the processor callback
  after processing the selectors.
* Set the parent when inserting a node (thanks to @chriseppstein).
* Correctly adjust indices when using insertBefore/insertAfter (thanks to @tivac).
* Fixes handling of namespaces with qualified tag selectors.
* `process`, `ast` and `transform` (and their sync variants) now accept a
  `postcss` rule node. When provided, better errors are generated and selector
  processing is automatically set back to the rule selector (unless the `updateSelector` option is set to `false`.)
* Now more memory efficient when tokenizing selectors.

### Upgrade hints

The pattern of:

`rule.selector = processor.process(rule.selector).result.toString();`

is now:

`processor.processSync(rule)`

# 2.2.3

* Resolves an issue where the parser would not reduce multiple spaces between an
  ampersand and another simple selector in lossy mode (thanks to @adam-26).

# 2.2.2

* No longer hangs on an unescaped semicolon; instead the parser will throw
  an exception for these cases.

# 2.2.1

* Allows a consumer to specify whitespace tokens when creating a new Node
  (thanks to @Semigradsky).

# 2.2.0

* Added a new option to normalize whitespace when parsing the selector string
  (thanks to @adam-26).

# 2.1.1

* Better unquoted value handling within attribute selectors
  (thanks to @evilebottnawi).

# 2.1.0

* Added: Use string constants for all node types & expose them on the main
  parser instance (thanks to @Aweary).

# 2.0.0

This release contains the following breaking changes:

* Renamed all `eachInside` iterators to `walk`. For example, `eachTag` is now
  `walkTags`, and `eachInside` is now `walk`.
* Renamed `Node#removeSelf()` to `Node#remove()`.
* Renamed `Container#remove()` to `Container#removeChild()`.
* Renamed `Node#raw` to `Node#raws` (thanks to @davidtheclark).
* Now parses `&` as the *nesting* selector, rather than a *tag* selector.
* Fixes misinterpretation of Sass interpolation (e.g. `#{foo}`) as an
  id selector (thanks to @davidtheclark).

and;

* Fixes parsing of attribute selectors with equals signs in them
  (e.g. `[data-attr="foo=bar"]`) (thanks to @montmanu).
* Adds `quoted` and `raw.unquoted` properties to attribute nodes
  (thanks to @davidtheclark).

# 1.3.3

* Fixes an infinite loop on `)` and `]` tokens when they had no opening pairs.
  Now postcss-selector-parser will throw when it encounters these lone tokens.

# 1.3.2

* Now uses plain integers rather than `str.charCodeAt(0)` for compiled builds.

# 1.3.1

* Update flatten to v1.x (thanks to @shinnn).

# 1.3.0

* Adds a new node type, `String`, to fix a crash on selectors such as
  `foo:bar("test")`.

# 1.2.1

* Fixes a crash when the parser encountered a trailing combinator.

# 1.2.0

* A more descriptive error is thrown when the parser expects to find a
  pseudo-class/pseudo-element (thanks to @ashelley).
* Adds support for line/column locations for selector nodes, as well as a
  `Node#sourceIndex` method (thanks to @davidtheclark).

# 1.1.4

* Fixes a crash when a selector started with a `>` combinator. The module will
  now no longer throw if a selector has a leading/trailing combinator node.

# 1.1.3

* Fixes a crash on `@` tokens.

# 1.1.2

* Fixes an infinite loop caused by using parentheses in a non-pseudo element
  context.

# 1.1.1

* Fixes a crash when a backslash ended a selector string.

# 1.1.0

* Adds support for replacing multiple nodes at once with `replaceWith`
  (thanks to @jonathantneal).
* Parser no longer throws on sequential IDs and trailing commas, to support
  parsing of selector hacks.

# 1.0.1

* Fixes using `insertAfter` and `insertBefore` during iteration.

# 1.0.0

* Adds `clone` and `replaceWith` methods to nodes.
* Adds `insertBefore` and `insertAfter` to containers.
* Stabilises API.

# 0.0.5

* Fixes crash on extra whitespace inside a pseudo selector's parentheses.
* Adds sort function to the container class.
* Enables the parser to pass its input through without transforming.
* Iteration-safe `each` and `eachInside`.

# 0.0.4

* Tidy up redundant duplication.
* Fixes a bug where the parser would loop infinitely on universal selectors
  inside pseudo selectors.
* Adds `length` getter and `eachInside`, `map`, `reduce` to the container class.
* When a selector has been removed from the tree, the root node will no longer
  cast it to a string.
* Adds node type iterators to the container class (e.g. `eachComment`).
* Adds filter function to the container class.
* Adds split function to the container class.
* Create new node types by doing `parser.id(opts)` etc.
* Adds support for pseudo classes anywhere in the selector.

# 0.0.3

* Adds `next` and `prev` to the node class.
* Adds `first` and `last` getters to the container class.
* Adds `every` and `some` iterators to the container class.
* Add `empty` alias for `removeAll`.
* Combinators are now types of node.
* Fixes the at method so that it is not an alias for `index`.
* Tidy up creation of new nodes in the parser.
* Refactors how namespaces are handled for consistency & less redundant code.
* Refactors AST to use `nodes` exclusively, and eliminates excessive nesting.
* Fixes nested pseudo parsing.
* Fixes whitespace parsing.

# 0.0.2

* Adds support for namespace selectors.
* Adds support for selectors joined by escaped spaces - such as `.\31\ 0`.

# 0.0.1

* Initial release.
