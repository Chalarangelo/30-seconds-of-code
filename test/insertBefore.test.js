const expect = require('expect');
const {insertBefore} = require('./_30s.js');

test('insertBefore is a Function', () => {
  expect(insertBefore).toBeInstanceOf(Function);
});
let e = document.createElement('div');
e.setAttribute("id", "test");
test('Does not throw error if the element exists', () => {
  expect(() => {
    insertBefore(e, '<span>test</span>');
  }).not.toThrow(TypeError);
});
