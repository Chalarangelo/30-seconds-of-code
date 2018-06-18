const expect = require('expect');
const partialRight = require('./partialRight.js');

test('partialRight is a Function', () => {
  expect(partialRight).toBeInstanceOf(Function);
});
function greet(greeting, name) {
  return greeting + ' ' + name + '!';
}
const greetJohn = partialRight(greet, 'John');
test('Appends arguments', () => {
  expect(greetJohn('Hello')).toBe('Hello John!');
});
