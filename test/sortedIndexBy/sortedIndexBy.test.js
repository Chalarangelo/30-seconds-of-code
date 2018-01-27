const test = require('tape');
const sortedIndexBy = require('./sortedIndexBy.js');

test('Testing sortedIndexBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sortedIndexBy === 'function', 'sortedIndexBy is a Function');
  //t.deepEqual(sortedIndexBy(args..), 'Expected');
  //t.equal(sortedIndexBy(args..), 'Expected');
  //t.false(sortedIndexBy(args..), 'Expected');
  //t.throws(sortedIndexBy(args..), 'Expected');
  t.end();
});