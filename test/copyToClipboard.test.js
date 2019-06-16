const {copyToClipboard} = require('./_30s.js');

test('copyToClipboard is a Function', () => {
  expect(copyToClipboard).toBeInstanceOf(Function);
});
test('copyToClipboard does not throw errors', () => {
  document.getSelection = function() {
    return {
      rangeCount: 0,
      removeAllRanges() { return; },
      addRange(x) { return x; }
    };
  };
  document.execCommand = function(x) { return x; };

  expect(copyToClipboard('hi')).toBe(undefined);
});
test('copyToClipboard does not throw errors', () => {
  document.getSelection = function() {
    return {
      rangeCount: 1,
      getRangeAt(x) { return x + 1; },
      removeAllRanges() { return; },
      addRange(x) { return x; }
    };
  };
  document.execCommand = function(x) { return x; };

  expect(copyToClipboard('hi')).toBe(undefined);
});
