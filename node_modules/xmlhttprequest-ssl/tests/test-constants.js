var sys = require("util")
  , assert = require("assert")
  , XMLHttpRequest = require("../lib/XMLHttpRequest").XMLHttpRequest
  , xhr = new XMLHttpRequest();

// Test constant values
assert.equal(0, xhr.UNSENT);
assert.equal(1, xhr.OPENED);
assert.equal(2, xhr.HEADERS_RECEIVED);
assert.equal(3, xhr.LOADING);
assert.equal(4, xhr.DONE);

sys.puts("done");
