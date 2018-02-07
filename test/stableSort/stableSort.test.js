const test = require('tape');
const stableSort = require('./stableSort.js');

test('Testing stableSort', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof stableSort === 'function', 'stableSort is a Function');
  //t.deepEqual(stableSort(args..), 'Expected');
  //t.equal(stableSort(args..), 'Expected');
  //t.false(stableSort(args..), 'Expected');
  //t.throws(stableSort(args..), 'Expected');
  
  // sorted by weight
  const input = [
    { height: 100, weight: 80 },
    { height: 90, weight: 90 },
    { height: 70, weight: 95 },
    { height: 100, weight: 100 },
    { height: 80, weight: 110 },
    { height: 110, weight: 115 },
    { height: 100, weight: 120 },
    { height: 70, weight: 125 },
    { height: 70, weight: 130 },
    { height: 100, weight: 135 },
    { height: 75, weight: 140 },
    { height: 70, weight: 140 }
  ]

  // sorted by height (using stableSort)
  const target = [
    { height: 70, weight: 95 },
    { height: 70, weight: 125 },
    { height: 70, weight: 130 },
    { height: 70, weight: 140 },
    { height: 75, weight: 140 },
    { height: 80, weight: 110 },
    { height: 90, weight: 90 },
    { height: 100, weight: 80 },
    { height: 100, weight: 100 },
    { height: 100, weight: 120 },
    { height: 100, weight: 135 },
    { height: 110, weight: 115 }
  ]

  const compare = (a, b) => a.height - b.height;

  // stable
  t.deepEqual(stableSort(input, compare), target);
  // unstable
  t.notDeepEqual(input.sort(compare), target);

  t.end();
});