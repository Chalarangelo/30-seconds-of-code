const expect = require('expect');
const copyToClipboardAsync = require('./copyToClipboardAsync.js');

test('copyToClipboardAsync is a Function', () => {
  expect(copyToClipboardAsync).toBeInstanceOf(Function);
});
