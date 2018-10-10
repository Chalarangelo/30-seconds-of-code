const expect = require('expect');
const {delay} = require('./_30s.js');

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
