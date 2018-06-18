const expect = require('expect');
const bifurcateBy = require('./bifurcateBy.js');


  test('bifurcateBy is a Function', () => {
  expect(bifurcateBy).toBeInstanceOf(Function);
});
  t.deepEqual(bifurcateBy([ 'beep', 'boop', 'foo', 'bar' ], x => x[0] === 'b'), [ ['beep', 'boop', 'bar'], ['foo'] ], 'Splits the collection into two groups');
  

