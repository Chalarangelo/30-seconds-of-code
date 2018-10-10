const expect = require('expect');
const {pickBy} = require('./_30s.js');

test('pickBy is a Function', () => {
  expect(pickBy).toBeInstanceOf(Function);
});
test('Creates an object composed of the properties the given function returns truthy for.', () => {
  expect(pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')).toEqual({ a: 1, c: 3 });
});
