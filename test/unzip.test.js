const {unzip} = require('./_30s.js');

test('unzip is a Function', () => {
  expect(unzip).toBeInstanceOf(Function);
});
test("unzip([['a', 1, true], ['b', 2, false]]) equals [['a','b'], [1, 2], [true, false]]", () => {
  expect(unzip([['a', 1, true], ['b', 2, false]])).toEqual([['a', 'b'], [1, 2], [true, false]]);
});
test("unzip([['a', 1, true], ['b', 2]]) equals [['a','b'], [1, 2], [true]]", () => {
  expect(unzip([['a', 1, true], ['b', 2]])).toEqual([['a', 'b'], [1, 2], [true]]);
});
