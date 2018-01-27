const test = require('tape');
const countVowels = require('./countVowels.js');

test('Testing countVowels', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof countVowels === 'function', 'countVowels is a Function');
  //t.deepEqual(countVowels(args..), 'Expected');
  //t.equal(countVowels(args..), 'Expected');
  //t.false(countVowels(args..), 'Expected');
  //t.throws(countVowels(args..), 'Expected');
  t.end();
});