const test = require('tape');
const sample = require('./sample.js');

test('Testing sample', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sample === 'function', 'sample is a Function');
  //t.deepEqual(sample(args..), 'Expected');
  //t.equal(sample(args..), 'Expected');
  //t.false(sample(args..), 'Expected');
  //t.throws(sample(args..), 'Expected');
  t.end();
});