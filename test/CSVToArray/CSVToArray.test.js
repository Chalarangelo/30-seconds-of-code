const expect = require('expect');
const CSVToArray = require('./CSVToArray.js');

test('CSVToArray is a Function', () => {
  expect(CSVToArray).toBeInstanceOf(Function);
});
test('CSVToArray works with default delimiter', () => {
  expect(CSVToArray('a,b\nc,d')).toEqual([['a', 'b'], ['c', 'd']]);
});
test('CSVToArray works with custom delimiter', () => {
  expect(CSVToArray('a;b\nc;d', ';')).toEqual([['a', 'b'], ['c', 'd']]);
});
test('CSVToArray omits the first row', () => {
  expect(CSVToArray('col1,col2\na,b\nc,d', ',', true)).toEqual([['a', 'b'], ['c', 'd']]);
});
test('CSVToArray omits the first row and works with a custom delimiter', () => {
  expect(CSVToArray('col1;col2\na;b\nc;d', ';', true)).toEqual([['a', 'b'], ['c', 'd']]);
});
