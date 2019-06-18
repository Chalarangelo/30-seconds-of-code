const {counter} = require('./_30s.js');

test('counter is a Function', () => {
  expect(counter).toBeInstanceOf(Function);
});
test('counter does not throw errors', () => {
  expect(() => {
    document.body.appendChild(document.createElement('div'));
    counter('div', 1, 1000, 5, 2000);
    counter('div', 1000, 1, 5, 2000);
    counter('div', 1, 1000);
  }).not.toThrow(TypeError);
});
