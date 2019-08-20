## v2.0.0
* Update stackframe dependency to v1.x. Stackframes are constructed and accessed differently. 
See the [stackframe CHANGELOG](https://github.com/stacktracejs/stackframe/blob/master/CHANGELOG.md#v10x) for details.

## v1.3.6
* Handle stack frames with no line/column information

## v1.3.4
* Avoid <anonymous> file names

## v1.3.2
* Handle Safari stack entries with no location information

## v1.3.0
* Significantly improved handling of eval()
* Add many browsers to CI

## v1.2.2
* Handle native functions in V8 stack traces

## v1.2.0
* Propagate "(native)" locations instead of defaulting to `undefined`

## v1.1.1
* Make sure to include direct dependencies in distributed JS files

## v1.1.0
* Move polyfills to separate, optional file
* Better docs

## v1.0.0
* Fully tested on old IEs, production-ready

## v0.2.4
* Fix moar boogs with Opera impl

## v0.2.3
* Fix boogs with Opera impl

## v0.2.2
* Name functions such that they can can be filtered out by stacktrace.js

## v0.2.1
* Provide standard distribution (minified and unminified).
* Slimmer node package

## v0.2.0
* Remove constructor
* Fix boogs

## v0.1.0
* Re-write from stacktrace.js

