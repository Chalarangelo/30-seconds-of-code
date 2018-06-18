const expect = require('expect');
const createEventHub = require('./createEventHub.js');

test('Testing createEventHub', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof createEventHub === 'function').toBeTruthy();
});
