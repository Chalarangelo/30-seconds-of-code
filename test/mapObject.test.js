const expect = require('expect');
const {mapObject} = require('./_30s.js');

test('mapObject is a Function', () => {
  expect(mapObject).toBeInstanceOf(Function);
});
test('mapObject([1, 2, 3], a => a * a) returns { 1: 1, 2: 4, 3: 9 }', () => {
  expect(mapObject([1, 2, 3], a => a * a)).toEqual({ 1: 1, 2: 4, 3: 9 });
});
test('mapObject([1, 2, 3, 4], (a, b) => b - a) returns { 1: -1, 2: -1, 3: -1, 4: -1 }', () => {
  expect(mapObject([1, 2, 3, 4], (a, b) => b - a)).toEqual({ 1: -1, 2: -1, 3: -1, 4: -1 });
});
test('mapObject([1, 2, 3, 4], (a, b) => a - b) returns { 1: 1, 2: 1, 3: 1, 4: 1 }', () => {
  expect(mapObject([1, 2, 3, 4], (a, b) => a - b)).toEqual({ 1: 1, 2: 1, 3: 1, 4: 1 });
});
