const expect = require('expect');
const isNull = require('./isNull.js');


  test('isNull is a Function', () => {
  expect(isNull).toBeInstanceOf(Function);
});
  test('passed argument is a null', () => {
  expect(isNull(null)).toBe(true)
});
  test('passed argument is a null', () => {
  expect(isNull(NaN)).toBe(false)
});
  
