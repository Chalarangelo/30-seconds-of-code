const test = require('tape');
const fromCamelCase = require('./fromCamelCase.js');

test('Testing fromCamelCase', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof fromCamelCase === 'function', 'fromCamelCase is a Function');
  t.equal(fromCamelCase('someDatabaseFieldName', ' '), 'some database field name', "Converts a string from camelcase");
  t.equal(fromCamelCase('someLabelThatNeedsToBeCamelized', '-'), 'some-label-that-needs-to-be-camelized', "Converts a string from camelcase");
  t.equal(fromCamelCase('someJavascriptProperty', '_'), 'some_javascript_property', "Converts a string from camelcase");
  //t.deepEqual(fromCamelCase(args..), 'Expected');
  //t.equal(fromCamelCase(args..), 'Expected');
  //t.false(fromCamelCase(args..), 'Expected');
  //t.throws(fromCamelCase(args..), 'Expected');
  t.end();
});