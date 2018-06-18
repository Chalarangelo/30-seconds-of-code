const expect = require('expect');
const equals = require('./equals.js');

test('Testing equals', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof equals === 'function').toBeTruthy();
  expect(
    equals({ a: [2, {e: 3}], b: [4], c: 'foo' }, { a: [2, {e: 3}], b: [4], c: 'foo' })
  ).toBeTruthy();
  expect(equals([1, 2, 3], [1, 2, 3])).toBeTruthy();
  expect(equals({ a: [2, 3], b: [4] }, { a: [2, 3], b: [6] })).toBeFalsy();
  expect(equals([1, 2, 3], [1, 2, 4])).toBeFalsy();
  expect(equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBeTruthy();
});
