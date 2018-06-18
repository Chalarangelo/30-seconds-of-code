const expect = require('expect');
const toCamelCase = require('./toCamelCase.js');


  test('toCamelCase is a Function', () => {
  expect(toCamelCase).toBeInstanceOf(Function);
});
  t.equal(toCamelCase('some_database_field_name'), 'someDatabaseFieldName', "toCamelCase('some_database_field_name') returns someDatabaseFieldName");
  t.equal(toCamelCase('Some label that needs to be camelized'), 'someLabelThatNeedsToBeCamelized', "toCamelCase('Some label that needs to be camelized') returns someLabelThatNeedsToBeCamelized");
  t.equal(toCamelCase('some-javascript-property'), 'someJavascriptProperty', "toCamelCase('some-javascript-property') return someJavascriptProperty");
  t.equal(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'), 'someMixedStringWithSpacesUnderscoresAndHyphens', "toCamelCase('some-mixed_string with spaces_underscores-and-hyphens') returns someMixedStringWithSpacesUnderscoresAndHyphens");
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
  

