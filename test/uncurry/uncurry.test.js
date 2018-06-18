const expect = require('expect');
const uncurry = require('./uncurry.js');

test('uncurry is a Function', () => {
  expect(uncurry).toBeInstanceOf(Function);
});
const add = x => y => z => x + y + z;
const add1 = uncurry(add);
const add2 = uncurry(add, 2);
const add3 = uncurry(add, 3);
test('Works without a provided value for n', () => {
  expect(add1(1)(2)(3)).toBe(6);
});
test('Works with n = 2', () => {
  expect(add2(1,2)(3)).toBe(6);
});
  test('Works with n = 3', () => {
  expect(add3(1,2,3)).toBe(6);
});
