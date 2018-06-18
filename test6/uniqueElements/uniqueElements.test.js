const expect = require('expect');
const uniqueElements = require('./uniqueElements.js');

test('Testing uniqueElements', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof uniqueElements === 'function').toBeTruthy();
  expect(uniqueElements([1, 2, 2, 3, 4, 4, 5])).toEqual([1,2,3,4,5]);
  expect(uniqueElements([1, 23, 53])).toEqual([1, 23, 53]);
  expect(uniqueElements([true, 0, 1, false, false, undefined, null, ''])).toEqual([true, 0, 1, false, undefined, null, '']);
  expect(uniqueElements()).toEqual([]);
  expect(uniqueElements(null)).toEqual([]);
  expect(uniqueElements(undefined)).toEqual([]);
  expect(uniqueElements('strt')).toEqual(['s', 't', 'r']);
  expect(() => uniqueElements(1, 1, 2543, 534, 5)).toThrow();
  expect(() => uniqueElements({})).toThrow();
  expect(() => uniqueElements(true)).toThrow();
  expect(() => uniqueElements(false)).toThrow();

  let start = new Date().getTime();
  uniqueElements([true, 0, 1, false, false, undefined, null, '']);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});

uniqueElements([1, 2, 2, '1', 4, 4, 4, 5, true]); // [1,2,3,4,5]
