const expect = require('expect');
const omit = require('./omit.js');

test('Testing omit', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof omit === 'function').toBeTruthy();
  expect(omit({ a: 1, b: '2', c: 3 }, ['b'])).toEqual({ 'a': 1, 'c': 3 });
});
