const expect = require('expect');
const onUserInputChange = require('./onUserInputChange.js');

test('Testing onUserInputChange', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof onUserInputChange === 'function').toBeTruthy();
});
