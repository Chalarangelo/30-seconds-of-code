const expect = require('expect');
const toCamelCase = require('./toCamelCase.js');


  test('toCamelCase is a Function', () => {
  expect(toCamelCase).toBeInstanceOf(Function);
});
  test('toCamelCase('some_database_field_name') returns someDatabaseFieldName', () => {
  expect(toCamelCase('some_database_field_name')).toBe('someDatabaseFieldName')
});
  test('toCamelCase('Some label that needs to be camelized') returns someLabelThatNeedsToBeCamelized', () => {
  expect(toCamelCase('Some label that needs to be camelized')).toBe('someLabelThatNeedsToBeCamelized')
});
  test('toCamelCase('some-javascript-property') return someJavascriptProperty', () => {
  expect(toCamelCase('some-javascript-property')).toBe('someJavascriptProperty')
});
  test('toCamelCase('some-mixed_string with spaces_underscores-and-hyphens') returns someMixedStringWithSpacesUnderscoresAndHyphens', () => {
  expect(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe('someMixedStringWithSpacesUnderscoresAndHyphens')
});
  t.throws(() => toCamelCase(), 'toCamelCase() throws a error');
  t.throws(() => toCamelCase([]), 'toCamelCase([]) throws a error');
  t.throws(() => toCamelCase({}), 'toCamelCase({}) throws a error');
  t.throws(() => toCamelCase(123), 'toCamelCase(123) throws a error');

  let start = new Date().getTime();
  toCamelCase('some-mixed_string with spaces_underscores-and-hyphens');
  let end = new Date().getTime();
  test('toCamelCase(some-mixed_string with spaces_underscores-and-hyphens) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  

