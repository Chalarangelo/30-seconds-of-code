const expect = require('expect');
const isMap = require('./isMap.js');

test('Testing isMap', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isMap === 'function').toBeTruthy();
});