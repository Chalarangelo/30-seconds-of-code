const test = require('tape');
const isAnagram = require('./isAnagram.js');

test('Testing isAnagram', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isAnagram === 'function', 'isAnagram is a Function');
  t.true(isAnagram('iceman', 'cinema'), 'Checks valid anagram');
  t.true(isAnagram('rail safety', 'fairy tales'), 'Works with spaces');
  t.true(isAnagram('roast beef', 'eat for BSE'), 'Ignores case');
  t.true(isAnagram('Regera Dowdy', 'E. G. Deadworry'), 'Ignores special characters');
  //t.deepEqual(isAnagram(args..), 'Expected');
  //t.equal(isAnagram(args..), 'Expected');
  //t.false(isAnagram(args..), 'Expected');
  //t.throws(isAnagram(args..), 'Expected');
  t.end();
});
