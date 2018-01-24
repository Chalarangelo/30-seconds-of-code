const test = require('tape');
const similarity = require('./similarity.js');

test('Testing similarity', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof similarity === 'function', 'similarity is a Function');
  t.deepEqual(similarity([1, 2, 3], [1, 2, 4]), [1, 2], "Returns an array of elements that appear in both arrays.");  //t.equal(similarity(args..), 'Expected');
  //t.false(similarity(args..), 'Expected');
  //t.throws(similarity(args..), 'Expected');
  t.end();
});