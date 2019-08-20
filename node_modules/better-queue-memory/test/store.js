var test = require('better-queue-store-test');

var Memory = require('../');


// Test 1: No options
test.basic('No options', {
  create: function (cb) {
    cb(null, new Memory());
  },
  destroy: function (cb) { cb() } // Pass
});


// ... more options here.
