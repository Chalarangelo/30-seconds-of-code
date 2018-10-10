const expect = require('expect');
const {averageBy} = require('./_30s.js');

test('averageBy is a Function', () => {
  expect(averageBy).toBeInstanceOf(Function);
});
test('Produces the right result with a function', () => {
  expect(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)).toBe(5);
});
test('Produces the right result with a property name', () => {
  expect(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')).toBe(5);
});
