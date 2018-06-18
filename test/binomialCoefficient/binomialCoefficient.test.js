const expect = require('expect');
const binomialCoefficient = require('./binomialCoefficient.js');


  test('binomialCoefficient is a Function', () => {
  expect(binomialCoefficient).toBeInstanceOf(Function);
});
  t.equal(binomialCoefficient(8, 2), 28, 'Returns the appropriate value');
  t.equal(binomialCoefficient(0, 0), 1, 'Returns the appropriate value');
  t.equal(binomialCoefficient(5, 3), 10, 'Returns the appropriate value');
  test('Returns NaN', () => {
  expect(Number.isNaN(binomialCoefficient(NaN, 3))).toBeTruthy();
});
  test('Returns NaN', () => {
  expect(Number.isNaN(binomialCoefficient(5, NaN))).toBeTruthy();
});
  

