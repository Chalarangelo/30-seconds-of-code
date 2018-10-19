const expect = require('expect');
const {arrayToCSV} = require('./_30s.js');

test('arrayToCSV is a Function', () => {
  expect(arrayToCSV).toBeInstanceOf(Function);
});
test('arrayToCSV works with default delimiter', () => {
  expect(arrayToCSV([['a', 'b'], ['c', 'd']])).toBe('"a","b"\n"c","d"');
});
test('arrayToCSV works with custom delimiter', () => {
  expect(arrayToCSV([['a', 'b'], ['c', 'd']], ';')).toBe('"a";"b"\n"c";"d"');
});
