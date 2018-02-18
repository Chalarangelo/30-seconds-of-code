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
  
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const compare = () => 0;
  t.deepEqual(stableSort(arr, compare), arr, 'Array is properly sorted');
  t.end();
});
