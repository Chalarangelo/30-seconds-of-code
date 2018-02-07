const test = require('tape');
const distance = require('./distance.js');

test('Testing distance', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof distance === 'function', 'distance is a Function');
  t.equals(distance(1, 1, 2, 3), 2.23606797749979, 'Calculates the distance between two points');
  //t.deepEqual(distance(args..), 'Expected');
  //t.equal(distance(args..), 'Expected');
  //t.false(distance(args..), 'Expected');
  //t.throws(distance(args..), 'Expected');
  t.end();
});
