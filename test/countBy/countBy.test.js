const expect = require('expect');
const countBy = require('./countBy.js');

test('Testing countBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof countBy === 'function').toBeTruthy();
  expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({4: 1, 6: 2});
  expect(countBy(['one', 'two', 'three'], 'length')).toEqual({3: 2, 5: 1});
});
