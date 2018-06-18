const expect = require('expect');
const show = require('./show.js');

test('Testing show', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof show === 'function').toBeTruthy();
});
