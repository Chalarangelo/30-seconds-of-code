const {without} = require('./_30s.js');

test('without is a Function', () => {
  expect(without).toBeInstanceOf(Function);
});
test('without([2, 1, 2, 3], 1, 2) returns [3]', () => {
  expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
});
test('without([]) returns []', () => {
  expect(without([])).toEqual([]);
});
test("without([3, 1, true, '3', true], '3', true) returns [3, 1]", () => {
  expect(without([3, 1, true, '3', true], '3', true)).toEqual([3, 1]);
});
test("without('string'.split(''), 's', 't', 'g') returns ['r', 'i', 'n']", () => {
  expect(without('string'.split(''), 's', 't', 'g')).toEqual(['r', 'i', 'n']);
});
test('without() throws an error', () => {
  expect(() => {
    without();
  }).toThrow();
});
test('without(null) throws an error', () => {
  expect(() => {
    without(null);
  }).toThrow();
});
test('without(undefined) throws an error', () => {
  expect(() => {
    without(undefined);
  }).toThrow();
});
test('without(123) throws an error', () => {
  expect(() => {
    without(123);
  }).toThrow();
});
test('without({}) throws an error', () => {
  expect(() => {
    without({});
  }).toThrow();
});
