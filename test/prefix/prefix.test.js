const test = require('tape');
const prefix = require('./prefix.js');

test('Testing prefix', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof prefix === 'function', 'prefix is a Function');
  //t.deepEqual(prefix(args..), 'Expected');
  //t.equal(prefix(args..), 'Expected');
  //t.false(prefix(args..), 'Expected');
  //t.throws(prefix(args..), 'Expected');
  t.end();
});