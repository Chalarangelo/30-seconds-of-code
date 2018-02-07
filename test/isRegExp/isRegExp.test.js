const test = require('tape');
const isRegExp = require('./isRegExp.js');

test('Testing isRegExp', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isRegExp === 'function', 'isRegExp is a Function');
  //t.deepEqual(isRegExp(args..), 'Expected');
  //t.equal(isRegExp(args..), 'Expected');
  //t.false(isRegExp(args..), 'Expected');
  //t.throws(isRegExp(args..), 'Expected');
  t.end();
});