const expect = require('expect');
const stableSort = require('./stableSort.js');


  test('stableSort is a Function', () => {
  expect(stableSort).toBeInstanceOf(Function);
});
  
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const compare = () => 0;
  t.deepEqual(stableSort(arr, compare), arr, 'Array is properly sorted');
  

