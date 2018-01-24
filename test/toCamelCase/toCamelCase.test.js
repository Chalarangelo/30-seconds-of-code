const test = require('tape');
const toCamelCase = require('./toCamelCase.js');

test('Testing toCamelCase', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toCamelCase === 'function', 'toCamelCase is a Function');
  t.equal(toCamelCase('some_database_field_name'), 'someDatabaseFieldName', "Converts a string to camelCase");
  t.equal(toCamelCase('Some label that needs to be camelized'), 'someLabelThatNeedsToBeCamelized', "Converts a string to camelCase");
  t.equal(toCamelCase('some-javascript-property'), 'someJavascriptProperty', "Converts a string to camelCase");
  t.equal(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'), 'someMixedStringWithSpacesUnderscoresAndHyphens', "Converts a string to camelCase");
  //t.deepEqual(toCamelCase(args..), 'Expected');
  //t.equal(toCamelCase(args..), 'Expected');
  //t.false(toCamelCase(args..), 'Expected');
  //t.throws(toCamelCase(args..), 'Expected');
  t.end();
});