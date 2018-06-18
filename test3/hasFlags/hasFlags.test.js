const expect = require('expect');
const hasFlags = require('./hasFlags.js');

test('Testing hasFlags', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hasFlags === 'function').toBeTruthy();
});
