const expect = require('expect');
const {throttle} = require('./_30s.js');

test('throttle is a Function', () => {
  expect(throttle).toBeInstanceOf(Function);
});
