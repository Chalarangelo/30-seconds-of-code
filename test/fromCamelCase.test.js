const {fromCamelCase} = require('./_30s.js');

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
  expect(fromCamelCase('someJavascriptProperty')).toBe('some_javascript_property');
});
