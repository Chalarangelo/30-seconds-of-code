const expect = require('expect');
const dig = require('./dig.js');

const data = {
  level1:{
    level2:{
      level3: "some data",
      level3f: false,
      level3a: [1,2,3,4]
    }
  }
};

test('dig is a Function', () => {
  expect(dig).toBeInstanceOf(Function);
});

test('Dig target success', () => {
  expect(dig(data, 'level3')).toEqual('some data');
});

test('Dig target with falsey value', () => {
  expect(dig(data, 'level3f')).toEqual(false);
});

test('Dig target with array', () => {
  expect(dig(data, 'level3a')).toEqual([1,2,3,4]);
});

test('Unknown target return undefined', () => {
  expect(dig(data, 'level4')).toEqual(undefined);
});
