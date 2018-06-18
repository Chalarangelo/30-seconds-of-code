const expect = require('expect');
const distance = require('./distance.js');

test('Testing distance', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof distance === 'function').toBeTruthy();
  expect(distance(1, 1, 2, 3)).toBe(2.23606797749979);
});
