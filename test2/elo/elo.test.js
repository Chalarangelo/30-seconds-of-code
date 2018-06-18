const expect = require('expect');
const elo = require('./elo.js');

test('Testing elo', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof elo === 'function').toBeTruthy();
  expect(elo([1200, 1200])).toEqual([1216, 1184]);
  expect(elo([1200, 1200], 64)).toEqual([1232, 1168]), "Standard 1v1s";
  expect(elo([1200, 1200, 1200, 1200]).map(Math.round)).toEqual([1246, 1215, 1185, 1154]);
});