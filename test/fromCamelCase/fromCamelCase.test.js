const expect = require('expect');
const fromCamelCase = require('./fromCamelCase.js');


  test('fromCamelCase is a Function', () => {
  expect(fromCamelCase).toBeInstanceOf(Function);
});
  t.equal(fromCamelCase('someDatabaseFieldName', ' '), 'some database field name', "Converts a string from camelcase");
  t.equal(fromCamelCase('someLabelThatNeedsToBeCamelized', '-'), 'some-label-that-needs-to-be-camelized', "Converts a string from camelcase");
  t.equal(fromCamelCase('someJavascriptProperty', '_'), 'some_javascript_property', "Converts a string from camelcase");
  
