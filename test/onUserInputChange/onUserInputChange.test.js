const test = require('tape');
const onUserInputChange = require('./onUserInputChange.js');

test('Testing onUserInputChange', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof onUserInputChange === 'function', 'onUserInputChange is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(onUserInputChange(args..), 'Expected');
  //t.equal(onUserInputChange(args..), 'Expected');
  //t.false(onUserInputChange(args..), 'Expected');
  //t.throws(onUserInputChange(args..), 'Expected');
  t.end();
});
