const test = require('tape');
const toOrdinalSuffix = require('./toOrdinalSuffix.js');

test('Testing toOrdinalSuffix', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toOrdinalSuffix === 'function', 'toOrdinalSuffix is a Function');
  t.equal(toOrdinalSuffix('123'), '123rd', 'Adds an ordinal suffix to a number');
  t.equal(toOrdinalSuffix(5), '5th', 'Adds an ordinal suffix to a number');
  t.equal(toOrdinalSuffix(1), '1st', 'Adds an ordinal suffix to a number');
  t.equal(toOrdinalSuffix(0), '0th', 'Adds an ordinal suffix to a number');
  // t.equal(toOrdinalSuffix(), ,);
  //t.deepEqual(toOrdinalSuffix(args..), 'Expected');
  //t.equal(toOrdinalSuffix(args..), 'Expected');
  //t.false(toOrdinalSuffix(args..), 'Expected');
  //t.throws(toOrdinalSuffix(args..), 'Expected');
  t.end();
});