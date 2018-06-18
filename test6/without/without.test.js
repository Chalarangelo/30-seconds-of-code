const expect = require('expect');
const without = require('./without.js');

test('Testing without', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof without === 'function').toBeTruthy();
  expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
  expect(without([])).toEqual([]);
  expect(without([3, 1, true, '3', true], '3', true)).toEqual([3, 1]);
  expect(without('string'.split(''), 's', 't', 'g')).toEqual(['r', 'i', 'n']);
  expect(() => without()).toThrow();
  expect(() => without(null)).toThrow();
  expect(() => without(undefined)).toThrow();
  expect(() => without(123)).toThrow();
  expect(() => without({})).toThrow();
});
