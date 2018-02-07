const test = require('tape');
const unflattenObject = require('./unflattenObject.js');

test('Testing unflattenObject', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unflattenObject === 'function', 'unflattenObject is a Function');
  t.deepEqual(unflattenObject({ 'a.b.c': 1, d: 1 }), { a: { b: { c: 1 } }, d: 1 }, 'Unflattens an object with the paths for keys');
  //t.deepEqual(unflattenObject(args..), 'Expected');
  //t.equal(unflattenObject(args..), 'Expected');
  //t.false(unflattenObject(args..), 'Expected');
  //t.throws(unflattenObject(args..), 'Expected');
  t.end();
});
