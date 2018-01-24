const test = require('tape');
const findKey = require('./findKey.js');

test('Testing findKey', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof findKey === 'function', 'findKey is a Function');
  //t.deepEqual(findKey(args..), 'Expected');
  //t.equal(findKey(args..), 'Expected');
  //t.false(findKey(args..), 'Expected');
  //t.throws(findKey(args..), 'Expected');
  t.end();
});