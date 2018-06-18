const expect = require('expect');
const tail = require('./tail.js');

test('Testing tail', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof tail === 'function').toBeTruthy();
  expect(tail([1, 2, 3])).toEqual([2, 3]);
  expect(tail([1])).toEqual([1]);
});