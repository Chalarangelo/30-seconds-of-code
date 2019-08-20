# 2.4.1

* Fix a bug where `signal-exit` instances would be leaked. This was fixed when addressing #35.

# 2.4.0

## Features

* Allow chown and mode options to be set to false to disable the defaulting behavior. (#20)
* Support passing encoding strings in options slot for compat with Node.js API. (#31)
* Add support for running inside of worker threads (#37)

## Fixes

* Remove unneeded call when returning success (#36)
