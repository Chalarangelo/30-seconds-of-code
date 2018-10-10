const expect = require('expect');
const {toKebabCase} = require('./_30s.js');

test('toKebabCase is a Function', () => {
  expect(toKebabCase).toBeInstanceOf(Function);
});
test("toKebabCase('camelCase') returns camel-case", () => {
  expect(toKebabCase('camelCase')).toBe('camel-case');
});
test("toKebabCase('some text') returns some-text", () => {
  expect(toKebabCase('some text')).toBe('some-text');
});
test("toKebabCase('some-mixed-string With spaces-underscores-and-hyphens') returns some-mixed-string-with-spaces-underscores-and-hyphens", () => {
  expect(toKebabCase('some-mixed-string With spaces-underscores-and-hyphens')).toBe(
    'some-mixed-string-with-spaces-underscores-and-hyphens'
  );
});
test("toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML') returns i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html", () => {
  expect(
    toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')
  ).toBe(
    'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html'
  );
});
test('toKebabCase() returns undefined', () => {
  expect(toKebabCase()).toBe(undefined);
});
test('toKebabCase([]) throws an erro', () => {
  expect(() => {
    toKebabCase([]);
  }).toThrow();
});
test('toKebabCase({}) throws an erro', () => {
  expect(() => {
    toKebabCase({});
  }).toThrow();
});
test('toKebabCase(123) throws an erro', () => {
  expect(() => {
    toKebabCase(123);
  }).toThrow();
});
let start = new Date().getTime();
toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML');
let end = new Date().getTime();
test('toKebabCase(IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML) takes less than 2s to run', () => {
  expect(end - start < 2000).toBeTruthy();
});
