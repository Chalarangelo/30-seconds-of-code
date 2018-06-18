const expect = require('expect');
const UUIDGeneratorBrowser = require('./UUIDGeneratorBrowser.js');

test('UUIDGeneratorBrowser is a Function', () => {
  expect(UUIDGeneratorBrowser).toBeInstanceOf(Function);
});
