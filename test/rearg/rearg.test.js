const test = require('tape');
const rearg = require('./rearg.js');

test('Testing rearg', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof rearg === 'function', 'rearg is a Function');
  var rearged = rearg(
    function(a, b, c) {
      return [a, b, c];
    },
    [2, 0, 1]
  );
  t.deepEqual(rearged('b', 'c', 'a'), ['a', 'b', 'c'], 'Reorders arguments in invoked function');
  //t.deepEqual(rearg(args..), 'Expected');
  //t.equal(rearg(args..), 'Expected');
  //t.false(rearg(args..), 'Expected');
  //t.throws(rearg(args..), 'Expected');
  t.end();
});
