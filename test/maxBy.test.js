const {maxBy} = require('./_30s.js');

test('maxBy is a Function', () => {
  expect(maxBy).toBeInstanceOf(Function);
});
test('Produces the right result with a function', () => {
  expect(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)).toBe(8);
});
test('Produces the right result with a property name', () => {
  expect(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')).toBe(8);
});
