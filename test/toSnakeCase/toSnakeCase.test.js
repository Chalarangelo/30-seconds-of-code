const test = require('tape');
const toSnakeCase = require('./toSnakeCase.js');

test('Testing toSnakeCase', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toSnakeCase === 'function', 'toSnakeCase is a Function');
  t.equal(toSnakeCase('camelCase'), 'camel_case', "string converts to snake case");
  t.equal(toSnakeCase('some text'), 'some_text', "string converts to snake case");
  t.equal(toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'), 'some_mixed_string_with_spaces_underscores_and_hyphens', "string converts to snake case");
  t.equal(toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'), 'i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html', "string converts to snake case");

  //t.deepEqual(toSnakeCase(args..), 'Expected');
  //t.equal(toSnakeCase(args..), 'Expected');
  //t.false(toSnakeCase(args..), 'Expected');
  //t.throws(toSnakeCase(args..), 'Expected');
  t.end();
});