const expect = require('expect');
const offset = require('./offset.js');


  test('offset is a Function', () => {
  expect(offset).toBeInstanceOf(Function);
});
  t.deepEqual(offset([1, 2, 3, 4, 5], 0), [1, 2, 3, 4, 5], 'Offset of 0 returns the same array.');
  t.deepEqual(offset([1, 2, 3, 4, 5], 2), [3, 4, 5, 1, 2], 'Offset > 0 returns the offsetted array.');
  t.deepEqual(offset([1, 2, 3, 4, 5], -2), [4, 5, 1, 2, 3], 'Offset < 0 returns the reverse offsetted array.');
  t.deepEqual(offset([1, 2, 3, 4, 5], 6),[1, 2, 3, 4, 5], 'Offset greater than the length of the array returns the same array.');
  t.deepEqual(offset([1, 2, 3, 4, 5], -6), [1, 2, 3, 4, 5], 'Offset less than the negative length of the array returns the same array.');
  t.deepEqual(offset([], 3), [], 'Offsetting empty array returns an empty array.');
  

