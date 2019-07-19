const {yesterday} = require('./_30s.js');

test('yesterday is a Function', () => {
  expect(yesterday).toBeInstanceOf(Function);
});
test('Returns the correct type', () => {
  expect(typeof yesterday()).toBe('string');
});
const t1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
const t2 = new Date(yesterday());
test('Returns the correct year', () => {
  expect(t1.getFullYear()).toBe(t2.getFullYear());
});
test('Returns the correct month', () => {
  expect(t1.getMonth()).toBe(t2.getMonth());
});
test('Returns the correct date', () => {
  expect(t1.getDate()).toBe(t2.getDate());
});
