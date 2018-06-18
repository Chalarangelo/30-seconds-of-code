const expect = require('expect');
const defaults = require('./defaults.js');

test('Testing defaults', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof defaults === 'function').toBeTruthy();
  expect(defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 })).toEqual({ a: 1, b: 2 });
});
