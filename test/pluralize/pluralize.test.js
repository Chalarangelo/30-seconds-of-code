const test = require('tape');
const pluralize = require('./pluralize.js');

test('Testing pluralize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pluralize === 'function', 'pluralize is a Function');
  //t.deepEqual(pluralize(args..), 'Expected');
  //t.equal(pluralize(args..), 'Expected');
  //t.false(pluralize(args..), 'Expected');
  //t.throws(pluralize(args..), 'Expected');
  t.end();
});