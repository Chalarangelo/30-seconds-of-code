1.9.1 / 2017-09-28
==================

  * deps: accepts@~1.3.4
    - deps: mime-types@~2.1.16
  * deps: debug@2.6.9
  * deps: http-errors@~1.6.2
    - deps: depd@1.1.1
  * deps: mime-types@~2.1.17
    - Add new mime types
    - deps: mime-db@~1.30.0
  * deps: parseurl@~1.3.2
    - perf: reduce overhead for full URLs
    - perf: unroll the "fast-path" `RegExp`

1.9.0 / 2017-05-25
==================

  * Set `X-Content-Type-Options: nosniff` header
  * deps: batch@0.6.1
  * deps: debug@2.6.8
    - Allow colors in workers
    - Deprecated `DEBUG_FD` environment variable set to `3` or higher
    - Fix `DEBUG_MAX_ARRAY_LENGTH`
    - Fix error when running under React Native
    - Use same color for same namespace
    - deps: ms@2.0.0
  * deps: http-errors@~1.6.1
    - Make `message` property enumerable for `HttpError`s
    - deps: inherits@2.0.3
    - deps: setprototypeof@1.0.3
    - deps: statuses@'>= 1.3.1 < 2'
  * deps: mime-types@~2.1.15
    - Add new mime types
    - Add `audio/mp3`

1.8.0 / 2016-06-17
==================

  * Make inline file search case-insensitive
  * deps: accepts@~1.3.3
    - deps: mime-types@~2.1.11
    - deps: negotiator@0.6.1
    - perf: improve header parsing speed
  * deps: http-errors@~1.5.0
    - Use `setprototypeof` module to replace `__proto__` setting
    - deps: inherits@2.0.1
    - deps: statuses@'>= 1.3.0 < 2'
    - perf: enable strict mode
  * deps: mime-types@~2.1.11
    - Add new mime types
    - Update primary extension for `audio/mp4`
    - deps: mime-db@~1.23.0

1.7.3 / 2016-01-24
==================

  * deps: accepts@~1.2.13
    - deps: mime-types@~2.1.6
  * deps: batch@0.5.3
    - Fix invalid dependency for browserify
  * deps: escape-html@~1.0.3
    - perf: enable strict mode
    - perf: optimize string replacement
    - perf: use faster string coercion
  * deps: mime-types@~2.1.9
    - Add new mime types
  * deps: parseurl@~1.3.1
    - perf: enable strict mode

1.7.2 / 2015-07-30
==================

  * deps: accepts@~1.2.12
    - deps: mime-types@~2.1.4
  * deps: mime-types@~2.1.4
    - Add new mime types

1.7.1 / 2015-07-05
==================

  * deps: accepts@~1.2.10
    - deps: mime-types@~2.1.2
  * deps: mime-types@~2.1.2
    - Add new mime types

1.7.0 / 2015-06-15
==================

  * Accept `function` value for `template` option
  * Send non-chunked response for `OPTIONS`
  * Stat parent directory when necessary
  * Use `Date.prototype.toLocaleDateString` to format date
  * deps: accepts@~1.2.9
    - deps: mime-types@~2.1.1
    - deps: negotiator@0.5.3
    - perf: avoid argument reassignment & argument slice
    - perf: avoid negotiator recursive construction
    - perf: enable strict mode
    - perf: remove unnecessary bitwise operator
  * deps: escape-html@1.0.2
  * deps: mime-types@~2.1.1
    - Add new mime types
  * perf: enable strict mode
  * perf: remove argument reassignment

1.6.4 / 2015-05-12
==================

  * deps: accepts@~1.2.7
    - deps: mime-types@~2.0.11
    - deps: negotiator@0.5.3
  * deps: debug@~2.2.0
    - deps: ms@0.7.1
  * deps: mime-types@~2.0.11
    - Add new mime types

1.6.3 / 2015-03-13
==================

  * Properly escape file names in HTML
  * deps: accepts@~1.2.5
    - deps: mime-types@~2.0.10
  * deps: debug@~2.1.3
    - Fix high intensity foreground color for bold
    - deps: ms@0.7.0
  * deps: escape-html@1.0.1
  * deps: mime-types@~2.0.10
    - Add new mime types

1.6.2 / 2015-02-16
==================

  * deps: accepts@~1.2.4
    - deps: mime-types@~2.0.9
    - deps: negotiator@0.5.1
  * deps: http-errors@~1.3.1
    - Construct errors using defined constructors from `createError`
    - Fix error names that are not identifiers
    - Set a meaningful `name` property on constructed errors
  * deps: mime-types@~2.0.9
    - Add new mime types
    - deps: mime-db@~1.7.0

1.6.1 / 2015-01-31
==================

  * deps: accepts@~1.2.3
    - deps: mime-types@~2.0.8
  * deps: mime-types@~2.0.8
    - Add new mime types
    - deps: mime-db@~1.6.0

1.6.0 / 2015-01-01
==================

  * Add link to root directory
  * deps: accepts@~1.2.2
    - deps: mime-types@~2.0.7
    - deps: negotiator@0.5.0
  * deps: batch@0.5.2
  * deps: debug@~2.1.1
  * deps: mime-types@~2.0.7
    - Add new mime types
    - Fix missing extensions
    - Fix various invalid MIME type entries
    - Remove example template MIME types
    - deps: mime-db@~1.5.0

1.5.3 / 2014-12-10
==================

  * deps: accepts@~1.1.4
    - deps: mime-types@~2.0.4
  * deps: http-errors@~1.2.8
    - Fix stack trace from exported function
  * deps: mime-types@~2.0.4
    - Add new mime types
    - deps: mime-db@~1.3.0

1.5.2 / 2014-12-03
==================

  * Fix icon name background alignment on mobile view

1.5.1 / 2014-11-22
==================

  * deps: accepts@~1.1.3
    - deps: mime-types@~2.0.3
  * deps: mime-types@~2.0.3
    - Add new mime types
    - deps: mime-db@~1.2.0

1.5.0 / 2014-10-16
==================

  * Create errors with `http-errors`
  * deps: debug@~2.1.0
    - Implement `DEBUG_FD` env variable support
  * deps: mime-types@~2.0.2
    - deps: mime-db@~1.1.0

1.4.1 / 2014-10-15
==================

  * deps: accepts@~1.1.2
    - Fix error when media type has invalid parameter
    - deps: negotiator@0.4.9

1.4.0 / 2014-10-03
==================

  * Add `dir` argument to `filter` function
  * Support using tokens multiple times

1.3.1 / 2014-10-01
==================

  * Fix incorrect 403 on Windows and Node.js 0.11
  * deps: accepts@~1.1.1
    - deps: mime-types@~2.0.2
    - deps: negotiator@0.4.8

1.3.0 / 2014-09-20
==================

  * Add icon for mkv files
  * Lookup icon by mime type for greater icon support

1.2.1 / 2014-09-05
==================

  * deps: accepts@~1.1.0
  * deps: debug@~2.0.0

1.2.0 / 2014-08-25
==================

  * Add `debug` messages
  * Resolve relative paths at middleware setup

1.1.6 / 2014-08-10
==================

  * Fix URL parsing
  * deps: parseurl@~1.3.0

1.1.5 / 2014-07-27
==================

  * Fix Content-Length calculation for multi-byte file names
  * deps: accepts@~1.0.7
    - deps: negotiator@0.4.7

1.1.4 / 2014-06-20
==================

  * deps: accepts@~1.0.5

1.1.3 / 2014-06-20
==================

  * deps: accepts@~1.0.4
    - use `mime-types`

1.1.2 / 2014-06-19
==================

  * deps: batch@0.5.1

1.1.1 / 2014-06-11
==================

  * deps: accepts@1.0.3

1.1.0 / 2014-05-29
==================

  * Fix content negotiation when no `Accept` header
  * Properly support all HTTP methods
  * Support vanilla node.js http servers
  * Treat `ENAMETOOLONG` as code 414
  * Use accepts for negotiation

1.0.3 / 2014-05-20
==================

  * Fix error from non-statable files in HTML view

1.0.2 / 2014-04-28
==================

  * Add `stylesheet` option
  * deps: negotiator@0.4.3

1.0.1 / 2014-03-05
==================

  * deps: negotiator@0.4.2

1.0.0 / 2014-03-05
==================

  * Genesis from connect
