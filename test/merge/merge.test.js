const test = require('tape');
const merge = require('./merge.js');

test('Testing merge', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof merge === 'function', 'merge is a Function');
  //t.deepEqual(merge(args..), 'Expected');
  //t.equal(merge(args..), 'Expected');
  //t.false(merge(args..), 'Expected');
  //t.throws(merge(args..), 'Expected');
  t.end();
});