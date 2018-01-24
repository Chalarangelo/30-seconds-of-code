const test = require('tape');
const omitBy = require('./omitBy.js');

test('Testing omitBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof omitBy === 'function', 'omitBy is a Function');
  //t.deepEqual(omitBy(args..), 'Expected');
  //t.equal(omitBy(args..), 'Expected');
  //t.false(omitBy(args..), 'Expected');
  //t.throws(omitBy(args..), 'Expected');
  t.end();
});