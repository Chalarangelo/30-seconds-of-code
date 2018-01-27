const test = require('tape');
const sortedLastIndexBy = require('./sortedLastIndexBy.js');

test('Testing sortedLastIndexBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sortedLastIndexBy === 'function', 'sortedLastIndexBy is a Function');
  //t.deepEqual(sortedLastIndexBy(args..), 'Expected');
  //t.equal(sortedLastIndexBy(args..), 'Expected');
  //t.false(sortedLastIndexBy(args..), 'Expected');
  //t.throws(sortedLastIndexBy(args..), 'Expected');
  t.end();
});