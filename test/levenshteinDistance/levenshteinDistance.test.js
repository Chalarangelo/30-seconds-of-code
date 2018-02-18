const test = require('tape');
const levenshteinDistance = require('./levenshteinDistance.js');

test('Testing levenshteinDistance', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof levenshteinDistance === 'function', 'levenshteinDistance is a Function');
  //t.deepEqual(levenshteinDistance(args..), 'Expected');
  //t.equal(levenshteinDistance(args..), 'Expected');
  //t.false(levenshteinDistance(args..), 'Expected');
  //t.throws(levenshteinDistance(args..), 'Expected');
  t.end();
});