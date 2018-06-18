const expect = require('expect');
const elo = require('./elo.js');


  test('elo is a Function', () => {
  expect(elo).toBeInstanceOf(Function);
});
  t.deepEqual(elo([1200, 1200]), [1216, 1184], "Standard 1v1s");
  t.deepEqual(elo([1200, 1200], 64), [1232, 1168]), "Standard 1v1s";
  t.deepEqual(elo([1200, 1200, 1200, 1200]).map(Math.round), [1246, 1215, 1185, 1154], "4 player FFA, all same rank");
  
