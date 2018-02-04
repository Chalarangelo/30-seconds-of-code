const test = require('tape');
const pluralize = require('./pluralize.js');

test('Testing pluralize', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pluralize === 'function', 'pluralize is a Function');
  t.equal(pluralize(0, 'apple'), 'apples', 'Produces the plural of the word');
  t.equal(pluralize(1, 'apple'), 'apple', 'Produces the singular of the word');
  t.equal(pluralize(2, 'apple'), 'apples', 'Produces the plural of the word');
  t.equal(pluralize(2, 'person', 'people'), 'people', 'Prodices the defined plural of the word');
  const PLURALS = {
    person: 'people',
    radius: 'radii'
  };
  const autoPluralize = pluralize(PLURALS);
  t.equal(autoPluralize(2, 'person'), 'people', 'Works with a dictionary');
  //t.deepEqual(pluralize(args..), 'Expected');
  //t.equal(pluralize(args..), 'Expected');
  //t.false(pluralize(args..), 'Expected');
  //t.throws(pluralize(args..), 'Expected');
  t.end();
});
