const expect = require('expect');
const copyToClipboard = require('./copyToClipboard.js');

test('Testing copyToClipboard', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof copyToClipboard === 'function').toBeTruthy();
});
