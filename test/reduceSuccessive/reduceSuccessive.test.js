const test = require('tape');
const reduceSuccessive = require('./reduceSuccessive.js');

test('Testing reduceSuccessive', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof reduceSuccessive === 'function', 'reduceSuccessive is a Function');
  t.deepEqual(reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0), [0, 1, 3, 6, 10, 15, 21], 'Returns the array of successively reduced values');
  //t.deepEqual(reduceSuccessive(args..), 'Expected');
  //t.equal(reduceSuccessive(args..), 'Expected');
  //t.false(reduceSuccessive(args..), 'Expected');
  //t.throws(reduceSuccessive(args..), 'Expected');
  t.end();
});
