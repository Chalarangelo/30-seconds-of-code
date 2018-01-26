const test = require('tape');
const toKebabCase = require('./toKebabCase.js');

test('Testing toKebabCase', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof toKebabCase === 'function', 'toKebabCase is a Function');
  t.equal(toKebabCase('camelCase'), 'camel-case', "toKebabCase('camelCase') returns camel-case");
  t.equal(toKebabCase('some text'), 'some-text', "toKebabCase('some text') returns some-text");
  t.equal(toKebabCase('some-mixed-string With spaces-underscores-and-hyphens'), 'some-mixed-string-with-spaces-underscores-and-hyphens', "toKebabCase('some-mixed-string With spaces-underscores-and-hyphens') returns some-mixed-string-with-spaces-underscores-and-hyphens");
  t.equal(toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML'), 'i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html', "toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML') returns i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-some-xml-and-html");
  t.equal(toKebabCase(), undefined, 'toKebabCase() return undefined');
  t.throws(() => toKebabCase([]), 'toKebabCase([]) throws an error');
  t.throws(() => toKebabCase({}), 'toKebabCase({}) throws an error');
  t.throws(() => toKebabCase(123), 'toKebabCase(123) throws an error');

  let start = new Date().getTime();
  toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')
  let end = new Date().getTime();
  t.true((end - start) < 2000, 'toKebabCase(IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML) takes less than 2s to run');
  t.end();
});
