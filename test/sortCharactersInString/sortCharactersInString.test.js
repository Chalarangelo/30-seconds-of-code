const test = require('tape');
const sortCharactersInString = require('./sortCharactersInString.js');

test('Testing sortCharactersInString', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof sortCharactersInString === 'function', 'sortCharactersInString is a Function');
  t.equal(sortCharactersInString('cabbage'), 'aabbceg', "Alphabetically sorts the characters in a string.");
  //t.deepEqual(sortCharactersInString(args..), 'Expected');
  //t.equal(sortCharactersInString(args..), 'Expected');
  //t.false(sortCharactersInString(args..), 'Expected');
  //t.throws(sortCharactersInString(args..), 'Expected');
  t.end();
});