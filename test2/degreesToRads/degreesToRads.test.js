const expect = require('expect');
const degreesToRads = require('./degreesToRads.js');

test('Testing degreesToRads', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  const approxeq = (v1,v2, diff = 0.001) => Math.abs(v1 - v2) < diff; // Use to account for rounding errors
  expect(typeof degreesToRads === 'function').toBeTruthy();
  expect(approxeq(degreesToRads(90.0), Math.PI / 2)).toBeTruthy();
});
