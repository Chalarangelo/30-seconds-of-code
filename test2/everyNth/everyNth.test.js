const expect = require('expect');
const everyNth = require('./everyNth.js');

test('Testing everyNth', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof everyNth === 'function').toBeTruthy();
  expect(everyNth([1, 2, 3, 4, 5, 6], 2)).toEqual([ 2, 4, 6 ]);
});