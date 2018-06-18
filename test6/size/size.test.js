const expect = require('expect');
const size = require('./size.js');

test('Testing size', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof size === 'function').toBeTruthy();
  expect(size([1, 2, 3, 4, 5])).toBe(5);
  // t.equal(size('size'), 4, "Get size of arrays, objects or strings."); DOESN'T WORK IN NODE ENV
  expect(size({ one: 1, two: 2, three: 3 })).toBe(3);
});