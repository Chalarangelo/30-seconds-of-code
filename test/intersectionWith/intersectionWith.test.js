const test = require('tape');
const intersectionWith = require('./intersectionWith.js');

test('Testing intersectionWith', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof intersectionWith === 'function', 'intersectionWith is a Function');
  t.deepEqual(intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)), [1.5, 3, 0], 'Returns a list of elements that exist in both arrays, using a provided comparator function');
  //t.deepEqual(intersectionWith(args..), 'Expected');
  //t.equal(intersectionWith(args..), 'Expected');
  //t.false(intersectionWith(args..), 'Expected');
  //t.throws(intersectionWith(args..), 'Expected');
  t.end();
});
