const expect = require('expect');
const isWeakMap = require('./isWeakMap.js');

test('Testing isWeakMap', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isWeakMap === 'function').toBeTruthy();
});