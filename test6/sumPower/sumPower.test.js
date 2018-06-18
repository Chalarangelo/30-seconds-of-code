const expect = require('expect');
const sumPower = require('./sumPower.js');

test('Testing sumPower', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sumPower === 'function').toBeTruthy();
  expect(sumPower(10)).toBe(385);
  expect(sumPower(10, 3)).toBe(3025);
  expect(sumPower(10, 3, 5)).toBe(2925);
});