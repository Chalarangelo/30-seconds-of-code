# `v8-module-cache` Changelog

## 2018-01-23, Version 1.1.2

* Instead of checking for `process.versions.v8`, check that `script.cachedDataProduced` is `true` (rather than `null`/`undefined`) for support to be considered existent.

## 2018-01-23, Version 1.1.1

* Check for the existence of `process.versions.v8` before attaching hook (see [f8b0388](https://github.com/zertosh/v8-compile-cache/commit/f8b038848be94bc2c905880dd50447c73393f364)).

## 2017-03-27, Version 1.1.0

* Safer cache directory creation (see [bcb3b12](https://github.com/zertosh/v8-compile-cache/commit/bcb3b12c819ab0927ec4408e70f612a6d50a9617)).
  - The cache is now suffixed with the user's uid on POSIX systems (i.e. `/path/to/tmp/v8-compile-cache-1234`).

## 2017-02-21, Version 1.0.0

* Initial release.
