const expect = require('expect');
const observeMutations = require('./observeMutations.js');

test('Testing observeMutations', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof observeMutations === 'function').toBeTruthy();
});
