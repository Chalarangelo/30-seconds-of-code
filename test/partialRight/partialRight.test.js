const test = require('tape');
const partialRight = require('./partialRight.js');

test('Testing partialRight', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof partialRight === 'function', 'partialRight is a Function');
  //t.deepEqual(partialRight(args..), 'Expected');
  //t.equal(partialRight(args..), 'Expected');
  //t.false(partialRight(args..), 'Expected');
  //t.throws(partialRight(args..), 'Expected');
  t.end();
});