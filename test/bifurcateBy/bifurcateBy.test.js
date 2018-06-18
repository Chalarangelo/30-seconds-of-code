const expect = require('expect');
const bifurcateBy = require('./bifurcateBy.js');

test('bifurcateBy is a Function', () => {
  expect(bifurcateBy).toBeInstanceOf(Function);
});
test('Splits the collection into two groups', () => {
  expect(bifurcateBy([ 'beep', 'boop', 'foo', 'bar' ], x => x[0] === 'b')).toEqual([ ['beep', 'boop', 'bar'], ['foo'] ]);
});
