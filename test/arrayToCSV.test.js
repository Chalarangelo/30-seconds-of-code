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
test('arrayToCSV escapes quotes and doesn\'t quote numbers', () => {
  expect(arrayToCSV([['a', '"b" great'], ['c', 3.1415]])).toBe('"a","""b"" great"\n"c",3.1415');
});
