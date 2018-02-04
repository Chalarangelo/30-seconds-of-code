const test = require('tape');
const nthArg = require('./nthArg.js');

test('Testing nthArg', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof nthArg === 'function', 'nthArg is a Function');
  const third = nthArg(2);
  t.equal(third(1, 2, 3), 3, 'Returns the nth argument');
  t.equal(third(1, 2), undefined, 'Returns undefined if arguments too few');
  const last = nthArg(-1);
  t.equal(last(1, 2, 3, 4, 5), 5, 'Works for negative values');
  //t.deepEqual(nthArg(args..), 'Expected');
  //t.equal(nthArg(args..), 'Expected');
  //t.false(nthArg(args..), 'Expected');
  //t.throws(nthArg(args..), 'Expected');
  t.end();
});
