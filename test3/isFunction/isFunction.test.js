const expect = require('expect');
const isFunction = require('./isFunction.js');

test('Testing isFunction', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isFunction === 'function').toBeTruthy();
  expect(isFunction(x => x)).toBe(true);
  expect(isFunction('x')).toBe(false);
});