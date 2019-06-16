const {CSVToJSON} = require('./_30s.js');

test('CSVToJSON is a Function', () => {
  expect(CSVToJSON).toBeInstanceOf(Function);
});
test('CSVToJSON works with default delimiter', () => {
  expect(CSVToJSON('col1,col2\na,b\nc,d')).toEqual([
    { col1: 'a', col2: 'b' },
    { col1: 'c', col2: 'd' }
  ]);
});
test('CSVToJSON works with custom delimiter', () => {
  expect(CSVToJSON('col1;col2\na;b\nc;d', ';')).toEqual([
    { col1: 'a', col2: 'b' },
    { col1: 'c', col2: 'd' }
  ]);
});
