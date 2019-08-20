1.0.10 / 2019-02-28
------------------

- Fix minified version, #161.


1.0.9 / 2019-02-28
------------------

- Fix `new Buffer()` warning, #154.


1.0.8 / 2019-01-14
------------------

- Fix raw inflate with dictionary, #155.


1.0.7 / 2018-11-29
------------------

- Fixed RangeError in Crome 72, #150.


1.0.6 / 2017-09-14
------------------

- Improve @std/esm compatibility.


1.0.5 / 2017-03-17
------------------

- Maintenance. More formal `zlib` attribution and related
  changes, #93. Thanks to @bastien-roucaries for the help.


1.0.4 / 2016-12-15
------------------

- Bump dev dependencies.
- Make sure `err.message` is filled on throw.
- Code examples for utf-16 string encoding & object compression.


1.0.3 / 2016-07-25
------------------

- Maintenance: re-release to properly display latest version in npm registry
  and badges. Because `npm publish` timestamp used instead of versions.


1.0.2 / 2016-07-21
------------------

- Fixed nasty bug in deflate (wrong `d_buf` offset), which could cause
  broken data in some rare cases.
- Also released as 0.2.9 to give chance to old dependents, not updated to 1.x
  version.


1.0.1 / 2016-04-01
------------------

- Added dictionary support. Thanks to @dignifiedquire.


1.0.0 / 2016-02-17
------------------

- Maintenance release (semver, coding style).


0.2.8 / 2015-09-14
------------------

- Fixed regression after 0.2.4 for edge conditions in inflate wrapper (#65).
  Added more tests to cover possible cases.


0.2.7 / 2015-06-09
------------------

- Added Z_SYNC_FLUSH support. Thanks to @TinoLange.


0.2.6 / 2015-03-24
------------------

- Allow ArrayBuffer input.


0.2.5 / 2014-07-19
------------------

- Workaround for Chrome 38.0.2096.0 script parser bug, #30.


0.2.4 / 2014-07-07
------------------

- Fixed bug in inflate wrapper, #29


0.2.3 / 2014-06-09
------------------

- Maintenance release, dependencies update.


0.2.2 / 2014-06-04
------------------

- Fixed iOS 5.1 Safari issue with `apply(typed_array)`, #26.


0.2.1 / 2014-05-01
------------------

- Fixed collision on switch dynamic/fixed tables.


0.2.0 / 2014-04-18
------------------

- Added custom gzip headers support.
- Added strings support.
- Improved memory allocations for small chunks.
- ZStream properties rename/cleanup.
- More coverage tests.


0.1.1 / 2014-03-20
------------------

- Bugfixes for inflate/deflate.


0.1.0 / 2014-03-15
------------------

- First release.
