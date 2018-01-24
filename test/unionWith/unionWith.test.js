const test = require('tape');
const unionWith = require('./unionWith.js');

test('Testing unionWith', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof unionWith === 'function', 'unionWith is a Function');
  //t.deepEqual(unionWith(args..), 'Expected');
  //t.equal(unionWith(args..), 'Expected');
  //t.false(unionWith(args..), 'Expected');
  //t.throws(unionWith(args..), 'Expected');
  t.end();
});