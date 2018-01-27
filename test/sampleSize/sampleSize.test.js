const test = require('tape');
const sampleSize = require('./sampleSize.js');

test('Testing sampleSize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sampleSize === 'function', 'sampleSize is a Function');
  //t.deepEqual(sampleSize(args..), 'Expected');
  //t.equal(sampleSize(args..), 'Expected');
  //t.false(sampleSize(args..), 'Expected');
  //t.throws(sampleSize(args..), 'Expected');
  t.end();
});