const expect = require('expect');
const isEmpty = require('./isEmpty.js');

test('Testing isEmpty', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isEmpty === 'function').toBeTruthy();
  expect(isEmpty(new Map())).toBe(true);
  expect(isEmpty(new Set())).toBe(true);
  expect(isEmpty([])).toBe(true);
  expect(isEmpty({})).toBe(true);
  expect(isEmpty('')).toBe(true);
  expect(isEmpty([1, 2])).toBe(false);
  expect(isEmpty({ a: 1, b: 2 })).toBe(false);
  expect(isEmpty('text')).toBe(false);
  expect(isEmpty(123)).toBe(true);
  expect(isEmpty(true)).toBe(true);
});
