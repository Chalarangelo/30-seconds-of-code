const expect = require('expect');
const findLastIndex = require('./findLastIndex.js');


  test('findLastIndex is a Function', () => {
  expect(findLastIndex).toBeInstanceOf(Function);
});
  t.equal(findLastIndex([1, 2, 3, 4], n => n % 2 === 1), 2, 'Finds last index for which the given function returns true');
  

