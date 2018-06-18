const expect = require('expect');
const last = require('./last.js');

test('Testing last', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof last === 'function').toBeTruthy();
  expect(last({ a: 1234}) === undefined).toBeTruthy();
  expect(last([1, 2, 3])).toBe(3);
  expect(last({ 0: false})).toBe(undefined);
  expect(last('String')).toBe('g');
  expect(() => last(null)).toThrow();
  expect(() => last(undefined)).toThrow();
  expect(() => last()).toThrow();

  let start = new Date().getTime();
  last([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 1122, 32124, 23232]);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});