const test = require('tape');
const reduceWhich = require('./reduceWhich.js');

test('Testing reduceWhich', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof reduceWhich === 'function', 'reduceWhich is a Function');
  t.equal(reduceWhich([1, 3, 2]), 1, 'Returns the minimum of an array');
  t.equal(reduceWhich([1, 3, 2], (a, b) => b - a), 3, 'Returns the maximum of an array');
  t.deepEqual(reduceWhich(
  [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
  (a, b) => a.age - b.age
), {name: "Lucy", age: 9}, 'Returns the object with the minimum specified value in an array');
  //t.deepEqual(reduceWhich(args..), 'Expected');
  //t.equal(reduceWhich(args..), 'Expected');
  //t.false(reduceWhich(args..), 'Expected');
  //t.throws(reduceWhich(args..), 'Expected');
  t.end();
});
