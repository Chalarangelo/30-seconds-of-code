const test = require('tape');
const intersectionBy = require('./intersectionBy.js');

test('Testing intersectionBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof intersectionBy === 'function', 'intersectionBy is a Function');
  //t.deepEqual(intersectionBy(args..), 'Expected');
  //t.equal(intersectionBy(args..), 'Expected');
  //t.false(intersectionBy(args..), 'Expected');
  //t.throws(intersectionBy(args..), 'Expected');
  t.end();
});