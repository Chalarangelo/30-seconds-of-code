const expect = require('expect');
const hz = require('./hz.js');

test('Testing hz', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hz === 'function').toBeTruthy();
});