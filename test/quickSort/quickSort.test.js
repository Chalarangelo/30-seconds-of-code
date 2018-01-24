const test = require('tape');
const quickSort = require('./quickSort.js');

test('Testing quickSort', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof quickSort === 'function', 'quickSort is a Function');
  t.deepEqual(quickSort([5, 6, 4, 3, 1, 2]), [1, 2, 3, 4, 5, 6], 'quickSort([5, 6, 4, 3, 1, 2]) returns [1, 2, 3, 4, 5, 6]');
  t.deepEqual(quickSort([-1, 0, -2]), [-2, -1, 0], 'quickSort([-1, 0, -2]) returns [-2, -1, 0]');
  t.throws(() => quickSort(), 'quickSort() throws an error');
  t.throws(() => quickSort(123), 'quickSort(123) throws an error');
  t.throws(() => quickSort({ 234: string}), 'quickSort({ 234: string}) throws an error');
  t.throws(() => quickSort(null), 'quickSort(null) throws an error');
  t.throws(() => quickSort(undefined), 'quickSort(undefined) throws an error');

  let start = new Date().getTime();
  quickSort([11, 1, 324, 23232, -1, 53, 2, 524, 32, 13, 156, 133, 62, 12, 4]);
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'quickSort([11, 1, 324, 23232, -1, 53, 2, 524, 32, 13, 156, 133, 62, 12, 4]) takes less than 2s to run');
  
  t.end();
});