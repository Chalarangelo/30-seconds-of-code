const expect = require('expect');
const delay = require('./delay.js');


  test('delay is a Function', () => {
  expect(delay).toBeInstanceOf(Function);
});
  delay(
    function(text) {
      test('Works as expecting, passing arguments properly', () => {
  expect(text, 'test').toBe()
});
    },
    1000,
    'test'
  );
  

