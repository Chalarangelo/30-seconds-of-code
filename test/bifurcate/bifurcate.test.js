const expect = require('expect');
const bifurcate = require('./bifurcate.js');

test('Testing bifurcate', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof bifurcate === 'function').toBeTruthy();
  expect(bifurcate([ 'beep', 'boop', 'foo', 'bar' ], [ true, true, false, true ])).toEqual([ ['beep', 'boop', 'bar'], ['foo'] ]);
});
