const expect = require('expect');
const groupBy = require('./groupBy.js');

test('Testing groupBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof groupBy === 'function').toBeTruthy();
  expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({4: [4.2], 6: [6.1, 6.3]});
  expect(groupBy(['one', 'two', 'three'], 'length')).toEqual({3: ['one', 'two'], 5: ['three']});
});