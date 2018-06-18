const expect = require('expect');
const isObject = require('./isObject.js');

test('Testing isObject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isObject === 'function').toBeTruthy();

  expect(isObject([1, 2, 3, 4])).toBeTruthy();
  expect(isObject([])).toBeTruthy();
  expect(isObject({ a:1 })).toBeTruthy();
  expect(isObject(true)).toBeFalsy();
});
