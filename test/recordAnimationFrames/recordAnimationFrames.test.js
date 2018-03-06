const test = require('tape');
const recordAnimationFrames = require('./recordAnimationFrames.js');

test('Testing recordAnimationFrames', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof recordAnimationFrames === 'function', 'recordAnimationFrames is a Function');
  //t.deepEqual(recordAnimationFrames(args..), 'Expected');
  //t.equal(recordAnimationFrames(args..), 'Expected');
  //t.false(recordAnimationFrames(args..), 'Expected');
  //t.throws(recordAnimationFrames(args..), 'Expected');
  t.end();
});