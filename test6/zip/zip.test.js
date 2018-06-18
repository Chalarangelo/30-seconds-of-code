const expect = require('expect');
const zip = require('./zip.js');

test('Testing zip', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof zip === 'function').toBeTruthy();
  expect(zip(['a', 'b'], [1, 2], [true, false])).toEqual([['a', 1, true], ['b', 2, false]]);
  expect(zip(['a'], [1, 2], [true, false])).toEqual([['a', 1, true], [undefined, 2, false]]);
  expect(zip()).toEqual([]);
  expect(zip(123)).toEqual([]);
  expect(Array.isArray(zip(['a', 'b'], [1, 2], [true, false]))).toBeTruthy();
  expect(Array.isArray(zip(['a'], [1, 2], [true, false]))).toBeTruthy();
  expect(() => zip(null)).toThrow();
  expect(() => zip(undefined)).toThrow();
});
