const expect = require('expect');
const initializeNDArray = require('./initializeNDArray.js');

test('Testing initializeNDArray', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof initializeNDArray === 'function').toBeTruthy();
});