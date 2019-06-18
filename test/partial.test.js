const {partial} = require('./_30s.js');

test('partial is a Function', () => {
  expect(partial).toBeInstanceOf(Function);
});
function greet(greeting, name) {
  return greeting + ' ' + name + '!';
}
const greetHello = partial(greet, 'Hello');
test('Prepends arguments', () => {
  expect(greetHello('John')).toBe('Hello John!');
});
