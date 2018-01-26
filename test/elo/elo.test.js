const test = require('tape');
const elo = require('./elo.js');

test('Testing elo', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof elo === 'function', 'elo is a Function');
  t.deepEqual(elo([1200, 1200]), [1216, 1184], "Standard 1v1s");
  t.deepEqual(elo([1200, 1200], 64), [1232, 1168]), "Standard 1v1s";
  t.deepEqual(elo([1200, 1200, 1200, 1200]).map(Math.round), [1246, 1215, 1185, 1154], "4 player FFA, all same rank");
  //t.deepEqual(elo(args..), 'Expected');
  //t.equal(elo(args..), 'Expected');
  //t.false(elo(args..), 'Expected');
  //t.throws(elo(args..), 'Expected');
  t.end();
});