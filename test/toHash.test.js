const {toHash} = require('./_30s.js');

test('toHash is a Function', () => {
  expect(toHash).toBeInstanceOf(Function);
});
test('toHash works properly with indexes', () => {
  expect(toHash([4, 3, 2, 1])).toEqual({ 0: 4, 1: 3, 2: 2, 3: 1 });
});
test('toHash works properly with keys', () => {
  expect(toHash([{ a: 'label' }], 'a')).toEqual({ label: { a: 'label' } });
});
