const expect = require('expect');
const mapObject = require('./mapObject.js');

test('Testing mapObject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof mapObject === 'function').toBeTruthy();
  expect(mapObject([1, 2, 3], a => a * a)).toEqual({ 1: 1, 2: 4, 3: 9 });
  expect(mapObject([1, 2, 3, 4], (a, b) => b - a)).toEqual({ 1: -1, 2: -1, 3: -1, 4: -1 });
  expect(mapObject([1, 2, 3, 4], (a, b) => a - b)).toEqual({ 1: 1, 2: 1, 3: 1, 4: 1 });
});
