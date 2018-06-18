const expect = require('expect');
const isArrayBuffer = require('./isArrayBuffer.js');

test('Testing isArrayBuffer', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isArrayBuffer === 'function').toBeTruthy();
});