var assert = require('assert');

function expectData(stream, expected, callback) {
  var actual = '';

  stream.on('data', function(chunk) {
    actual += chunk;
  });
  stream.on('end', function() {
    assert.equal(actual, expected);
    callback();
  });
}
exports.expectData = expectData;
