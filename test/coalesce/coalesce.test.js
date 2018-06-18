const expect = require('expect');
const coalesce = require('./coalesce.js');

test('Testing coalesce', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof coalesce === 'function').toBeTruthy();
  expect(coalesce(null, undefined, '', NaN, 'Waldo')).toEqual('');
});