var filter = require('..');
var test = require('tape');

test('filter', function(t) {
  var arr = [1, 2, 3, 4, 5];
  delete arr.filter;
  var even = filter(arr, function(el) {
    return el % 2 == 0;
  });
  t.deepEqual(even, [2, 4]);
  t.end();
});
