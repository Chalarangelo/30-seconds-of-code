const expect = require('expect');
const negate = require('./negate.js');

test('negate is a Function', () => {
  expect(negate).toBeInstanceOf(Function);
});
test('Negates a predicate function', () => {
  expect([1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0))).toEqual([1, 3, 5]);
});
