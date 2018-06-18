const expect = require('expect');
const toOrdinalSuffix = require('./toOrdinalSuffix.js');


  test('toOrdinalSuffix is a Function', () => {
  expect(toOrdinalSuffix).toBeInstanceOf(Function);
});
  test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix('123'), '123rd').toBe()
});
  test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix(5), '5th').toBe()
});
  test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix(1), '1st').toBe()
});
  test('Adds an ordinal suffix to a number', () => {
  expect(toOrdinalSuffix(0), '0th').toBe()
});
  
