const test = require('tape');
const isPlainObject = require('./isPlainObject.js');

test('Testing isPlainObject', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isPlainObject === 'function', 'isPlainObject is a Function');
  t.equal(isPlainObject({ a: 1 }), true, 'Returns true for a plain object');
  t.equal(isPlainObject(new Map()), false, 'Returns false for a Map (example of non-plain object)');
  //t.deepEqual(isPlainObject(args..), 'Expected');
  //t.equal(isPlainObject(args..), 'Expected');
  //t.false(isPlainObject(args..), 'Expected');
  //t.throws(isPlainObject(args..), 'Expected');
  t.end();
});
