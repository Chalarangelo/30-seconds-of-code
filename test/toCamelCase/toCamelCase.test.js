const expect = require('expect');
const toCamelCase = require('./toCamelCase.js');

test('toCamelCase is a Function', () => {
  expect(toCamelCase).toBeInstanceOf(Function);
});
test('toCamelCase(\'some_database_field_name\') returns someDatabaseFieldName', () => {
  expect(toCamelCase('some_database_field_name')).toBe('someDatabaseFieldName');
});
test('toCamelCase(\'Some label that needs to be camelized\') returns someLabelThatNeedsToBeCamelized', () => {
  expect(toCamelCase('Some label that needs to be camelized')).toBe('someLabelThatNeedsToBeCamelized');
});
test('toCamelCase(\'some-javascript-property\') return someJavascriptProperty', () => {
  expect(toCamelCase('some-javascript-property')).toBe('someJavascriptProperty');
});
test('toCamelCase(\'some-mixed_string with spaces_underscores-and-hyphens\') returns someMixedStringWithSpacesUnderscoresAndHyphens', () => {
  expect(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe('someMixedStringWithSpacesUnderscoresAndHyphens');
});
test('toCamelCase() throws a error', () => {
  expect(() => {toCamelCase(); }).toThrow();
});
test('toCamelCase([]) throws a error', () => {
  expect(() => {toCamelCase([]); }).toThrow();
});
test('toCamelCase({}) throws a error', () => {
  expect(() => {toCamelCase({}); }).toThrow();
});
test('toCamelCase(123) throws a error', () => {
  expect(() => {toCamelCase(123); }).toThrow();
});
let start = new Date().getTime();
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens');
let end = new Date().getTime();
test('toCamelCase(some-mixed_string with spaces_underscores-and-hyphens) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
