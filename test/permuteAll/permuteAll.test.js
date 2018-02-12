const test = require('tape');
const permuteAll = require('./permuteAll.js');

test('Testing permuteAll', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof permuteAll === 'function', 'permuteAll is a Function');
  //t.deepEqual(permuteAll(args..), 'Expected');
  //t.equal(permuteAll(args..), 'Expected');
  //t.false(permuteAll(args..), 'Expected');
  //t.throws(permuteAll(args..), 'Expected');
  t.end();
});