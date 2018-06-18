const expect = require('expect');
const uncurry = require('./uncurry.js');

test('Testing uncurry', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof uncurry === 'function').toBeTruthy();
  const add = x => y => z => x + y + z;
  const add1 = uncurry(add);
  const add2 = uncurry(add, 2);
  const add3 = uncurry(add, 3);
  expect(add1(1)(2)(3)).toBe(6);
  expect(add2(1,2)(3)).toBe(6);
  expect(add3(1,2,3)).toBe(6);
});
