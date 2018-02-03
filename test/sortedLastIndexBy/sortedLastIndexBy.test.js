const test = require('tape');
const sortedLastIndexBy = require('./sortedLastIndexBy.js');

test('Testing sortedLastIndexBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sortedLastIndexBy === 'function', 'sortedLastIndexBy is a Function');
  t.equal(sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x), 1, 'Returns the highest index to insert the element without messing up the list order');
  //t.deepEqual(sortedLastIndexBy(args..), 'Expected');
  //t.equal(sortedLastIndexBy(args..), 'Expected');
  //t.false(sortedLastIndexBy(args..), 'Expected');
  //t.throws(sortedLastIndexBy(args..), 'Expected');
  t.end();
});
