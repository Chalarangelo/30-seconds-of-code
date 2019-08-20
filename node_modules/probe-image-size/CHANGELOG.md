4.1.1 / 2019-07-11
------------------

- Fix streams unpipe (after 4.1.0 changes), #34.


4.1.0 / 2019-07-09
------------------

- Fix content ungzip from misconfigured servers, #31.
- Deps bump.
- Update Travis-CI node versions to actual.


4.0.1 / 2019-07-08
------------------

- Fix regexp to ignore SVG `stroke-width` attr, #33.


4.0.0 / 2018-03-05
------------------

- Roll back `got` -> `request`, see #16.
- Default timeout 30s -> 60s.
- Fix padding parse in jpeg, #20.


3.2.0 / 2017-11-22
------------------

- Roll back `got` to 6.x due serious regressions, see #16.
  Next attempt will be switching to `request` and releasing 4.0.0.


3.1.0 / 2017-06-08
------------------

- Maintenance, deps bump. `got` 6.x -> 7.x. `got` timeouts may work a bit
  different but should affect result.


3.0.0 / 2016-12-02
------------------

- Rewrite internals to `Promise`.
- Separate options from url for http probe (old signature still supported
  for compatibility).
- `err.status` -> `err.statusCode`
- remove `{ rejectUnauthorized: false }` from defaults.
- User-Agent string update.
- Replaced `request` dependency with `got` (read options description in doc).
- Retry requests on network fail.
- Switched from `readable-stream` to native `stream` (node 4+ has normal Stream3).
- Proper class for errors.


2.2.0 / 2016-10-26
------------------

- Add `.url` with actual image address (after redirects) for remotes.


2.1.1 / 2016-08-25
------------------

- Add default user agent to http requests (if not set by options), #8.


2.1.0 / 2016-07-14
------------------

- Internal parsers api cleanup - switch from callbacks to events.
- Fixed "write after end" error under heavy load.


2.0.1 / 2016-07-01
------------------

- Fixed bug in streams cleanup condition.


2.0.0 / 2016-06-25
------------------

- SVG support
- width/height now can be float (with fractional part)
- Return dimention units ('px' everywhere except SVG)


1.2.1 / 2016-05-30
------------------

- Stream: posponed callback to avoid possible races on forced stream close.


1.2.0 / 2016-05-28
------------------

- Added `.sync.probe()` method.
- Splited to separate files (simplify browserification).
- Faster return on positive result & faster resource release.
- Fix stream error handling.
- 100% tests coverage.


1.1.0 / 2016-05-25
------------------

- Added promise support.
- Use `readable-stream` instead of `stream`.
- Reorganised internal files structure & tests.


1.0.6 / 2016-04-13
------------------

- Fixed parser crashes on zero length data & offsets.


1.0.5 / 2015-12-15
------------------

- Increased http request timeout to 30 seconds.
- Don't check SSL sertificates.


1.0.4 / 2015-09-22
------------------

- Fixed crash on empty JPEG markers.


1.0.3 / 2015-09-19
------------------

- Fixed catch internal exceptions from `request`.


1.0.2 / 2015-09-16
------------------

- Added `ECONTENT` error code for parse errors.


1.0.1 / 2015-09-14
------------------

- Return image length when possible.
- Support URLs in dev helper script.


1.0.0 / 2015-09-12
------------------

- First release.
