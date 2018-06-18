const expect = require('expect');
const without = require('./without.js');


  test('without is a Function', () => {
  expect(without).toBeInstanceOf(Function);
});
  test('without([2, 1, 2, 3], 1, 2) returns [3]', () => {
  expect(without([2, 1, 2, 3], 1, 2)).toEqual([3])
});
  test('without([]) returns []', () => {
  expect(without([])).toEqual([])
});
  test('without([3, 1, true, '3', true], '3', true) returns [3, 1]', () => {
  expect(without([3, 1, true, '3', true], '3', true), [3).toEqual(1])
});
  test('without('string'.split(''), 's', 't', 'g') returns ['r', 'i', 'n']', () => {
  expect(without('string'.split(''), 's', 't', 'g'), ['r', 'i').toEqual('n'])
});
  t.throws(() => without(), 'without() throws an error');
  t.throws(() => without(null), 'without(null) throws an error');
  t.throws(() => without(undefined), 'without(undefined) throws an error');
  t.throws(() => without(123), 'without() throws an error');
  t.throws(() => without({}), 'without({}) throws an error');

  

