const test = require('tape');
const sortedIndexBy = require('./sortedIndexBy.js');

test('Testing sortedIndexBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sortedIndexBy === 'function', 'sortedIndexBy is a Function');
  t.equal(sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x), 0, 'Returns the lowest index to insert the element without messing up the list order');
  //t.deepEqual(sortedIndexBy(args..), 'Expected');
  //t.equal(sortedIndexBy(args..), 'Expected');
  //t.false(sortedIndexBy(args..), 'Expected');
  //t.throws(sortedIndexBy(args..), 'Expected');
  t.end();
});
