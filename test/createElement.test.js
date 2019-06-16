const {createElement} = require('./_30s.js');

test('createElement is a Function', () => {
  expect(createElement).toBeInstanceOf(Function);
});
test('createElement creates an element', () => {
  expect(createElement(
    `<div class="container">
    <p>Hello!</p>
  </div>`
  ).className).toEqual('container');
});
