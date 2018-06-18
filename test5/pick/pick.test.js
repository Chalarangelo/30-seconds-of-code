const expect = require('expect');
const pick = require('./pick.js');

test('Testing pick', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pick === 'function').toBeTruthy();
  expect(pick({ a: 1, b: '2', c: 3 }, ['a', 'c'])).toEqual({ 'a': 1, 'c': 3 });
});