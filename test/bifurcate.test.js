const {bifurcate} = require('./_30s.js');

test('bifurcate is a Function', () => {
  expect(bifurcate).toBeInstanceOf(Function);
});
test('Splits the collection into two groups', () => {
  expect(bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true])).toEqual([
    ['beep', 'boop', 'bar'],
    ['foo']
  ]);
});
