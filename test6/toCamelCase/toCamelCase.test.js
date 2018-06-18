const expect = require('expect');
const toCamelCase = require('./toCamelCase.js');

test('Testing toCamelCase', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toCamelCase === 'function').toBeTruthy();
  expect(toCamelCase('some_database_field_name')).toBe('someDatabaseFieldName');
  expect(toCamelCase('Some label that needs to be camelized')).toBe('someLabelThatNeedsToBeCamelized');
  expect(toCamelCase('some-javascript-property')).toBe('someJavascriptProperty');
  expect(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')).toBe('someMixedStringWithSpacesUnderscoresAndHyphens');
  expect(() => toCamelCase()).toThrow();
  expect(() => toCamelCase([])).toThrow();
  expect(() => toCamelCase({})).toThrow();
  expect(() => toCamelCase(123)).toThrow();

  let start = new Date().getTime();
  toCamelCase('some-mixed_string with spaces_underscores-and-hyphens');
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
