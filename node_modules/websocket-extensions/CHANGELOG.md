### 0.1.3 / 2017-11-11

* Accept extension names and parameters including uppercase letters
* Handle extension names that clash with `Object.prototype` properties

### 0.1.2 / 2017-09-10

* Catch synchronous exceptions thrown when calling an extension
* Fix race condition caused when a message is pushed after a cell has stopped
  due to an error
* Fix failure of `close()` to return if a message that's queued after one that
  produces an error never finishes being processed

### 0.1.1 / 2015-02-19

* Prevent sessions being closed before they have finished processing messages
* Add a callback to `Extensions.close()` so the caller can tell when it's safe
  to close the socket

### 0.1.0 / 2014-12-12

* Initial release
