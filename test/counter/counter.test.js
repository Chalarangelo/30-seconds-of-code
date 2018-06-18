const expect = require('expect');
const counter = require('./counter.js');

test('Testing counter', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof counter === 'function').toBeTruthy();
});