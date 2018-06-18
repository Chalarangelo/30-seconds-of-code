const expect = require('expect');
const stableSort = require('./stableSort.js');

test('Testing stableSort', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof stableSort === 'function').toBeTruthy();
  //t.deepEqual(stableSort(args..), 'Expected');
  //t.equal(stableSort(args..), 'Expected');
  //t.false(stableSort(args..), 'Expected');
  //t.throws(stableSort(args..), 'Expected');

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const compare = () => 0;
  expect(stableSort(arr, compare)).toEqual(arr);
});
