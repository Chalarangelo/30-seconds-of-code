const expect = require('expect');
const drop = require('./drop.js');


  test('drop is a Function', () => {
  expect(drop).toBeInstanceOf(Function);
});
  test('Works without the last argument', () => {
  expect(drop([1, 2, 3]), [2,3]).toEqual()
});
  test('Removes appropriate element count as specified', () => {
  expect(drop([1, 2, 3], 2), [3]).toEqual()
});
  test('Empties array given a count greater than length', () => {
  expect(drop([1, 2, 3], 42), []).toEqual()
});
  

