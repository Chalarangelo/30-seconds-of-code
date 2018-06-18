const expect = require('expect');
const pluralize = require('./pluralize.js');


  test('pluralize is a Function', () => {
  expect(pluralize).toBeInstanceOf(Function);
});
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
  

