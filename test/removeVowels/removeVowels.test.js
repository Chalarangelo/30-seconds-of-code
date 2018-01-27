const test = require('tape');
const removeVowels = require('./removeVowels.js');

test('Testing removeVowels', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof removeVowels === 'function', 'removeVowels is a Function');
  //t.deepEqual(removeVowels(args..), 'Expected');
  //t.equal(removeVowels(args..), 'Expected');
  //t.false(removeVowels(args..), 'Expected');
  //t.throws(removeVowels(args..), 'Expected');
  t.end();
});