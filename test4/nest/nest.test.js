const expect = require('expect');
const nest = require('./nest.js');

test('Testing nest', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof nest === 'function').toBeTruthy();
});