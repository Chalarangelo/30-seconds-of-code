const test = require('tape');
const isObject = require('./isObject.js');

test('Testing isObject', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isObject === 'function', 'isObject is a Function');

  t.true(isObject([1, 2, 3, 4]), 'isObject([1, 2, 3, 4]) is a object');
  t.true(isObject([]), 'isObject([]) is a object');
  t.true(isObject({ a:1 }), 'isObject({ a:1 }) is a object');
  t.false(isObject(true), 'isObject(true) is not a object');

  //t.deepEqual(isObject(args..), 'Expected');
  //t.equal(isObject(args..), 'Expected');
  //t.false(isObject(args..), 'Expected');
  //t.throws(isObject(args..), 'Expected');
  t.end();
});
