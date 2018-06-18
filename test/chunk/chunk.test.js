const expect = require('expect');
const chunk = require('./chunk.js');

test('Testing chunk', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof chunk === 'function').toBeTruthy();
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1,2],[3,4],[5]]);
  expect(chunk([])).toEqual([]);
  expect(chunk(123)).toEqual([]);
  expect(chunk({ a: 123})).toEqual([]);
  expect(chunk('string', 2)).toEqual([ 'st', 'ri', 'ng' ]);
  expect(() => chunk()).toThrow();
  expect(() => chunk(undefined)).toThrow();
  expect(() => chunk(null)).toThrow();

  let start = new Date().getTime();
  chunk('This is a string', 2);
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
