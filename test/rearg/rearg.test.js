const expect = require('expect');
const rearg = require('./rearg.js');

test('rearg is a Function', () => {
  expect(rearg).toBeInstanceOf(Function);
});
var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
test('Reorders arguments in invoked function', () => {
  expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
});
