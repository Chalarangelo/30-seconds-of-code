const test = require('tape');
const forEachRight = require('./forEachRight.js');

test('Testing forEachRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof forEachRight === 'function', 'forEachRight is a Function');
  //t.deepEqual(forEachRight(args..), 'Expected');
  //t.equal(forEachRight(args..), 'Expected');
  //t.false(forEachRight(args..), 'Expected');
  //t.throws(forEachRight(args..), 'Expected');
  t.end();
});