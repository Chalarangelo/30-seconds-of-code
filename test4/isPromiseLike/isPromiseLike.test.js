const expect = require('expect');
const isPromiseLike = require('./isPromiseLike.js');

test('Testing isPromiseLike', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isPromiseLike === 'function').toBeTruthy();
  expect(isPromiseLike({
    then: function() {
      return '';
    }
  })).toBe(true);
  expect(isPromiseLike(null)).toBe(false);
  expect(isPromiseLike({})).toBe(false);
});
