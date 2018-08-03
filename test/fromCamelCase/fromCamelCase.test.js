const expect = require('expect');
const fromCamelCase = require('./fromCamelCase.js');

test('fromCamelCase is a Function', () => {
  expect(fromCamelCase).toBeInstanceOf(Function);
});
test('Converts a string from camelcase', () => {
  expect(fromCamelCase('someDatabaseFieldName', ' ')).toBe('some database field name');
});
test('Converts a string from camelcase', () => {
  expect(fromCamelCase('someLabelThatNeedsToBeCamelized', '-')).toBe(
    'some-label-that-needs-to-be-camelized'
  );
});
test('Converts a string from camelcase', () => {
  expect(fromCamelCase('someJavascriptProperty', '_')).toBe('some_javascript_property');
});
