const expect = require('expect');
const stringPermutations = require('./stringPermutations.js');


  test('stringPermutations is a Function', () => {
  expect(stringPermutations).toBeInstanceOf(Function);
});
  t.deepEqual(stringPermutations('abc'), ['abc','acb','bac','bca','cab','cba'], "Generates all stringPermutations of a string");
  t.deepEqual(stringPermutations('a'), ['a'], "Works for single-letter strings");
  t.deepEqual(stringPermutations(''), [''], "Works for empty strings");
  

