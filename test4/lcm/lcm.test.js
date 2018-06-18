const expect = require('expect');
const lcm = require('./lcm.js');

test('Testing lcm', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof lcm === 'function').toBeTruthy();
  expect(lcm(12, 7)).toBe(84);
  expect(lcm(...[1, 3, 4, 5])).toBe(60);
});