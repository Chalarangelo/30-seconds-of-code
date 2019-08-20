var test = require('better-queue-store-test');

var Memory = require('.');

// Test 1: No options
test.benchmark('Memory', {
  create: function (cb) {
    cb(null, new Memory());
  },
  destroy: function (cb) { cb() }, // Pass
  numItems: 200000,
});
