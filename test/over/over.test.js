const test = require('tape');
const over = require('./over.js');

test('Testing over', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof over === 'function', 'over is a Function');
  const minMax = over(Math.min, Math.max);
  t.deepEqual(minMax(1, 2, 3, 4, 5), [1,5], 'Applies given functions over multiple arguments');
  //t.deepEqual(over(args..), 'Expected');
  //t.equal(over(args..), 'Expected');
  //t.false(over(args..), 'Expected');
  //t.throws(over(args..), 'Expected');
  t.end();
});
