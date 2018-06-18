const expect = require('expect');
const radsToDegrees = require('./radsToDegrees.js');

test('Testing radsToDegrees', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof radsToDegrees === 'function').toBeTruthy();
  expect(radsToDegrees(Math.PI / 2)).toBe(90);
});
