const expect = require('expect');
const {bubble_sort} = require('._30s.js');

test('bubbleSort is a Function', () => {
  expect(bubble_sort).toBeInstanceOf(Function);
});

