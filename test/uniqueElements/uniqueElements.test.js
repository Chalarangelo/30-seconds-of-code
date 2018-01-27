const test = require('tape');
const uniqueElements = require('./uniqueElements.js');

test('Testing uniqueElements', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof uniqueElements === 'function', 'uniqueElements is a Function');
  t.deepEqual(uniqueElements([1, 2, 2, 3, 4, 4, 5]), [1,2,3,4,5], "uniqueElements([1, 2, 2, 3, 4, 4, 5]) returns [1,2,3,4,5]");
  t.deepEqual(uniqueElements([1, 23, 53]), [1, 23, 53], "uniqueElements([1, 23, 53]) returns [1, 23, 53]");
  t.deepEqual(uniqueElements([true, 0, 1, false, false, undefined, null, '']), [true, 0, 1, false, undefined, null, ''], "uniqueElements([true, 0, 1, false, false, undefined, null, '']) returns [true, 0, 1, false, false, undefined, null, '']");
  t.deepEqual(uniqueElements(), [], "uniqueElements() returns []");
  t.deepEqual(uniqueElements(null), [], "uniqueElements(null) returns []");
  t.deepEqual(uniqueElements(undefined), [], "uniqueElements(undefined) returns []");
  t.deepEqual(uniqueElements('strt'), ['s', 't', 'r'], "uniqueElements('strt') returns ['s', 't', 'r']");
  t.throws(() => uniqueElements(1, 1, 2543, 534, 5), 'Expected');
  t.throws(() => uniqueElements({}), 'Expected');
  t.throws(() => uniqueElements(true), 'Expected');
  t.throws(() => uniqueElements(false), 'Expected');

  let start = new Date().getTime();
  uniqueElements([true, 0, 1, false, false, undefined, null, ''])
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'uniqueElements([true, 0, 1, false, false, undefined, null]) takes less than 2s to run');

  t.end();
});

uniqueElements([1, 2, 2, '1', 4, 4, 4, 5, true]); // [1,2,3,4,5]
