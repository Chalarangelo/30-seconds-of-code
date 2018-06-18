const expect = require('expect');
const pickBy = require('./pickBy.js');

test('Testing pickBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pickBy === 'function').toBeTruthy();
  expect(pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')).toEqual({ 'a': 1, 'c': 3 });
});
