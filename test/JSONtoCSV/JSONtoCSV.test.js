const expect = require('expect');
const JSONtoCSV = require('./JSONtoCSV.js');

test('JSONtoCSV is a Function', () => {
  expect(JSONtoCSV).toBeInstanceOf(Function);
});
test('JSONtoCSV works with default delimiter', () => {
  expect(JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'])).toBe(
    'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
  );
});
test('JSONtoCSV works with custom delimiter', () => {
  expect(
    JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';')
  ).toBe('a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"');
});
