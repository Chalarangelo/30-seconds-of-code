const expect = require('expect');
const {throttle} = require('./_30s.js');

test('throttle is a Function', () => {
  expect(throttle).toBeInstanceOf(Function);
});
test('throttle returns a function', () => {
  let throttled = throttle(x => x, 100000);
  expect(throttled).toBeInstanceOf(Function);
  expect(throttled(10)).toBe(undefined);
});
