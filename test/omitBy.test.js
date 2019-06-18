const {omitBy} = require('./_30s.js');

test('omitBy is a Function', () => {
  expect(omitBy).toBeInstanceOf(Function);
});
test('Creates an object composed of the properties the given function returns falsey for', () => {
  expect(omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')).toEqual({ b: '2' });
});
