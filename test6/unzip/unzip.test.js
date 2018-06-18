const expect = require('expect');
const unzip = require('./unzip.js');

test('Testing unzip', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unzip === 'function').toBeTruthy();
  expect(unzip([['a', 1, true], ['b', 2, false]])).toEqual([['a', 'b'], [1, 2], [true, false]]);
  expect(unzip([['a', 1, true], ['b', 2]])).toEqual([['a', 'b'], [1, 2], [true]]);
});
