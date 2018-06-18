const expect = require('expect');
const fromCamelCase = require('./fromCamelCase.js');

test('Testing fromCamelCase', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof fromCamelCase === 'function').toBeTruthy();
  expect(fromCamelCase('someDatabaseFieldName', ' ')).toBe('some database field name');
  expect(fromCamelCase('someLabelThatNeedsToBeCamelized', '-')).toBe('some-label-that-needs-to-be-camelized');
  expect(fromCamelCase('someJavascriptProperty', '_')).toBe('some_javascript_property');
});