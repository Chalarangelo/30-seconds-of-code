const expect = require('expect');
const filterNonUnique = require('./filterNonUnique.js');

test('Testing filterNonUnique', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof filterNonUnique === 'function').toBeTruthy();
  expect(filterNonUnique([1, 2, 2, 3, 4, 4, 5])).toEqual([1,3,5]);
});