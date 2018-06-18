const expect = require('expect');
const delay = require('./delay.js');

test('delay is a Function', () => {
  expect(delay).toBeInstanceOf(Function);
});
test('Works as expecting, passing arguments properly', () => {
  delay(
    function(text) {
      expect(text).toBe('test');
    },
    1000,
    'test'
  );
});
