const expect = require('expect');
const toKebabCase = require('./toKebabCase.js');

test('Testing toKebabCase', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof toKebabCase === 'function').toBeTruthy();
  expect(toKebabCase('camelCase')).toBe('camel-case');
  expect(toKebabCase('some text')).toBe('some-text');
  expect(toKebabCase('some-mixed-string With spaces-underscores-and-hyphens')).toBe('some-mixed-string-with-spaces-underscores-and-hyphens');
  expect(
    toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')
  ).toBe(
    'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html'
  );
  expect(toKebabCase()).toBe(undefined);
  expect(() => toKebabCase([])).toThrow();
  expect(() => toKebabCase({})).toThrow();
  expect(() => toKebabCase(123)).toThrow();

  let start = new Date().getTime();
  toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML');
  let end = new Date().getTime();
  expect((end - start) < 2000).toBeTruthy();
});
