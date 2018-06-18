const expect = require('expect');
const head = require('./head.js');

test('Testing head', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof head === 'function').toBeTruthy();
  expect(head({ a: 1234}) === undefined).toBeTruthy();
  expect(head([1, 2, 3])).toBe(1);
  expect(head({ 0: false})).toBe(false);
  expect(head('String')).toBe('S');
  expect(() => head(null)).toThrow();
  expect(() => head(undefined)).toThrow();
  expect(() => head()).toThrow();

  let start = new Date().getTime();
  head([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});