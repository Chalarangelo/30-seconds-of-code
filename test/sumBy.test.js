const expect = require('expect');
const {sumBy} = require('./_30s.js');

test('sumBy is a Function', () => {
  expect(sumBy).toBeInstanceOf(Function);
});
test('Works with a callback.', () => {
  expect(sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)).toBe(20);
});
test('Works with a property name.', () => {
  expect(sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')).toBe(20);
});
