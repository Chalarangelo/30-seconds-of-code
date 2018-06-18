const expect = require('expect');
const isTypedArray = require('./isTypedArray.js');

test('Testing isTypedArray', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isTypedArray === 'function').toBeTruthy();
});