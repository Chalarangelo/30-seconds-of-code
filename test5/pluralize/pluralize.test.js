const expect = require('expect');
const pluralize = require('./pluralize.js');

test('Testing pluralize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pluralize === 'function').toBeTruthy();
  expect(pluralize(0, 'apple')).toBe('apples');
  expect(pluralize(1, 'apple')).toBe('apple');
  expect(pluralize(2, 'apple')).toBe('apples');
  expect(pluralize(2, 'person', 'people')).toBe('people');
  const PLURALS = {
    person: 'people',
    radius: 'radii'
  };
  const autoPluralize = pluralize(PLURALS);
  expect(autoPluralize(2, 'person')).toBe('people');
});
