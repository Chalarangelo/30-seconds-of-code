const expect = require('expect');
const uniqueElements = require('./uniqueElements.js');


  test('uniqueElements is a Function', () => {
  expect(uniqueElements).toBeInstanceOf(Function);
});
  t.deepEqual(uniqueElements([1, 2, 2, 3, 4, 4, 5]), [1,2,3,4,5], "uniqueElements([1, 2, 2, 3, 4, 4, 5]) returns [1,2,3,4,5]");
  t.deepEqual(uniqueElements([1, 23, 53]), [1, 23, 53], "uniqueElements([1, 23, 53]) returns [1, 23, 53]");
  t.deepEqual(uniqueElements([true, 0, 1, false, false, undefined, null, '']), [true, 0, 1, false, undefined, null, ''], "uniqueElements([true, 0, 1, false, false, undefined, null, '']) returns [true, 0, 1, false, false, undefined, null, '']");
  t.deepEqual(uniqueElements(), [], "uniqueElements() returns []");
  t.deepEqual(uniqueElements(null), [], "uniqueElements(null) returns []");
  t.deepEqual(uniqueElements(undefined), [], "uniqueElements(undefined) returns []");
  t.deepEqual(uniqueElements('strt'), ['s', 't', 'r'], "uniqueElements('strt') returns ['s', 't', 'r']");
  t.throws(() => uniqueElements(1, 1, 2543, 534, 5), 'uniqueElements(1, 1, 2543, 534, 5) throws an error');
  t.throws(() => uniqueElements({}), 'uniqueElements({}) throws an error');
  t.throws(() => uniqueElements(true), 'uniqueElements(true) throws an error');
  t.throws(() => uniqueElements(false), 'uniqueElements(false) throws an error');

  let start = new Date().getTime();
  uniqueElements([true, 0, 1, false, false, undefined, null, '']);
  let end = new Date().getTime();
  test('uniqueElements([true, 0, 1, false, false, undefined, null]) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});

  


uniqueElements([1, 2, 2, '1', 4, 4, 4, 5, true]);
