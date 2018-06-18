const expect = require('expect');
const unfold = require('./unfold.js');

test('Testing unfold', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unfold === 'function').toBeTruthy();
  var f = n => (n > 50 ? false : [-n, n + 10]);
  expect(unfold(f, 10)).toEqual([-10, -20, -30, -40, -50]);
});
