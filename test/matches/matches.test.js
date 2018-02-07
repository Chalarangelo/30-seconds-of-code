const test = require('tape');
const matches = require('./matches.js');

test('Testing matches', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof matches === 'function', 'matches is a Function');
  t.true(matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true }), 'Matches returns true for two similar objects');
  t.false(matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true }), 'Matches returns false for two non-similar objects');
  //t.deepEqual(matches(args..), 'Expected');
  //t.equal(matches(args..), 'Expected');
  //t.false(matches(args..), 'Expected');
  //t.throws(matches(args..), 'Expected');
  t.end();
});
