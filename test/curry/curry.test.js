const expect = require('expect');
const curry = require('./curry.js');

test('Testing curry', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof curry === 'function').toBeTruthy();
  expect(curry(Math.pow)(2)(10)).toBe(1024);
  expect(curry(Math.min, 3)(10)(50)(2)).toBe(2);
});