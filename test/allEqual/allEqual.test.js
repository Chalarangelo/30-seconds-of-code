const expect = require('expect');
const allEqual = require('./allEqual.js');

test('allEqual is a Function', () => {
  expect(allEqual).toBeInstanceOf(Function);
});

test('Truthy numbers', () => {
  expect(allEqual([4, 4, 4])).toBeTruthy();
});

test('Falsy numbers', () => {
  expect(allEqual([4, 3.999, 4])).toBeFalsy();
});

test('Truthy strings', () => {
  expect(allEqual(['lorem', 'lorem', 'lorem'])).toBeTruthy();
});

test('Falsy numbers', () => {
  expect(allEqual(['lorem', 'ipsum', 'dolore'])).toBeFalsy();
});

test('Truthy trues', () => {
  expect(allEqual([true, true, true])).toBeTruthy();
});

test('Truthy falses', () => {
  expect(allEqual([false, false, false])).toBeTruthy();
});

test('Falsy trues', () => {
  expect(allEqual([true, true, false])).toBeFalsy();
});

test('Falsy falses', () => {
  expect(allEqual([false, false, true])).toBeFalsy();
});
