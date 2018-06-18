const expect = require('expect');
const zipObject = require('./zipObject.js');

test('Testing zipObject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof zipObject === 'function').toBeTruthy();
  expect(zipObject(['a', 'b', 'c'], [1, 2])).toEqual({a: 1, b: 2, c: undefined});
  expect(zipObject(['a', 'b'], [1, 2, 3])).toEqual({a: 1, b: 2});
  expect(zipObject(['a', 'b', 'c'], 'string')).toEqual({ a: 's', b: 't', c: 'r' });
  expect(zipObject(['a'], 'string')).toEqual({ a: 's' });
  expect(() => zipObject()).toThrow();
  expect(() => zipObject(['string'], null)).toThrow();
  expect(() => zipObject(null, [1])).toThrow();
  expect(() => zipObject('string')).toThrow();
  expect(() => zipObject('test', 'string')).toThrow();
});
