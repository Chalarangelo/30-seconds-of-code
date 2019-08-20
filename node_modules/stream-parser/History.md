
0.3.1 / 2015-06-04
==================

  * package: allow any "debug" v2

0.3.0 / 2014-06-22
==================

  * add a `_skipBytes()` function
  * History: fix changelog output

0.2.0 / 2014-06-21
==================

  * index: emit an "error" event when data is written with no parsing function is in place
  * package: fix "main" field
  * rename "lib/parser.js" to "index.js"
  * README: use svg for Travis badge

0.1.2 / 2014-06-16
==================

  * parser: use %o debug v1 formatting

0.1.1 / 2014-06-16
==================

  * package: pin "readable-stream" to v1.0
  * package: update "debug" to v1.0.0
  * travis: test node v0.11
  * travis: don't test node v0.9

0.1.0 / 2013-06-04
==================

  * travis: test node v0.10
  * test: add test case from #3
  * parser: add jsdocs for the `process()` function
  * parser: use a thunk-based "trampoline" technique to prevent stack overflows on synchronous parsers (fixes #3)

0.0.5 / 2013-03-06
==================

  * Update for node v0.9.12 streams2 API Writable/Transform API changes

0.0.4 / 2013-02-23
==================

  * Don't allow `_bytes(0)`
  * Fix tests on node v0.8.x

0.0.3 / 2013-02-10
==================

  * Allow `_passthrough(Infinity)`
  * Add MIT license file

0.0.2 / 2013-02-08
==================

  * Add support for asynchronous callback functions

0.0.1 / 2013-02-05
==================

  * Initial release
