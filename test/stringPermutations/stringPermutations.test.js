const test = require('tape');
const stringPermutations = require('./stringPermutations.js');

test('Testing stringPermutations', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof stringPermutations === 'function', 'stringPermutations is a Function');
  t.deepEqual(stringPermutations('abc'), ['abc','acb','bac','bca','cab','cba'], "Generates all stringPermutations of a string");
  t.deepEqual(stringPermutations('a'), ['a'], "Works for single-letter strings");
  t.deepEqual(stringPermutations(''), [''], "Works for empty strings");
  //t.deepEqual(anagrams(args..), 'Expected');
  //t.equal(anagrams(args..), 'Expected');
  //t.false(anagrams(args..), 'Expected');
  //t.throws(anagrams(args..), 'Expected');
  t.end();
});
