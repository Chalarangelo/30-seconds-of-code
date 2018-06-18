const expect = require('expect');
const nthElement = require('./nthElement.js');

test('Testing nthElement', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof nthElement === 'function').toBeTruthy();
  expect(nthElement(['a', 'b', 'c'], 1)).toBe('b');
  expect(nthElement(['a', 'b', 'c'], -3)).toBe('a');
});