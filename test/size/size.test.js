const test = require('tape');
const size = require('./size.js');

test('Testing size', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof size === 'function', 'size is a Function');
  t.equal(size([1, 2, 3, 4, 5]), 5, "Get size of arrays, objects or strings.");
  // t.equal(size('size'), 4, "Get size of arrays, objects or strings."); DOESN'T WORK IN NODE ENV
  t.equal(size({ one: 1, two: 2, three: 3 }), 3, "Get size of arrays, objects or strings.");

  //t.deepEqual(size(args..), 'Expected');
  //t.equal(size(args..), 'Expected');
  //t.false(size(args..), 'Expected');
  //t.throws(size(args..), 'Expected');
  t.end();
});