const expect = require('expect');
const bifurcateBy = require('./bifurcateBy.js');

test('Testing bifurcateBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof bifurcateBy === 'function').toBeTruthy();
  expect(bifurcateBy([ 'beep', 'boop', 'foo', 'bar' ], x => x[0] === 'b')).toEqual([ ['beep', 'boop', 'bar'], ['foo'] ]);
});
