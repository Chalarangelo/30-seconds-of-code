const expect = require('expect');
const copyToClipboard = require('./copyToClipboard.js');

test('copyToClipboard is a Function', () => {
  expect(copyToClipboard).toBeInstanceOf(Function);
});
