const expect = require('expect');
const isWeakSet = require('./isWeakSet.js');

test('Testing isWeakSet', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isWeakSet === 'function').toBeTruthy();
});