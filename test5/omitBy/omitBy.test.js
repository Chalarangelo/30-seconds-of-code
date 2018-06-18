const expect = require('expect');
const omitBy = require('./omitBy.js');

test('Testing omitBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof omitBy === 'function').toBeTruthy();
  expect(omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')).toEqual({ b: '2' });
});
