const test = require('tape');
const bindKey = require('./bindKey.js');

test('Testing bindKey', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bindKey === 'function', 'bindKey is a Function');
  //t.deepEqual(bindKey(args..), 'Expected');
  //t.equal(bindKey(args..), 'Expected');
  //t.false(bindKey(args..), 'Expected');
  //t.throws(bindKey(args..), 'Expected');
  t.end();
});