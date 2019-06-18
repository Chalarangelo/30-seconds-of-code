const {elo} = require('./_30s.js');

test('elo is a Function', () => {
  expect(elo).toBeInstanceOf(Function);
});
test('Standard 1v1s', () => {
  expect(elo([1200, 1200])).toEqual([1216, 1184]);
});
test('Standard 1v1s', () => {
  expect(elo([1200, 1200], 64)).toEqual([1232, 1168]);
});
test('4 player FFA, all same rank', () => {
  expect(elo([1200, 1200, 1200, 1200]).map(Math.round)).toEqual([1246, 1215, 1185, 1154]);
});
