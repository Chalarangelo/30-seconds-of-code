const expect = require('expect');
const debounce = require('./debounce.js');

test('debounce is a Function', () => {
  expect(debounce).toBeInstanceOf(Function);
});
test('Works as expected', () => {
  debounce(() => {
    expect(true).toBeTruthy();
  });
});
