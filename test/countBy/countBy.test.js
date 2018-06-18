const expect = require('expect');
const countBy = require('./countBy.js');


  test('countBy is a Function', () => {
  expect(countBy).toBeInstanceOf(Function);
});
  test('Works for functions', () => {
  expect(countBy([6.1, 4.2, 6.3], Math.floor), {4: 1, 6: 2}).toEqual()
});
  test('Works for property names', () => {
  expect(countBy(['one', 'two', 'three'], 'length'), {3: 2, 5: 1}).toEqual()
});
  

