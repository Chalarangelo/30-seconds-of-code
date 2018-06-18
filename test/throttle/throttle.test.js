const expect = require('expect');
const throttle = require('./throttle.js');

test('throttle is a Function', () => {
  expect(throttle).toBeInstanceOf(Function);
});
