const expect = require('expect');
const rearg = require('./rearg.js');

test('Testing rearg', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof rearg === 'function').toBeTruthy();
  var rearged = rearg(
    function(a, b, c) {
      return [a, b, c];
    },
    [2, 0, 1]
  );
  expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
});
