const expect = require('expect');
const bifurcate = require('./bifurcate.js');


  test('bifurcate is a Function', () => {
  expect(bifurcate).toBeInstanceOf(Function);
});
  t.deepEqual(bifurcate([ 'beep', 'boop', 'foo', 'bar' ], [ true, true, false, true ]), [ ['beep', 'boop', 'bar'], ['foo'] ], 'Splits the collection into two groups');
  

