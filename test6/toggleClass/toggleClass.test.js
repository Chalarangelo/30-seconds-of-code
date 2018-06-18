const expect = require('expect');
const toggleClass = require('./toggleClass.js');

test('Testing toggleClass', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toggleClass === 'function').toBeTruthy();
});
