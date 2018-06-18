const expect = require('expect');
const toSnakeCase = require('./toSnakeCase.js');

test('Testing toSnakeCase', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toSnakeCase === 'function').toBeTruthy();
  expect(toSnakeCase('camelCase')).toBe('camel_case');
  expect(toSnakeCase('some text')).toBe('some_text');
  expect(toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens')).toBe('some_mixed_string_with_spaces_underscores_and_hyphens');
  expect(
    toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')
  ).toBe(
    'i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html'
  );
  expect(toSnakeCase()).toBe(undefined);
  expect(() => toSnakeCase([])).toThrow();
  expect(() => toSnakeCase({})).toThrow();
  expect(() => toSnakeCase(123)).toThrow();

  let start = new Date().getTime();
  toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML');
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
