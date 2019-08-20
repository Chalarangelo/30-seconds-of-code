var uniqs = require('./');
var util = require('util');
var assert = require('assert');

var foo = { foo: 23 };

[
  [ [[2, 1, 1], [2, 3, 3, 4], [4, 3, 2]], [2, 1, 3, 4] ],
  [ [3, 2, 2, [1, 1, 2]], [3, 2, 1] ],
  [ [[2, 2, 3, "a", 3, 1, foo, foo, "a" ]], [ 2, 3, "a", 1, foo ] ],
  [ [23], [23] ],
  [ [], [] ],
  [ [[]], [] ],
  [ [[null], null], [null] ]
]
.forEach(function(t) {
  var args = t[0].map(JSON.stringify);
  assert.deepEqual(uniqs.apply(this, t[0]), t[1],
    util.format('✘  uniqs(%s) !== %j', args, t[1])
  );
  console.log('✔  uniqs(%s) == %j', args, t[1]);
});
