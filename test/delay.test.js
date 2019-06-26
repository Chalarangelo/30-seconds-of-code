const {delay} = require('./_30s.js');

test('delay is a Function', () => {
  expect(delay).toBeInstanceOf(Function);
});
test('Works as expecting, passing arguments properly', done => {
  delay(
    function(text) {
      expect(text).toBe('test');
      done();
    },
    1000,
    'test'
  );
});
