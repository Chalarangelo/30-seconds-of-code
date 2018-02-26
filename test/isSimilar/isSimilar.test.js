const test = require('tape');
const isSimilar = require('./isSimilar.js');

test('Testing isSimilar', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof isSimilar === 'function', 'isSimilar is a Function');
  //t.deepEqual(isSimilar(args..), 'Expected');
  //t.equal(isSimilar(args..), 'Expected');
  //t.false(isSimilar(args..), 'Expected');
  //t.throws(isSimilar(args..), 'Expected');
  t.end();
});