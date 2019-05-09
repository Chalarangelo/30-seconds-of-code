const expect = require('expect');
const {deepGetter} = require('./_30s.js');

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

test('deepGetter is a Function', () => {
  expect(deepGetter).toBeInstanceOf(Function);
});

test('deepGetter target success', () => {
  expect(deepGetter(data, ['level1', 'level2', 'level3'])).toEqual('level3');
});

test('deepGetter target and return null', () => {
  expect(deepGetter(data, ['level1', 'level2', 'foo', 'baz'])).toEqual(null);
});

test('deepGetter target in an array', () => {
  expect(deepGetter(data, ['level1', 'level2', 'level3d', 'level4', 2, 'baz'])).toEqual('baz');
});

test('deepGetter target with variable key', () => {
  expect(deepGetter(data, ['level1', 'level2', 'level3b', idx])).toEqual(3);
});

test('deepGetter target with empty Object', () => {
  expect(deepGetter({}, ['foo', 'bar', idx, 'foo'])).toEqual(null);
});
