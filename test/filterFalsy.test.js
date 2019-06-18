const { filterFalsy } = require('./_30s.js');

test('filterFalsy is a Function', () => {
  expect(filterFalsy).toBeInstanceOf(Function);
});

test('filterFalsy filters different types of falsy values', () => {
  expect(filterFalsy(['', true, {}, false, 'sample', 1, 0])).toEqual([true, {}, 'sample', 1]);
});

test('filterFalsy returns an empty array if you pass it an array of falsy values', () => {
  expect(filterFalsy(['', 0, false, '', false, 0])).toEqual([]);
});

test('filterFalsy returns all of the truthy elements in an array', () => {
  expect(filterFalsy([true, null, 'test', {}, []])).toEqual([true, 'test', {}, []]);
});
