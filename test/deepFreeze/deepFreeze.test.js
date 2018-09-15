const expect = require('expect');
const deepFreeze = require('./deepFreeze.js');

test('deepFreeze is a Function', () => {
  expect(deepFreeze).toBeInstanceOf(Function);
});

test('modifying deeply freezed object prop throws an error in strict mode', () => {
  let freezedObj = deepFreeze({ a: 42 });

  expect(() => {
    'use strict';
    freezedObj.a = 24;
  }).toThrow();
});

test('should not modify deeply freezed object inside another object', () => {
  let freezedObj = deepFreeze({
    a: {
      b: 42
    }
  });

  freezedObj.a.b = 16;

  expect(freezedObj.a.b).toBe(42);
});

test('should not add prop to deeply freezed empty object', () => {
  let freezedObj = deepFreeze({});

  freezedObj.a = 42;

  expect(freezedObj).toEqual({});
});
