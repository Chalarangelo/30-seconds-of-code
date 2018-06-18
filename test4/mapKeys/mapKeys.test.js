const expect = require('expect');
const mapKeys = require('./mapKeys.js');

test('Testing mapKeys', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof mapKeys === 'function').toBeTruthy();
  expect(mapKeys({ a: 1, b: 2 }, (val, key) => key + val)).toEqual({ a1: 1, b2: 2 });
});
