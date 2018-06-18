const expect = require('expect');
const elo = require('./elo.js');


  test('elo is a Function', () => {
  expect(elo).toBeInstanceOf(Function);
});
  test('Standard 1v1s', () => {
  expect(elo([1200, 1200]), [1216).toEqual(1184])
});
  t.deepEqual(elo([1200, 1200], 64), [1232, 1168]), "Standard 1v1s";
  test('4 player FFA, all same rank', () => {
  expect(elo([1200, 1200, 1200, 1200]).map(Math.round), [1246, 1215, 1185).toEqual(1154])
});
  
