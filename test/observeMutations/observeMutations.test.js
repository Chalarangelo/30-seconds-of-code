const test = require('tape');
const observeMutations = require('./observeMutations.js');

test('Testing observeMutations', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof observeMutations === 'function', 'observeMutations is a Function');
  t.pass('Tested on 09/02/2018 by @chalarangelo');
  //t.deepEqual(observeMutations(args..), 'Expected');
  //t.equal(observeMutations(args..), 'Expected');
  //t.false(observeMutations(args..), 'Expected');
  //t.throws(observeMutations(args..), 'Expected');
  t.end();
});
