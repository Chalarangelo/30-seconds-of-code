const expect = require('expect');
const gcd = require('./gcd.js');

test('gcd is a Function', () => {
  expect(gcd).toBeInstanceOf(Function);
});
test('Calculates the greatest common divisor between two or more numbers/arrays', () => {
  expect(gcd(8, 36)).toBe(4);
});
test('Calculates the greatest common divisor between two or more numbers/arrays', () => {
  expect(gcd(...[12, 8, 32])).toEqual(4);
});  
