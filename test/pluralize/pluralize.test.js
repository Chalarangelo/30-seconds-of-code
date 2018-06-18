const expect = require('expect');
const pluralize = require('./pluralize.js');


  test('pluralize is a Function', () => {
  expect(pluralize).toBeInstanceOf(Function);
});
  test('Produces the plural of the word', () => {
  expect(pluralize(0, 'apple'), 'apples').toBe()
});
  test('Produces the singular of the word', () => {
  expect(pluralize(1, 'apple'), 'apple').toBe()
});
  test('Produces the plural of the word', () => {
  expect(pluralize(2, 'apple'), 'apples').toBe()
});
  test('Prodices the defined plural of the word', () => {
  expect(pluralize(2, 'person', 'people'), 'people').toBe()
});
  const PLURALS = {
    person: 'people',
    radius: 'radii'
  };
  const autoPluralize = pluralize(PLURALS);
  test('Works with a dictionary', () => {
  expect(autoPluralize(2, 'person'), 'people').toBe()
});
  

