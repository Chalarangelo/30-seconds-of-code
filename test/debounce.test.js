const {debounce} = require('./_30s.js');

test('debounce is a Function', () => {
  expect(debounce).toBeInstanceOf(Function);
});
test('Works as expected', () => {
  debounce(() => {
    expect(true).toBeTruthy();
  });
});
