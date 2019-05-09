const expect = require('expect');
const {deepGet} = require('./_30s.js');

let idx = 2
const data = {
  level1: {
    level2: {
      level3: 'level3',
      level3a: true,
      level3b: [1, 2, 3, { level3c: 'level3c' }, 4, 5],
      level3d: {
        level4: [{ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz' }]
      }
    }
  }
};

test('deepGet is a Function', () => {
  expect(deepGet).toBeInstanceOf(Function);
});

test('deepGet target success', () => {
  expect(deepGet(data, ['level1', 'level2', 'level3'])).toEqual('level3');
});

test('deepGet target and return null', () => {
  expect(deepGet(data, ['level1', 'level2', 'foo', 'baz'])).toEqual(null);
});

test('deepGet target in an array', () => {
  expect(deepGet(data, ['level1', 'level2', 'level3d', 'level4', 2, 'baz'])).toEqual('baz');
});

test('deepGet target with variable key', () => {
  expect(deepGet(data, ['level1', 'level2', 'level3b', idx])).toEqual(3);
});

test('deepGet target with empty Object', () => {
  expect(deepGet({}, ['foo', 'bar', idx, 'foo'])).toEqual(null);
});
