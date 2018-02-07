const test = require('tape');
const toCamelCase = require('./toCamelCase.js');

test('Testing toCamelCase', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toCamelCase === 'function', 'toCamelCase is a Function');
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
  t.true((end - start) < 2000, 'toCamelCase(some-mixed_string with spaces_underscores-and-hyphens) takes less than 2s to run');
  t.end();
});
