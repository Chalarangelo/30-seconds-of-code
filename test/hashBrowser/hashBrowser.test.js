const expect = require('expect');
const hashBrowser = require('./hashBrowser.js');

test('hashBrowser is a Function', () => {
  expect(hashBrowser).toBeInstanceOf(Function);
});
