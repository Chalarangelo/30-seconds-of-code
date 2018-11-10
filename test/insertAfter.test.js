const expect = require('expect');
const {insertAfter} = require('./_30s.js');

test('insertAfter is a Function', () => {
  expect(insertAfter).toBeInstanceOf(Function);
});
let e = document.createElement('div');
e.setAttribute('id', 'test');
test('Does not throw error if the element exists', () => {
  expect(() => {
    insertAfter(e, '<span>test</span>');
  }).not.toThrow(TypeError);
});
