const expect = require('expect');
const toSnakeCase = require('./toSnakeCase.js');

test('toSnakeCase is a Function', () => {
  expect(toSnakeCase).toBeInstanceOf(Function);
});
test('toSnakeCase('\camelCase\') returns camel_case', () => {
  expect(toSnakeCase('camelCase')).toBe('camel_case');
});
test('toSnakeCase(\'some text\') returns some_text', () => {
  expect(toSnakeCase('some text')).toBe('some_text');
});
test('toSnakeCase(\'some-mixed_string With spaces_underscores-and-hyphens\') returns some_mixed_string_with_spaces_underscores_and_hyphens', () => {
  expect(toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens')).toBe('some_mixed_string_with_spaces_underscores_and_hyphens');
});
test('toSnakeCase(\'IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML\') returns i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html', () => {
  expect(toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')).toBe('i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html')
});
test('toSnakeCase() returns undefined', () => {
  expect(toSnakeCase()).toBe(undefined);
});
test('toSnakeCase([]) throws an error', () => {
  expect(toSnakeCase([])).toThrow();
});
test('toSnakeCase({}) throws an error', () => {
  expect(toSnakeCase({})).toThrow();
});
test('toSnakeCase(123) throws an error', () => {
  expect(toSnakeCase(123)).toThrow();
});
let start = new Date().getTime();
toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML');
let end = new Date().getTime();
test('toSnakeCase(IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML) takes less than 2s to run', () => {
  expect((end - start) < 2000).toBeTruthy();
});
