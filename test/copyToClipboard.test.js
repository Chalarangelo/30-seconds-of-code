const expect = require('expect');
const {copyToClipboard} = require('./_30s.js');

test('copyToClipboard is a Function', () => {
  expect(copyToClipboard).toBeInstanceOf(Function);
});
