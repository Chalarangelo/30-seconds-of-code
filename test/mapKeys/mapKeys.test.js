const test = require('tape');
const mapKeys = require('./mapKeys.js');

test('Testing mapKeys', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof mapKeys === 'function', 'mapKeys is a Function');
  //t.deepEqual(mapKeys(args..), 'Expected');
  //t.equal(mapKeys(args..), 'Expected');
  //t.false(mapKeys(args..), 'Expected');
  //t.throws(mapKeys(args..), 'Expected');
  t.end();
});