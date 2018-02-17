const test = require('tape');
const fuzzySearch = require('./fuzzySearch.js');

test('Testing fuzzySearch', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof fuzzySearch === 'function', 'fuzzySearch is a Function');
  //t.deepEqual(fuzzySearch(args..), 'Expected');
  //t.equal(fuzzySearch(args..), 'Expected');
  //t.false(fuzzySearch(args..), 'Expected');
  //t.throws(fuzzySearch(args..), 'Expected');
  t.end();
});