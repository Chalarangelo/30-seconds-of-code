const expect = require('expect');
const toSnakeCase = require('./toSnakeCase.js');


  test('toSnakeCase is a Function', () => {
  expect(toSnakeCase).toBeInstanceOf(Function);
});
  t.equal(toSnakeCase('camelCase'), 'camel_case', "toSnakeCase('camelCase') returns camel_case");
  t.equal(toSnakeCase('some text'), 'some_text', "toSnakeCase('some text') returns some_text");
  t.equal(toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens'), 'some_mixed_string_with_spaces_underscores_and_hyphens', "toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens') returns some_mixed_string_with_spaces_underscores_and_hyphens");
  t.equal(toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'), 'i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html', "toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML') returns i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html");
  t.equal(toSnakeCase(), undefined, 'toSnakeCase() returns undefined');
  t.throws(() => toSnakeCase([]), 'toSnakeCase([]) throws an error');
  t.throws(() => toSnakeCase({}), 'toSnakeCase({}) throws an error');
  t.throws(() => toSnakeCase(123), 'toSnakeCase(123) throws an error');

  let start = new Date().getTime();
  toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML');
  let end = new Date().getTime();
  test('toSnakeCase(IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
  

