const test = require('tape');
const intersectionWith = require('./intersectionWith.js');

test('Testing intersectionWith', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof intersectionWith === 'function', 'intersectionWith is a Function');
  //t.deepEqual(intersectionWith(args..), 'Expected');
  //t.equal(intersectionWith(args..), 'Expected');
  //t.false(intersectionWith(args..), 'Expected');
  //t.throws(intersectionWith(args..), 'Expected');
  t.end();
});