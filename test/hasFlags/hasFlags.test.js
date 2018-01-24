const test = require('tape');
const hasFlags = require('./hasFlags.js');

test('Testing hasFlags', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof hasFlags === 'function', 'hasFlags is a Function');
  //t.deepEqual(hasFlags(args..), 'Expected');
  //t.equal(hasFlags(args..), 'Expected');
  //t.false(hasFlags(args..), 'Expected');
  //t.throws(hasFlags(args..), 'Expected');
  t.end();
});