const expect = require('expect');
const approximatelyEqual = require('./approximatelyEqual.js');

test('Testing approximatelyEqual', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof approximatelyEqual === 'function').toBeTruthy();
  expect(approximatelyEqual(Math.PI / 2.0 , 1.5708)).toBeTruthy();
  expect(approximatelyEqual(0.1 + 0.2, 0.3)).toBeTruthy();
  expect(approximatelyEqual(0.5, 0.5)).toBeTruthy();
  expect(approximatelyEqual(0.501, 0.5, 0.1)).toBeTruthy();
});
