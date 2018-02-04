const test = require('tape');
const omit = require('./omit.js');

test('Testing omit', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof omit === 'function', 'omit is a Function');
  t.deepEqual(omit({ a: 1, b: '2', c: 3 }, ['b']), { 'a': 1, 'c': 3 }, 'Omits the key-value pairs corresponding to the given keys from an object');
  //t.deepEqual(omit(args..), 'Expected');
  //t.equal(omit(args..), 'Expected');
  //t.false(omit(args..), 'Expected');
  //t.throws(omit(args..), 'Expected');
  t.end();
});
