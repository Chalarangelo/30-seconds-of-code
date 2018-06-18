const expect = require('expect');
const getType = require('./getType.js');

test('Testing getType', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof getType === 'function').toBeTruthy();
  expect(getType(new Set([1, 2, 3]))).toBe('set');
});