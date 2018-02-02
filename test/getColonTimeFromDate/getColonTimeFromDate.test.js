const test = require('tape');
const getColonTimeFromDate = require('./getColonTimeFromDate.js');

test('Testing getColonTimeFromDate', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof getColonTimeFromDate === 'function', 'getColonTimeFromDate is a Function');
  //t.deepEqual(getColonTimeFromDate(args..), 'Expected');
  //t.equal(getColonTimeFromDate(args..), 'Expected');
  //t.false(getColonTimeFromDate(args..), 'Expected');
  //t.throws(getColonTimeFromDate(args..), 'Expected');
  t.end();
});